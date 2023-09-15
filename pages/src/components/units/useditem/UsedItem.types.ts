import { IQuery } from "../../../commons/types/generated/types"
import { RefObject } from "react"

export interface IUsedItemPresenter {
  content: RefObject<HTMLDivElement>
  bestItemHidden: boolean
  underline: string
  bestItems?: Pick<IQuery, "fetchUseditemsOfTheBest">
  usedItems?: Pick<IQuery, "fetchUseditems">

  onLoadMore: () => Promise<void>
  onClickWritePage: () => void
  onClickUnderline: (e: React.MouseEvent<HTMLButtonElement>) => void
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickDetailPage: (e: React.MouseEvent<HTMLInputElement>) => void
}
