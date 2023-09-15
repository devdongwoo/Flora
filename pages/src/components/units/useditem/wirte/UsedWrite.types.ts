/* import { RefObject } from "react"
import type { Address } from "react-daum-postcode" */

import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react"
import { Address } from "react-daum-postcode"
import { IQuery } from "../../../../commons/types/generated/types"
import { UploadChangeParam, UploadFile } from "antd/es/upload"

export interface IWriteContainer {
  isEdit: boolean
  editData?: Promise<Pick<IQuery, "fetchUseditem"> | undefined>
}

interface ICopyType {
  isModalOpen: boolean
  isEdit: boolean
  fileList: UploadFile[]
  titleError: RefObject<HTMLDivElement>
  contentError: RefObject<HTMLDivElement>
  mapError: React.RefObject<HTMLDivElement>
  setContent: Dispatch<
    SetStateAction<{
      contentHtml: string
      contentMark: string
    }>
  >
  zoneCode: RefObject<HTMLInputElement>
  fullAddressCode: RefObject<HTMLInputElement>
  detailAddressCode: RefObject<HTMLInputElement>
  title: RefObject<HTMLInputElement>
  contents: RefObject<HTMLTextAreaElement>
  sell: RefObject<HTMLInputElement>
  tags: MutableRefObject<HTMLInputElement[]>
  editData?: Pick<IQuery, "fetchUseditem">
  latlng: {
    La: number
    Ma: number
  }
}

export interface IWritePresenter extends ICopyType {
  handleComplete: (data: Address) => void
  handleOk: () => void
  handleCancel: () => void
  toggleModal: () => void
  onClickWrite: () => void
  onClickEdit?: () => void
  onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onChangeSell: (value: number | string) => void
  onChangeDetailAddress: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTags: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeFile: (e: UploadChangeParam<UploadFile<any>>) => void
  onChangeData: (e: React.ChangeEvent<HTMLInputElement>) => void
}
