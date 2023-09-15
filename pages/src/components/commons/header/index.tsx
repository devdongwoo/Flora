import { useRouter } from "next/router"
import React, { useLayoutEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { accessToken, pageAfterlogin } from "../../../commons/stores"
import * as H from "./headerStyle"
import UserInfo from "./userInfo"
import { useApolloClient } from "@apollo/client"
import { FETCH_USER_LOGGED_IN } from "./header.queries"

interface IHeader {
  children: JSX.Element
}

interface User {
  _id: string
  email: string
  name: string
  picture: string
  userPoint: {
    amount: number
  }
}

export default function Header(props: IHeader) {
  const [token] = useRecoilState(accessToken)
  const [user, setUser] = useState<User>()
  const [, setAfterPage] = useRecoilState(pageAfterlogin)

  const [tag, setTag] = useState(<></>)

  const client = useApolloClient()

  const router = useRouter()

  const onClickHome = () => {
    router.push("/")
  }

  const onClickLogin = () => {
    router.push("/login")
    setAfterPage("/")
  }

  const onClickJoin = () => {
    router.push("/join")
  }

  useLayoutEffect(() => {
    if (token) {
      ;(async () => {
        const { data } = await client.query({
          query: FETCH_USER_LOGGED_IN
        })
        setUser(data.fetchUserLoggedIn)
      })()
    }

    setTag(
      token && user ? (
        <>
          <UserInfo />
        </>
      ) : (
        <>
          <H.Login onClick={onClickLogin}>로그인</H.Login>
          <H.Membership onClick={onClickJoin}>회원가입</H.Membership>
        </>
      )
    )
  }, [token, user])

  return (
    <>
      <H.Wrap>
        <H.WrapBox>
          <H.LogoBox>
            <H.First onClick={onClickHome}>Flora</H.First>
          </H.LogoBox>
          <H.Nav>{props.children}</H.Nav>
          <H.LoginBox>{tag}</H.LoginBox>
        </H.WrapBox>
      </H.Wrap>
    </>
  )
}
