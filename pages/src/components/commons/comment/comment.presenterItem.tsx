import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faComments } from "@fortawesome/free-regular-svg-icons"
import {
  faPencil,
  faCircleUser,
  faArrowTurnUp
} from "@fortawesome/free-solid-svg-icons"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IMutation,
  IMutationDeleteBoardCommentArgs,
  IMutationDeleteUseditemQuestionAnswerArgs,
  IMutationDeleteUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs
} from "../../../commons/types/generated/types"
import * as L from "./comment.style"
import { dateFormat } from "../../../commons/utilities/utility"
import {
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
  DELETE_USED_ITEM_QUESTION,
  DELETE_USED_ITEM_QUESTION_ANSWER
} from "./comment.queries"
import { IComment } from "./comment.types"
import CommentWriteContainer from "../detail/commentWrite/commentWrite.container"
import { useRecoilState } from "recoil"
import { usedItemDetailComment, userData } from "../../../commons/stores"
import Swal from "sweetalert2"

export default function Comment(props: IComment) {
  const router = useRouter()

  const [user] = useRecoilState(userData)
  const [commentWriter] = useRecoilState(usedItemDetailComment)
  const [showEdit, setShowEdit] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [reComment, setReComment] = useState(false)

  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT)

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION)

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER)

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: {
      useditemQuestionId: String(
        props?.questionAnswer?._id ?? props?.useditemQuestion?._id
      )
    }
  })

  const recommentReset = () => {
    setShowComment((prev) => !prev)
    setReComment((prev) => !prev)
  }

  const onClickComments = () => {
    recommentReset()
  }

  const onClickEdit = () => {
    if (showComment) recommentReset()
    setShowEdit((prev) => !prev)
  }

  const onClickDelete = async (
    event: React.MouseEvent<HTMLSpanElement>
  ): Promise<void> => {
    if (!(props.useditemQuestion ?? props.questionAnswer)) {
      const boardCommentId = event.currentTarget.id

      await Swal.fire({
        title: "비밀번호를 입력해주세요",
        input: "text"
      }).then(async ({ value: password }) => {
        try {
          await deleteBoardComment({
            variables: {
              password,
              boardCommentId
            },
            refetchQueries: [
              {
                query: FETCH_BOARD_COMMENTS,
                variables: {
                  boardId: String(router.query.boardId)
                }
              }
            ]
          })
        } catch (error) {
          if (error instanceof Error)
            Swal.fire({
              title: `${error.message}`,
              icon: "error"
            })
        }
      })
    } else {
      if (props.useditemQuestion) {
        try {
          await deleteUseditemQuestion({
            variables: {
              useditemQuestionId: String(props.useditemQuestion._id)
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestions: (prev, { readField }) => {
                    const deleteId = data?.deleteUseditemQuestion
                    const filteredPrev = prev.filter(
                      (el: any) => readField("_id", el) !== deleteId
                    )
                    return [...filteredPrev]
                  }
                }
              })
            }
          })
        } catch (error) {
          if (error instanceof Error)
            Swal.fire({
              title: `${error.message}`,
              icon: "error"
            })
        }
      } else if (props.questionAnswer) {
        try {
          await deleteUseditemQuestionAnswer({
            variables: {
              useditemQuestionAnswerId: String(props.questionAnswer._id)
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestionAnswers: (prev, { readField }) => {
                    const deleteId = data?.deleteUseditemQuestionAnswer
                    const filteredPrev = prev.filter(
                      (el: any) => readField("_id", el) !== deleteId
                    )
                    return [...filteredPrev]
                  }
                }
              })
            }
          })
        } catch (error) {
          if (error instanceof Error)
            Swal.fire({
              title: `${error.message}`,
              icon: "error"
            })
        }
      }
    }
  }

  return (
    <>
      {showEdit ? (
        <CommentWriteContainer
          isEdit={true}
          setShowEdit={setShowEdit}
          router={router}
          writer={props?.boardComment?.writer}
          rating={props?.boardComment?.rating}
          contents={props?.boardComment?.contents}
          boardCommentId={props?.boardComment?._id}
          useditemQuestion={props.useditemQuestion}
          questionAnswer={props.questionAnswer}
        />
      ) : (
        <L.ContentBox
          key={
            commentWriter
              ? props.useditemQuestion?._id ?? props.questionAnswer?._id
              : props?.boardComment?._id
          }
          question={props?.question}
        >
          <L.ContentWrap>
            <L.Icon>
              {props.question && (
                <L.ReCommentIcon>
                  <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} />
                </L.ReCommentIcon>
              )}
              {commentWriter ? (
                props.useditemQuestion?.user.picture ??
                props.questionAnswer?.user.picture ? (
                  <L.Img
                    src={`https://storage.googleapis.com/${
                      props?.useditemQuestion?.user?.picture?.replaceAll(
                        "https://storage.googleapis.com/",
                        ""
                      ) ??
                      props.questionAnswer?.user.picture?.replaceAll(
                        "https://storage.googleapis.com/",
                        ""
                      )
                    }`}
                    width="38px"
                    height="38px"
                    question={props?.question}
                  />
                ) : (
                  <L.UnUser question={props?.question}>
                    <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
                  </L.UnUser>
                )
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ color: "gray" }}
                ></FontAwesomeIcon>
              )}
            </L.Icon>
            <L.RightContents>
              <L.Top question={props?.question}>
                <L.TopLeftBox>
                  <L.UserName>
                    {commentWriter
                      ? props.useditemQuestion?.user.name ??
                        props?.questionAnswer?.user?.name
                      : props?.boardComment?.writer}
                  </L.UserName>
                  {commentWriter ? (
                    <></>
                  ) : (
                    <L.UserRate disabled value={props?.boardComment?.rating} />
                  )}
                </L.TopLeftBox>
                <L.TopRightBox>
                  {commentWriter && (
                    <L.Comments onClick={onClickComments} title="답글">
                      <FontAwesomeIcon icon={faComments}></FontAwesomeIcon>
                    </L.Comments>
                  )}

                  {commentWriter ? (
                    props.id === user._id ? (
                      <L.PenIcon onClick={onClickEdit} title="수정">
                        <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                      </L.PenIcon>
                    ) : props.questionAnswer?.user._id === user._id ? (
                      <L.PenIcon onClick={onClickEdit} title="수정">
                        <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                      </L.PenIcon>
                    ) : (
                      <></>
                    )
                  ) : (
                    <L.PenIcon onClick={onClickEdit} title="수정">
                      <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                    </L.PenIcon>
                  )}

                  {commentWriter ? (
                    props.id === user._id ? (
                      <L.CancelIcon
                        onClick={onClickDelete}
                        id={
                          commentWriter
                            ? props.useditemQuestion?.user._id
                            : props?.boardComment?._id
                        }
                        title="삭제"
                      >
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      </L.CancelIcon>
                    ) : props.questionAnswer?.user._id === user._id ? (
                      <L.CancelIcon
                        onClick={onClickDelete}
                        id={props?.questionAnswer?._id}
                        title="삭제"
                      >
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      </L.CancelIcon>
                    ) : (
                      <></>
                    )
                  ) : (
                    <L.CancelIcon
                      onClick={onClickDelete}
                      id={
                        commentWriter
                          ? props.useditemQuestion?.user._id
                          : props?.boardComment?._id
                      }
                      title="삭제"
                    >
                      <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                    </L.CancelIcon>
                  )}
                </L.TopRightBox>
              </L.Top>
              <L.RightCenter>
                {commentWriter
                  ? props.useditemQuestion?.contents ??
                    props?.questionAnswer?.contents
                  : props?.boardComment?.contents}
              </L.RightCenter>
              <L.Date>
                {dateFormat(
                  commentWriter
                    ? props.useditemQuestion?.user.createdAt ??
                        props?.questionAnswer?.createdAt
                    : props?.boardComment?.createdAt
                )}
              </L.Date>
            </L.RightContents>
          </L.ContentWrap>
          {showComment && (
            <L.ReComment>
              <CommentWriteContainer
                _id={props.useditemQuestion?._id ?? props.questionAnswer?._id}
                reComment={reComment}
              />
            </L.ReComment>
          )}
          {data?.fetchUseditemQuestionAnswers.map((el) => {
            return (
              <Comment
                key={el._id}
                id={el._id}
                questionAnswer={el}
                question={true}
              />
            )
          })}
        </L.ContentBox>
      )}
    </>
  )
}
