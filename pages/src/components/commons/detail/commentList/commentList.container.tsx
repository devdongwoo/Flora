import { useRecoilState } from "recoil"
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
  IQueryFetchUseditemQuestionsArgs
} from "../../../../commons/types/generated/types"
import CommentListPresenter from "./commentList.presenter"
import {
  FETCH_BOARD_COMMENTS,
  FETCH_USED_ITEM_QUESTIONS
} from "./commentList.queries"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { usedItemDetailComment } from "../../../../commons/stores"

export default function CommentListContainer() {
  const router = useRouter()

  const [commentWriter] = useRecoilState(usedItemDetailComment)

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: String(router.query.boardId)
    }
  })

  const { data: fetchUsedItemQuestions, fetchMore: usedItemQuestions } =
    useQuery<
      Pick<IQuery, "fetchUseditemQuestions">,
      IQueryFetchUseditemQuestionsArgs
    >(FETCH_USED_ITEM_QUESTIONS, {
      variables: {
        useditemId: String(router.query.usedItemId)
      }
    })

  /* const { data: fetchUseditemQuestionAnswers } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">
  >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: {
      useditemQuestionId: String(user._id)
    }
  }) */

  const onLoadMore = async () => {
    if (!commentWriter) {
      if (data === undefined) return
      await fetchMore({
        variables: {
          page: Math.ceil(data.fetchBoardComments?.length / 10) + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult?.fetchBoardComments === undefined)
            return { fetchBoardComments: [...prev.fetchBoardComments] }
          return {
            fetchBoardComments: [
              ...prev.fetchBoardComments,
              ...fetchMoreResult.fetchBoardComments
            ]
          }
        }
      })
    } else {
      if (fetchUsedItemQuestions === undefined) return
      await usedItemQuestions({
        variables: {
          page:
            Math.ceil(
              fetchUsedItemQuestions.fetchUseditemQuestions.length / 10
            ) + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult?.fetchUseditemQuestions === undefined)
            return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] }
          return {
            fetchUseditemQuestions: [
              ...prev.fetchUseditemQuestions,
              ...fetchMoreResult.fetchUseditemQuestions
            ]
          }
        }
      })
    }
  }

  return (
    <CommentListPresenter
      data={data}
      fetchUsedItemQuestions={fetchUsedItemQuestions}
      onLoadMore={onLoadMore}
      commentWriter={commentWriter}
    />
  )
}
