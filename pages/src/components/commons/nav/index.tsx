import Link from "next/link"
import * as N from "./navMenuStyle"
import React from "react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { modalState } from "../../../commons/stores"

const TEXT = [
  { name: "자유게시판", id: "/boards", boundary: "|" },
  { name: "중고마켓", id: "/useditem", boundary: "|" }
]

function NavMenu() {
  const router = useRouter()
  const [, setModalState] = useRecoilState(modalState)

  return (
    <N.Wrap>
      <N.WrapBox>
        {TEXT.map((el) => {
          return (
            <Link key={el.id} href={el.id}>
              <N.Text
                style={{
                  fontWeight:
                    router.pathname !== "/" && router.pathname.includes(el.id)
                      ? router.pathname === "/"
                        ? "300"
                        : "600"
                      : "300"
                }}
                onClick={(e: any) => {
                  if (router.pathname.includes(el.id)) {
                    e.preventDefault()
                  }
                  setModalState(false)
                }}
              >
                {el.name}
              </N.Text>
            </Link>
          )
        })}
      </N.WrapBox>
    </N.Wrap>
  )
}

export default React.memo(NavMenu)
