import { ApolloQueryResult } from "@apollo/client"
import {
  IQuery,
  IQueryFetchBoardsArgs
} from "../../../commons/types/generated/types"
import { Dispatch, SetStateAction } from "react"

export interface IPaginationContainer {
  fetchBoardsCount?: Pick<IQuery, "fetchBoardsCount">
  lastPage: number
  setResetPagination: Dispatch<SetStateAction<boolean>>
  resetPagination: boolean
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>
}

export interface IPaginationPresenter {
  onClickPrev: () => void
  onClickNext: () => void
  onClickPage: (event: React.MouseEvent<HTMLSpanElement>) => void
  setNow: Dispatch<SetStateAction<number>>
  activeTarget: string
  now: number
  lastPage: number
}
