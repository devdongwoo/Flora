import { useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { IMutation } from "../../../commons/types/generated/types"
import { CREATE_USER } from "./Join.queries"
import LoginPresenter from "./Join.presenter"

export default function JoinContainer() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isActive, setIsActive] = useState(true)

  const emailError = useRef<HTMLInputElement>(null)

  const [createUser] = useMutation<Pick<IMutation, "createUser">>(CREATE_USER)

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

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const onClickJoin = async () => {
    if (isActive && email && password) {
      try {
        const result = await createUser({
          variables: {
            createUserInput: {
              password,
              email,
              name
            }
          }
        })
        if (result.data?.createUser.email) {
          alert("회원가입을 축하드립니다!!")
          router.push("/login")
        }
      } catch (error) {
        if (error instanceof Error) alert(error.message)
      }
    }
  }

  const data = {
    onChangeEmail,
    onChangePassword,
    onClickJoin,
    onChangeName,
    emailError,
    isActive,
    password,
    email,
    name
  }

  return <LoginPresenter {...data} />
}
