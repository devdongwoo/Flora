import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import type { Address } from "react-daum-postcode"
import { UploadChangeParam, UploadFile } from "antd/es/upload"
import { IWriteContainer } from "./UsedWrite.types"
import UsedWritePresenter from "./UsedWrite.presenter"
import {
  CREATE_USED_ITEM,
  UPDATE_USED_ITEM,
  UPLOAD_FILE
} from "./UsedWrite.queries"
import {
  checkValidationFile,
  kakaoMapCreate,
  kakaoMapReset
} from "../../../../commons/utilities/utility"
import { useRecoilState } from "recoil"
import { usedItemEdit, userData } from "../../../../commons/stores"
import { IQuery } from "../../../../commons/types/generated/types"
import Swal from "sweetalert2"

function UseditemWriteContainer(props: IWriteContainer) {
  const [user] = useRecoilState(userData)
  const [usedItem, setUsedItem] = useRecoilState<
    Pick<IQuery, "fetchUseditem"> | undefined
  >(usedItemEdit)

  /* // UseditemData
  const [useditemData, setUseditemData] =
    useState<Pick<IQuery, "fetchUseditem">>() */

  // 카카오맵 위도 경도 설정
  const [latlng, setLatLng] = useState({ La: 33.450701, Ma: 126.570667 })

  // post daum
  const [isModalOpen, setIsModalOpen] = useState(false)

  // upload filie image
  const [fileList, setFileList] = useState<UploadFile[]>([])

  //  제목, 내용, 판매가격, 태그입력, 상세주소
  const [isTitle, setTitle] = useState("")
  const [isContent, setContent] = useState({ contentHtml: "", contentMark: "" })
  const [isSell, setSell] = useState(0)
  const [isTags, setTags] = useState(["", "", ""])

  // 제목, 내용, 판매가격, 태그입력 ref
  const title = useRef<HTMLInputElement>(null)
  const contents = useRef<any>(null)
  const sell = useRef<HTMLInputElement>(null)
  const tags = useRef<HTMLInputElement[]>([])

  // 제목, 내용 입력안할시 나오는 경고문구
  const titleError = useRef<HTMLDivElement>(null)
  const contentError = useRef<HTMLDivElement>(null)
  const mapError = useRef<HTMLDivElement>(null)

  // 주소 지역번호, 모든 주소, 상세 주소 입력
  const zoneCode = useRef<HTMLInputElement>(null)
  const fullAddressCode = useRef<HTMLInputElement>(null)
  const detailAddressCode = useRef<HTMLInputElement>(null)

  // 쿼리
  const [createUseditem] = useMutation(CREATE_USED_ITEM)
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  // router
  const router = useRouter()

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "title") {
      setTitle(e.currentTarget.value)
      if (e.currentTarget.value.length > 0 && titleError.current) {
        titleError.current.innerText = ""
      } else if (e.currentTarget.value.length === 0 && titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
      }
    }
  }

  const onChangeSell = (value: number | string) => {
    if (typeof value === "string") setSell(Number(value.replaceAll(",", "")))
    else setSell(value)
  }

  const onChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy = [...isTags]
    if (e.currentTarget.id === "tag1") {
      copy[0] = e.currentTarget.value
    } else if (e.currentTarget.id === "tag2") {
      copy[1] = e.currentTarget.value
    } else {
      copy[2] = e.currentTarget.value
    }
    setTags(copy)
  }

  const onChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (detailAddressCode.current) {
      detailAddressCode.current.value = e.currentTarget.value
    }
  }

  const onClickWrite = async () => {
    const file = fileList.map((el) => {
      return el.url?.replace("https://storage.googleapis.com/", "")
    })
    if (!isTitle) {
      if (titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
        return
      }
    }

    if (
      !isContent.contentMark.trim().replace("\n<br>\n", "").replace("<br>", "")
    ) {
      if (contentError.current) {
        contentError.current.innerText = "※내용을 입력해주세요."
        return
      }
    }

    if (
      !(
        (zoneCode.current && zoneCode.current.value.length > 0) ??
        (fullAddressCode.current && fullAddressCode.current.value.length > 0)
      )
    ) {
      if (mapError.current) {
        mapError.current.innerText = "※만날 장소를 작성해주세요."
        return
      }
    }

    try {
      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            name: isTitle,
            remarks: "",
            contents: isContent.contentHtml,
            price: isSell,
            tags: isTags,
            useditemAddress: {
              id: user.id,
              zipcode: zoneCode?.current?.value,
              address: fullAddressCode?.current?.value,
              addressDetail: detailAddressCode?.current?.value,
              lat: latlng.La,
              lng: latlng.Ma
            },
            images: file
          }
        }
      })

      if (result && result.data.createUseditem) {
        Swal.fire({
          title: `상품이 정상적으로 등록되었습니다.`,
          icon: "success"
        })
        await router.push(`/useditem/${result.data.createUseditem._id}`)
      }
    } catch (error) {
      if (error instanceof Error)
        Swal.fire({
          title: `${error.message}`,
          icon: "error"
        })
    }
  }

  const onClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (usedItem ?? e.currentTarget.id === "detail_cancel")
      router.replace({
        pathname: `/useditem/${router.query.usedItemId}`,
        query: {
          sellerId: router.query.sellerId
        }
      })
    else {
      if (e.currentTarget.id === "write_cancel") router.replace(`/useditem/`)
      /*       router.replace(`/boards/${router.query.boardId}`) */
    }
  }

  const onClickEdit = async () => {
    const file = fileList.map((el) => {
      return el.url?.replace("https://storage.googleapis.com/", "")
    })

    if (!title.current?.value) {
      if (titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
        return null
      }
    }
    if (
      !isContent.contentMark.trim().replace("\n<br>\n", "").replace("<br>", "")
    ) {
      if (contentError.current) {
        contentError.current.innerText = "※내용을 입력해주세요."
        return
      }
    }

    try {
      const result = await updateUseditem({
        variables: {
          updateUseditemInput: {
            name: title.current?.value,
            remarks: "",
            contents: contents.current?.getInstance().getHTML(),
            price: Number(sell?.current?.value.replaceAll(",", "")),
            tags: tags.current.map((el) => el.value),
            useditemAddress: {
              id: user.id,
              zipcode: zoneCode.current?.value,
              address: fullAddressCode.current?.value,
              addressDetail: detailAddressCode.current?.value,
              lat: latlng.La,
              lng: latlng.Ma
            },
            images: file
          },
          useditemId: router.query.usedItemId
        }
      })
      if (result && result.data.updateUseditem) {
        Swal.fire({
          title: `게시물이 정상적으로 수정되었습니다.`,
          icon: "success"
        })
        await router.push({
          pathname: `/useditem/${result.data.updateUseditem._id}`,
          query: {
            sellerId: router.query.sellerId
          }
        })
      }
    } catch (error) {
      if (error instanceof Error)
        Swal.fire({
          title: `${error.message}`,
          icon: "error"
        })
    }
  }

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }
  const handleOk = () => {
    toggleModal()
  }
  const handleCancel = () => {
    toggleModal()
  }

  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""
    }

    if (zoneCode.current) {
      zoneCode.current.value = data.zonecode
    }
    if (fullAddressCode.current) fullAddressCode.current.value = fullAddress
    kakaoMapReset(fullAddress, toggleModal, setLatLng)
  }

  const onChangeFile = async (e: UploadChangeParam<UploadFile<any>>) => {
    if (e.file.status !== "removed") {
      const validation = checkValidationFile(e.file)
      if (!validation) return
      const result = await uploadFile({
        variables: {
          file: e.file.originFileObj
        }
      })
      // eslint-disable-next-line
      const regex = /[^\/]+$/g
      result.data.uploadFile.name = result.data.uploadFile.url.match(regex)
      result.data.uploadFile.queryUrl = result.data.uploadFile.url
      result.data.uploadFile.url = `https://storage.googleapis.com/${result.data.uploadFile.url}`

      setFileList([...fileList, result.data.uploadFile])
    } else {
      setFileList([...e.fileList])
    }
  }

  useEffect(() => {
    if (props.isEdit) {
      ;(async () => {
        const result = (await props?.editData)
          ? await props?.editData
          : usedItem

        const data = result?.fetchUseditem?.images?.map((el, idx) => {
          // eslint-disable-next-line
          const regex = /[^\/]+$/g
          return {
            uid: String(idx),
            name: String(el.match(regex)),
            url: `https://storage.googleapis.com/` + el
          }
        })
        const editImages: UploadFile[] =
          typeof data !== "undefined" && data !== null ? data : []

        kakaoMapCreate(
          result?.fetchUseditem?.useditemAddress?.lat ?? 126.570667,
          result?.fetchUseditem?.useditemAddress?.lng ?? 33.450701,
          result?.fetchUseditem?.useditemAddress?.address ?? "kakao"
        )
        setLatLng({
          La: result?.fetchUseditem?.useditemAddress?.lat ?? 126.570667,
          Ma: result?.fetchUseditem?.useditemAddress?.lng ?? 33.450701
        })
        setFileList(editImages)
      })()
    } else {
      setUsedItem(undefined)
      kakaoMapCreate(126.570667, 33.450701, "만날장소 예시")
    }

    return () => {
      setUsedItem(undefined)
    }
  }, [])

  return (
    <>
      <UsedWritePresenter
        // 작성하기 구간
        onChangeData={onChangeInput}
        onClickWrite={onClickWrite}
        toggleModal={toggleModal}
        onChangeSell={onChangeSell}
        onChangeTags={onChangeTags}
        onChangeDetailAddress={onChangeDetailAddress}
        onChangeFile={onChangeFile}
        titleError={titleError}
        contentError={contentError}
        mapError={mapError}
        setContent={setContent}
        zoneCode={zoneCode}
        fullAddressCode={fullAddressCode}
        detailAddressCode={detailAddressCode}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleComplete={handleComplete}
        isModalOpen={isModalOpen}
        latlng={latlng}
        // 수정하기 구간
        editData={usedItem}
        onClickEdit={onClickEdit}
        title={title}
        contents={contents}
        sell={sell}
        tags={tags}
        onClickCancel={onClickCancel}
        isEdit={props.isEdit}
        fileList={fileList}
      />
    </>
  )
}

export default React.memo(UseditemWriteContainer)
