import { Dispatch, RefObject, SetStateAction } from "react"
import {
  IBoardComment,
  IQuery,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
  Maybe
} from "../../../../commons/types/generated/types"
import { NextRouter } from "next/router"

export interface ICommentWriteContainer {
  _id?: string
  id?: string
  contents?: string
  boardCommentId?: string
  rating?: number
  idx?: number
  isEdit?: boolean
  isClose?: boolean
  reComment?: boolean
  useComment?: IBoardComment[]
  router?: NextRouter
  setShowEdit?: Dispatch<SetStateAction<boolean>>
  writer?: Maybe<string>
  data?: Pick<IQuery, "fetchBoardComments">
  useditemQuestion?: IUseditemQuestion | IUseditemQuestionAnswer
  questionAnswer?: IUseditemQuestionAnswer
}

export interface ICommentWritePresenter {
  onClickRegist: () => void
  onClickCancel: () => void
  onClickUpdate: () => void
  onChangeComment: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onChangeWriter: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void
  writerInput: RefObject<HTMLInputElement>
  passwordInput: RefObject<HTMLInputElement>
  textArea: RefObject<HTMLTextAreaElement>
  setRate: Dispatch<SetStateAction<number>>
  setCommentsEdit?: Dispatch<SetStateAction<boolean[]>>
  comment: RefObject<HTMLDivElement>
  rate: number
  isEdit?: boolean
  commentsEdit?: boolean[]
  commentWriter: boolean
  reComment?: boolean
  user: any
}
