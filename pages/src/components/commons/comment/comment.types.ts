import {
  IBoardComment,
  IUseditemQuestion,
  IUseditemQuestionAnswer
} from "../../../commons/types/generated/types"

export interface IComment {
  id?: string
  boardComment?: IBoardComment
  questionAnswer?: IUseditemQuestionAnswer
  useditemQuestion?: IUseditemQuestion
  borderBottom?: boolean
  question?: boolean
}
