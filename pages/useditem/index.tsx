import { useRecoilState } from "recoil"
import { loginCheck } from "../src/commons/hocs"
import UsedItemContainer from "../src/components/units/useditem/UsedItem.container"
import { accessToken } from "../src/commons/stores"

function usedItemPage() {
  const [token] = useRecoilState(accessToken)

  if (!token) return <></>
  else {
    return <UsedItemContainer />
  }
}

export default loginCheck(usedItemPage, "useditem")
