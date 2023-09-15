import { useRecoilState } from "recoil"
import { modalState } from "../../commons/stores"
import Header from "./header"
import NavMenu from "./nav"
import CustomModal from "./modal"

interface ILayout {
  children: JSX.Element
}

export default function Layout(props: ILayout) {
  const [modalstate] = useRecoilState(modalState)
  return (
    <>
      <Header>
        <NavMenu />
      </Header>
      {modalstate && <CustomModal />}
      {props.children}
    </>
  )
}
