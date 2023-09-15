import { ApolloQueryResult } from "@apollo/client"
import {
  IQuery,
  IQueryFetchBoardsArgs
} from "../../../../commons/types/generated/types"
import { Dispatch, SetStateAction } from "react"
export interface IBoardListContainer {
  headTitle: boolean
  componentTitle: boolean
}

export interface IBoardListPresenter {
  onClickWritePage: () => void
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickDetailPage: (event: React.MouseEvent<HTMLElement>) => void
  fetchBoardsCount?: Pick<IQuery, "fetchBoardsCount">
  data?: Pick<IQuery, "fetchBoards">
  bestBoards?: Pick<IQuery, "fetchBoardsOfTheBest">
  setResetPagination: Dispatch<SetStateAction<boolean>>
  resetPagination: boolean
  headTitle: boolean
  componentTitle: boolean
  lastPage: number
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>
}
