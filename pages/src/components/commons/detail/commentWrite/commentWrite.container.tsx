import { useEffect, useRef, useState } from "react"
import { FETCH_BOARD_COMMENTS } from "../commentList/commentList.queries"
import {
  CREATE_BOARD_COMMENT,
  CREATE_USED_ITEM_QUESTION,
  CREATE_USED_ITEM_QUESTION_ANSWER,
  UPDATE_BOARD_COMMENT,
  UPDATE_USED_ITEM_QUESTION,
  UPDATE_USED_ITEM_QUESTION_ANSWER
} from "./commentWrite.queries"
import { ICommentWriteContainer } from "./commentWrite.types"
import CommentWriterPresenter from "./commentWrite.presenter"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationCreateUseditemQuestionArgs,
  IMutationUpdateBoardCommentArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionArgs
} from "../../../../commons/types/generated/types"
import { usedItemDetailComment, userData } from "../../../../commons/stores"
import { useRecoilState } from "recoil"
import Swal from "sweetalert2"

export default function CommentWriteContainer(props: ICommentWriteContainer) {
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT)

  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT)

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION)

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION)

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER)

  const [updateUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER)

  const router = useRouter()

  const [user] = useRecoilState(userData)
  const [commentWriter] = useRecoilState(usedItemDetailComment)

  const writerInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const textArea = useRef<HTMLTextAreaElement>(null)
  const comment = useRef<HTMLDivElement>(null)

  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [contents, setContents] = useState("")
  const [rate, setRate] = useState(0)

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (comment.current?.innerText !== undefined) {
      setContents(event.target.value)
      comment.current.innerText = `${event.currentTarget.textLength} / 100`
    }
  }

  const onClickCancel = () => {
    if (props.setShowEdit) props.setShowEdit(false)
  }

  const onClickRegist = async () => {
    if (
      (textArea.current && !textArea.current.value.trim()) ??
      (textArea.current && textArea.current.value === "")
    ) {
      Swal.fire({
        title: "내용을 써주세요.",
        icon: "error"
      })
      textArea.current.focus()
      return
    }
    if (!commentWriter) {
      if (!writer) {
        Swal.fire({
          title: "작성자를 입력해주세요.",
          icon: "error"
        })
        return
      }

      if (!password) {
        Swal.fire({
          title: "비밀번호를 입력해주세요.",
          icon: "error"
        })
        return
      }

      if (!contents) {
        Swal.fire({
          title: "내용을 입력해주세요.",
          icon: "error"
        })
        return
      }

      try {
        await createBoardComment({
          variables: {
            createBoardCommentInput: {
              writer,
              password,
              contents,
              rating: rate
            },
            boardId: String(router.query?.boardId)
          },
          refetchQueries: [
            {
              query: FETCH_BOARD_COMMENTS,
              variables: {
                boardId: router.query?.boardId
              }
            }
          ]
        })
        if (writerInput?.current) {
          setWriter("")
          writerInput.current.value = ""
        }
        if (passwordInput?.current) {
          setPassword("")
          passwordInput.current.value = ""
        }
        if (textArea?.current) {
          setContents("")
          textArea.current.value = ""
        }
        setRate(0)

        if (comment.current) comment.current.innerText = `0 / 100`
      } catch (error) {
        if (error instanceof Error)
          Swal.fire({
            title: `${error.message}`,
            icon: "error"
          })
      }
    } else {
      if (!contents) {
        Swal.fire({
          title: "내용을 입력해주세요.",
          icon: "error"
        })
        return
      }

      // 답글
      if (props.reComment) {
        try {
          await createUseditemQuestionAnswer({
            variables: {
              createUseditemQuestionAnswerInput: {
                contents
              },
              useditemQuestionId: String(props._id)
            },
            // refetch 안하고 cache로 바꾸는거
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestionAnswers: (prev) => {
                    return [data?.createUseditemQuestionAnswer, ...prev]
                  }
                }
              })
            }
          })
          if (textArea?.current) {
            setContents("")
            textArea.current.value = ""
          }
          setRate(0)

          if (comment.current) comment.current.innerText = `0 / 100`
        } catch (error) {
          if (error instanceof Error)
            Swal.fire({
              title: `${error.message}`,
              icon: "error"
            })
        }
      } else {
        // 댓글
        try {
          await createUseditemQuestion({
            variables: {
              createUseditemQuestionInput: {
                contents
              },
              useditemId: String(router.query?.usedItemId)
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestions: (prev) => {
                    return [data?.createUseditemQuestion, ...prev]
                  }
                }
              })
            }
          })
          if (textArea?.current) {
            setContents("")
            textArea.current.value = ""
          }
          setRate(0)

          if (comment.current) comment.current.innerText = `0 / 100`
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

  const onClickUpdate = async () => {
    if (
      (textArea.current && !textArea.current.value.trim()) ??
      (textArea.current && textArea.current.value === "")
    ) {
      Swal.fire({
        title: "내용을 써주세요.",
        icon: "error"
      })
      textArea.current.focus()
      return
    }

    if (passwordInput.current && passwordInput.current.value === "") {
      Swal.fire({
        title: "비밀번호를 입력해주세요.",
        icon: "error"
      })
      passwordInput.current.focus()
      return null
    }

    if (!(props.useditemQuestion ?? props.questionAnswer)) {
      try {
        await updateBoardComment({
          variables: {
            updateBoardCommentInput: {
              contents: String(textArea?.current?.value),
              rating: rate
            },
            password: String(passwordInput?.current?.value),
            boardCommentId: String(props?.boardCommentId)
          },
          refetchQueries: [
            {
              query: FETCH_BOARD_COMMENTS,
              variables: {
                boardId: props.router?.query.boardId
              }
            }
          ]
        })
        if (props.setShowEdit) props.setShowEdit(false)
      } catch (error) {
        if (error instanceof Error)
          Swal.fire({
            title: `${error.message}`,
            icon: "error"
          })
      }
    } else {
      if (props.useditemQuestion?.__typename) {
        try {
          await updateUseditemQuestion({
            variables: {
              updateUseditemQuestionInput: {
                contents: String(textArea?.current?.value)
              },
              useditemQuestionId: props.useditemQuestion._id
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestions: (prev) => {
                    return [data?.updateUseditemQuestion, ...prev]
                  }
                }
              })
            }
          })
          if (props.setShowEdit) props.setShowEdit(false)
        } catch (error) {
          if (error instanceof Error)
            Swal.fire({
              title: `${error.message}`,
              icon: "error"
            })
        }
      } else if (props.questionAnswer?.__typename) {
        try {
          await updateUseditemQuestionAnswer({
            variables: {
              updateUseditemQuestionAnswerInput: {
                contents: String(textArea?.current?.value)
              },
              useditemQuestionAnswerId: props.questionAnswer._id
            },
            update(cache, { data }) {
              cache.modify({
                fields: {
                  fetchUseditemQuestions: (prev) => {
                    return [data?.updateUseditemQuestionAnswer, ...prev]
                  }
                }
              })
            }
          })
          if (props.setShowEdit) props.setShowEdit(false)
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

  useEffect(() => {
    if (props.isEdit) {
      if (!commentWriter) {
        if (writerInput.current && props.writer)
          writerInput.current.value = props.writer
        if (props.rating) setRate(props.rating)
        if (comment.current && textArea.current && props.contents) {
          textArea.current.value = props.contents
          comment.current.innerText = `${props.contents.length} / 100`
        }
      } else {
        if (
          comment.current &&
          textArea.current &&
          (props.useditemQuestion?.contents ?? props.questionAnswer?.contents)
        ) {
          textArea.current.value = String(
            props.useditemQuestion?.contents ?? props.questionAnswer?.contents
          )
          comment.current.innerText = `${
            props.useditemQuestion?.contents.length ??
            props.questionAnswer?.contents.length
          } / 100`
        }
      }
    }
  }, [])

  const datas = {
    comment,
    onChangeComment,
    onClickRegist,
    onChangeWriter,
    onChangePassword,
    onClickCancel,
    onClickUpdate,
    writerInput,
    passwordInput,
    textArea,
    setRate,
    rate,
    commentWriter,
    user,
    reComment: props.reComment,
    isEdit: props.isEdit
  }

  return <CommentWriterPresenter {...datas} />
}
