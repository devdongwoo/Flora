import { useRouter } from "next/router"
import { useRecoilState, useRecoilValueLoadable } from "recoil"
import {
  accessToken,
  getNewAccessTokenLoadable,
  pageAfterlogin
} from "../stores"

// eslint-disable-next-line react/display-name
export const loginCheck = (Component: any, pageName: string) => () => {
  const router = useRouter()
  const [, setAfterPage] = useRecoilState(pageAfterlogin)
  const [token] = useRecoilState(accessToken)
  const userTokenLoadable = useRecoilValueLoadable(getNewAccessTokenLoadable)

  if (typeof window !== "undefined") {
    userTokenLoadable.toPromise().then((newAccessToken) => {
      if (!newAccessToken || !token) {
        if (token) {
          return <Component />
        }
        setAfterPage(pageName)
        router.replace("/login")
      }
    })
  }
  return <Component />
}
