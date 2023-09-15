import { useEffect, useRef, useState } from "react"
import LoginPresenter from "./Login.presenter"
import { LOGIN_USER } from "./Login.queries"
import { useApolloClient, useMutation } from "@apollo/client"
import { IMutation } from "../../../commons/types/generated/types"
import { useRecoilState, useRecoilValue } from "recoil"
import { accessToken, pageAfterlogin, userData } from "../../../commons/stores"
import { useRouter } from "next/router"
import { FETCH_USER_LOGGED_IN } from "../../commons/header/header.queries"
import Swal from "sweetalert2"

export default function LoginContainer() {
  const router = useRouter()
  const client = useApolloClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isActive, setIsActive] = useState(true)

  const emailError = useRef<HTMLInputElement>(null)

  const pageName = useRecoilValue(pageAfterlogin)

  const [, setUserData] = useRecoilState(userData)
  const [token, setToken] = useRecoilState(accessToken)

  const [loginUser] = useMutation<Pick<IMutation, "loginUser">>(LOGIN_USER)

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regex.test(e.currentTarget.value)) {
      if (emailError.current) emailError.current.innerHTML = ""
      setEmail(e.currentTarget.value)
      setIsActive(true)
    } else {
      if (emailError.current) {
        emailError.current.innerHTML = "이메일 주소를 정확히 입력해주세요."
        setIsActive(false)
      }
    }
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const onClickJoin = () => {
    router.push("/join")
  }

  const onKeyupLogin = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onClickLogin()
  }
  const onClickLogin = async () => {
    if (isActive && email && password) {
      try {
        const result = await loginUser({
          variables: {
            password,
            email
          }
        })

        setToken(String(result.data?.loginUser.accessToken))

        router.replace(`/${pageName}`)
      } catch (error) {
        if (error instanceof Error)
          Swal.fire({
            title: `${error.message}`,
            icon: "error"
          })
      }
    }
  }

  useEffect(() => {
    return () => {
      if (token)
        (async () => {
          const user = await client.query({ query: FETCH_USER_LOGGED_IN })
          setUserData(user?.data?.fetchUserLoggedIn)
        })()
    }
  }, [token])

  const data = {
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    onClickJoin,
    onKeyupLogin,
    emailError,
    isActive,
    password,
    email
  }

  return <LoginPresenter {...data} />
}
