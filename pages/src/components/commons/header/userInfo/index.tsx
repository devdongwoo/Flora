import style from "../ChildrenCommonStyle/style.module.css"
import * as U from "../ChildrenCommonStyle/style"
import DropdownMenu from "../dropdown"
import { Profile } from "../profile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRightFromBracket,
  faCoins,
  faUserPen
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { useApolloClient } from "@apollo/client"
import { FETCH_USER_LOGGED_IN } from "../header.queries"
import { accessToken, profileChange } from "../../../../commons/stores"
import { useRecoilState } from "recoil"

const INFO_DATA = [
  {
    title: "정보수정",
    icon: <FontAwesomeIcon icon={faUserPen} />,
    id: "modification"
  },
  { title: "충전하기", icon: <FontAwesomeIcon icon={faCoins} />, id: "charge" },
  {
    title: "로그아웃",
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    id: "logout"
  }
]

interface User {
  _id: string
  email: string
  name: string
  picture: string
  userPoint: {
    amount: number
  }
}

export default function UserInfo() {
  const [changeProfile] = useRecoilState(profileChange)
  const [token] = useRecoilState(accessToken)

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<User>()
  const client = useApolloClient()


  useEffect(() => {
    if (token) {
      ;(async () => {
        const { data } = await client.query({
          query: FETCH_USER_LOGGED_IN
        })
        setUser(data.fetchUserLoggedIn)
      })()
    }
  }, [user, changeProfile])

  useEffect(() => {
    const eventHandler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", eventHandler)

    return () => {
      document.removeEventListener("mousedown", eventHandler)
    }
  })
  return (
    <U.Container ref={ref}>
      <U.UserProfile>
        <Profile
          user={user}
          onClick={() => {
            setOpen((prev: boolean) => !prev)
          }}
        />
      </U.UserProfile>
      <U.DropdownMenu className={open ? style.active : style.inactive}>
        <U.UserName>
          <U.emoji title={user?.name}>😀{user?.name}</U.emoji>

          <U.SubTitle>Web Developer</U.SubTitle>
        </U.UserName>
        <ul>
          {INFO_DATA.map((el, idx) => {
            return (
              <DropdownMenu
                key={idx}
                id={el.id}
                icon={el.icon}
                title={el.title}
                setOpen={setOpen}
              />
            )
          })}
        </ul>
      </U.DropdownMenu>
    </U.Container>
  )
}
