import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client"
import BoardEdit from "../../../src/components/units/board/write/BoardWrite.container"
import {
  IQuery,
  IQueryFetchBoardArgs
} from "../../../src/commons/types/generated/types"
import React from "react"

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }
`

function BoardsBoardIdEdit() {
  const router = useRouter()

  const { data: editData, loading } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: {
      boardId: String(router.query.boardId)
    }
  })

  if (!loading)
    return <BoardEdit isEdit={true} editData={editData} loading={loading} />
  else return <></>
}

export default React.memo(BoardsBoardIdEdit)
