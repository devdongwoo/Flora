import { RefObject } from "react"

interface INormalType {
  isActive: boolean
  password: string
  email: string
  emailError: RefObject<HTMLInputElement>
}

export interface ILoginPresenter extends INormalType {
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickLogin: () => void
  onKeyupLogin: (e: React.KeyboardEvent) => void
  onClickJoin: () => void
}
