import { RefObject } from "react"

interface INormalType {
  isActive: boolean
  password: string
  email: string
  emailError: RefObject<HTMLInputElement>
  name: string
}

export interface ILoginPresenter extends INormalType {
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickJoin: () => void
}
