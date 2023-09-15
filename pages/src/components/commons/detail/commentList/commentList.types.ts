import { IQuery } from "../../../../commons/types/generated/types"

export interface IListPresenter {
  commentWriter: boolean
  data?: Pick<IQuery, "fetchBoardComments">
  fetchUsedItemQuestions?: Pick<IQuery, "fetchUseditemQuestions">
  onLoadMore: () => void
}
