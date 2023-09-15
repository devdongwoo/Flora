import { useApolloClient, useMutation } from "@apollo/client"
import * as U from "../ChildrenCommonStyle/style"
import { LOG_OUT_USER } from "../header.queries"
import { useRecoilState } from "recoil"
import {
  accessToken,
  modalName,
  modalState,
  userData
} from "../../../../commons/stores"
import { Dispatch, SetStateAction } from "react"

interface IProps {
  title?: string
  icon?: JSX.Element
  id?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function DropdownMenu(props: IProps) {
  const [logOutUser] = useMutation(LOG_OUT_USER)

  const [, setUser] = useRecoilState(userData)
  const [, setToken] = useRecoilState(accessToken)
  const [, setModalState] = useRecoilState(modalState)
  const [, setModalName] = useRecoilState(modalName)

  const client = useApolloClient()

  const onClickLogOut = async () => {
    const result = await logOutUser()
    if (result.data.logoutUser) {
      client.clearStore()
      setToken("")
      setUser("")
    }
  }

  const onClickModifying = () => {
    if (props.setOpen) props.setOpen(false)

    if (props.id === "modification") {
      setModalState((prev) => !prev)
      setModalName("modification")
    }

    if (props.id === "charge") {
      setModalState((prev) => !prev)
      setModalName("charge")
    }
  }

  return (
    <>
      <U.DropDownItem
        onClick={() => {
          if (props.id === "logout") onClickLogOut()
          else onClickModifying()
        }}
      >
        <U.Title>
          <U.Icon>{props.icon}</U.Icon>
          {props.title}
        </U.Title>
      </U.DropDownItem>
    </>
  )
}
