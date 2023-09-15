import { useState } from "react"
import MainPresenter from "./Main.Presenter"

export default function MainContainer(props: any) {
  const [isDark, setIsDark] = useState(false)
  
  const onClickOpen = () => {
    setIsDark((prevState) => !prevState)
  }

  return <MainPresenter onClickOpen={onClickOpen} isDark={isDark} />
}
