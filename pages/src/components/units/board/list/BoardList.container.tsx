import BoardListPresenter from "./BoardList.presenter"
import {
  FETCH_BOARDS,
  FETCH_BOARDS_COUNT,
  FETCH_BOARDS_OF_THE_BEST
} from "./BoardList.queries"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import _ from "lodash"
import { IBoardListContainer } from "./BoardList.types"
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs
} from "../../../../commons/types/generated/types"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { usedItemDetailComment } from "../../../../commons/stores"

export default function BoardListContainer(props: IBoardListContainer) {
  const [, setUsedItemComment] = useRecoilState(usedItemDetailComment)
  const [resetPagination, setResetPagination] = useState(false)
  const router = useRouter()

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS)

  const { data: fetchBoardsCount, refetch: countRefetch } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT)

  const { data: bestBoards } = useQuery<Pick<IQuery, "fetchBoardsOfTheBest">>(
    FETCH_BOARDS_OF_THE_BEST
  )

  const onClickWritePage = () => {
    router.push(`/boards/new`)
  }

  const onClickDetailPage = (event: React.MouseEvent<HTMLElement>) => {
    setUsedItemComment(false)
    router.push(`/boards/${event.currentTarget.id}`)
  }

  const debounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1
    })
    countRefetch({
      search: value
    })
    setResetPagination(true)
  }, 500)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(e.currentTarget.value)
  }

  const lastPage = Math.ceil((fetchBoardsCount?.fetchBoardsCount ?? 10) / 10)

  const datas = {
    onClickWritePage,
    onClickDetailPage,
    onChangeSearch,
    data,
    headTitle: props.headTitle,
    componentTitle: props.componentTitle,
    lastPage,
    refetch,
    bestBoards,
    setResetPagination,
    resetPagination
  }

  return <BoardListPresenter {...datas} />
}
