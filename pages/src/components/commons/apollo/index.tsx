import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise
} from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"
import { useEffect } from "react"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { accessToken, getNewAccessTokenLoadable } from "../../../commons/stores"
import { getRestoreToken } from "../../../commons/libraries/getAccessToken"

interface IApollo {
  children: JSX.Element
}

const GLOBAL_CACHE = new InMemoryCache()
export default function ApolloSetting(props: IApollo) {
  const [token, setToken] = useRecoilState(accessToken)
  const userTokenLoadable = useRecoilValueLoadable(getNewAccessTokenLoadable)
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        if (error.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getRestoreToken().then((newAccessToken) => {
              setToken(newAccessToken)

              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`
                }
              })
            })
          ).flatMap(() => forward(operation))
        }
      }
    }
  })

  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_CACHE,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only"
      }
    }
  })

  useEffect(() => {
    userTokenLoadable.toPromise().then(async (newAccessToken) => {
      setToken(newAccessToken)
      console.log(newAccessToken)
    })
  }, [])

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
