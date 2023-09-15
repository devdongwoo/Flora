import { GraphQLClient, gql } from "graphql-request"
import { IMutation } from "../types/generated/types"
import { useRecoilState } from "recoil"
import { accessToken } from "../stores"

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`
let result: Pick<IMutation, "restoreAccessToken">
export const getRestoreToken = async () => {
  try {
    const [token] = useRecoilState(accessToken)
    const endPoint = "https://backendonline.codebootcamp.co.kr/graphql"
    const client = new GraphQLClient(endPoint, { credentials: "include" })
    if (token)
      result = await client.request<Pick<IMutation, "restoreAccessToken">>(
        RESTORE_ACCESS_TOKEN
      )

    const newAccessToken = result?.restoreAccessToken?.accessToken
    return newAccessToken
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}
