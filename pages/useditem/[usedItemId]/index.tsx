import { useApolloClient } from "@apollo/client"
import UsedItemDetail from "../../src/components/commons/detail/Detail.container"
import { useRecoilState } from "recoil"
import { accessToken, userData } from "../../src/commons/stores"
import Login from "../../src/components/units/login/Login.container"
import { FETCH_USER_LOGGED_IN } from "../../src/components/commons/header/header.queries"

export default function usedItemDetailPage() {
  const [, setUserData] = useRecoilState(userData)
  const [token] = useRecoilState(accessToken)
  if (token)
    (async () => {
      const client = useApolloClient()
      const user = await client.query({ query: FETCH_USER_LOGGED_IN })
      setUserData(!user.loading && user?.data?.fetchUserLoggedIn)
    })()
  else {
    return <Login />
  }
  return <UsedItemDetail isDetail="usedItem" />
}
