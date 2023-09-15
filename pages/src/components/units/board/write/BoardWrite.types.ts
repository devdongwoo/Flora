/* import { RefObject } from "react"
import type { Address } from "react-daum-postcode" */

import { RefObject } from "react"
import { Address } from "react-daum-postcode"
import { IQuery } from "../../../../commons/types/generated/types"
import { UploadChangeParam, UploadFile } from "antd/es/upload"

export interface IWriteContainer {
  editData?: Pick<IQuery, "fetchBoard">
  loading?: boolean
  isEdit: boolean
}

interface ICopyType {
  isModalOpen: boolean
  isEdit: boolean
  isWriter: string
  fileList: UploadFile[]
  writerError: RefObject<HTMLDivElement>
  pwdError: RefObject<HTMLDivElement>
  titleError: RefObject<HTMLDivElement>
  contentError: RefObject<HTMLDivElement>
  zoneCode: RefObject<HTMLInputElement>
  fullAddressCode: RefObject<HTMLInputElement>
  detailAddressCode: RefObject<HTMLInputElement>
  utubeUrl: RefObject<HTMLInputElement>
  writer: RefObject<HTMLInputElement>
  pwd: RefObject<HTMLInputElement>
  title: RefObject<HTMLInputElement>
  contents: RefObject<HTMLTextAreaElement>
  editData?: Pick<IQuery, "fetchBoard">
}

export interface IWritePresenter extends ICopyType {
  handleOk: () => void
  handleCancel: () => void
  toggleModal: () => void
  onClickWrite: () => void
  onClickEdit?: () => void
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleComplete: (data: Address) => void
  onChangeDetailAddress: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeUtube: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeFile: (e: UploadChangeParam<UploadFile<any>>) => void
  onChangeData: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
}
