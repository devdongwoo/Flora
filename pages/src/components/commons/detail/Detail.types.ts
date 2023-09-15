import { IQuery } from "../../../commons/types/generated/types"
import { YouTubeProps } from "react-youtube"

export interface DetailContainer {
  isDetail: string
}

interface IType extends DetailContainer {
  fetchBoard?: Pick<IQuery, "fetchBoard">
  fetchUsedItem?: Pick<IQuery, "fetchUseditem">
  opts?: YouTubeProps["opts"]
  userId?: string
  profile: JSX.Element
}

export interface IBoardDetailPresenter extends IType {
  onClickEdit: () => void
  onClickList: () => void
  onClickBuy: (useritemId: string | undefined) => void
  onClickDelete?: () => void
  onClickLike?: () => void
  onClickDisLike?: () => void
}
