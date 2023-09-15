import * as M from "./Main.style"
import { IMainPresenter } from "./Main.types"
export default function MainPresenter(props: IMainPresenter) {
  return (
    <M.Wrap>
      <M.Contents>
        <M.LeftContent>
          <M.Title>
            <M.First>NEW</M.First>
            <M.Second>SEASON</M.Second>
            <M.Third>SUMMER</M.Third>
          </M.Title>
        </M.LeftContent>
      </M.Contents>
    </M.Wrap>
  )
}
