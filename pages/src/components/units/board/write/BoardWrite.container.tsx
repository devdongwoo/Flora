import React, { useLayoutEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import type { Address } from "react-daum-postcode"
import { UploadChangeParam, UploadFile } from "antd/es/upload"
import { IWriteContainer } from "./BoardWrite.types"
import BoardWritePresenter from "./BoardWrite.presenter"
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries"
import { checkValidationFile } from "../../../../commons/utilities/utility"
import Swal from "sweetalert2"

function BoardWriteContainer(props: IWriteContainer) {
  // post daum
  const [isModalOpen, setIsModalOpen] = useState(false)

  // upload filie image
  const [fileList, setFileList] = useState<UploadFile[]>([])

  // 작성자, 비밀번호, 제목
  const [isWriter, setWriter] = useState("")
  const [isPwd, setPwd] = useState("")
  const [isTitle, setTitle] = useState("")
  const [isContent, setContent] = useState("")

  // 작성자, 비밀번호, 제목, 내용 ref
  const writer = useRef<HTMLInputElement>(null)
  const pwd = useRef<HTMLInputElement>(null)
  const title = useRef<HTMLInputElement>(null)
  const contents = useRef<HTMLTextAreaElement>(null)

  // 작성자, 비밀번호, 제목 입력안할시 나오는 경고문구
  const writerError = useRef<HTMLDivElement>(null)
  const pwdError = useRef<HTMLDivElement>(null)
  const titleError = useRef<HTMLDivElement>(null)
  const contentError = useRef<HTMLDivElement>(null)

  // 주소 지역번호, 모든 주소, 상세 주소 입력
  const zoneCode = useRef<HTMLInputElement>(null)
  const fullAddressCode = useRef<HTMLInputElement>(null)
  const detailAddressCode = useRef<HTMLInputElement>(null)

  // 유튜브 url 입력
  const utubeUrl = useRef<HTMLInputElement>(null)

  // 쿼리
  const [createBoard] = useMutation(CREATE_BOARD)
  const [updateBoard] = useMutation(UPDATE_BOARD)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  // router
  const router = useRouter()

  const onChangeInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.currentTarget.id === "writer") {
      setWriter(e.currentTarget.value)
      if (e.currentTarget.value.length > 0 && writerError.current) {
        writerError.current.innerText = ""
      } else if (e.currentTarget.value.length === 0 && writerError.current) {
        writerError.current.innerText = "※작성자를 입력해주세요."
      }
    } else if (e.currentTarget.id === "pwd") {
      setPwd(e.currentTarget.value)
      if (e.currentTarget.value.length > 0 && pwdError.current) {
        pwdError.current.innerText = ""
      } else if (e.currentTarget.value.length === 0 && pwdError.current) {
        pwdError.current.innerText = "※비밀번호를 입력해주세요."
      }
    } else if (e.currentTarget.id === "title") {
      setTitle(e.currentTarget.value)
      if (e.currentTarget.value.length > 0 && titleError.current) {
        titleError.current.innerText = ""
      } else if (e.currentTarget.value.length === 0 && titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
      }
    } else {
      setContent(e.currentTarget.value)
      if (e.currentTarget.value.length > 0 && contentError.current) {
        contentError.current.innerText = ""
      } else if (e.currentTarget.value.length === 0 && contentError.current) {
        contentError.current.innerText = "※내용을 입력해주세요."
      }
    }
  }

  const onChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (detailAddressCode.current)
      detailAddressCode.current.value = e.currentTarget.value
  }

  const onChangeUtube = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (utubeUrl.current) utubeUrl.current.value = e.currentTarget.value
  }

  const onClickWrite = async () => {
    const file = fileList.map((el) => {
      return el.url?.replace("https://storage.googleapis.com/", "")
    })
    if (!isWriter) {
      if (writerError.current) {
        writerError.current.innerText = "※작성자를 적어주세요."
        return
      }
    }
    if (!isPwd) {
      if (pwdError.current) {
        pwdError.current.innerText = "※비밀번호를 입력해주세요."
        return
      }
    }

    if (!isTitle) {
      if (titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
        return
      }
    }

    if (!isContent) {
      if (contentError.current) {
        contentError.current.innerText = "※내용을 입력해주세요."
        return
      }
    }
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: isWriter,
            password: isPwd,
            title: isTitle,
            contents: isContent,
            youtubeUrl: utubeUrl?.current?.value,
            boardAddress: {
              zipcode: zoneCode?.current?.value,
              address: fullAddressCode?.current?.value,
              addressDetail: detailAddressCode?.current?.value
            },
            images: file
          }
        }
      })
      if (result && result.data.createBoard) {
        Swal.fire({
          title: `게시물이 정상적으로 등록되었습니다.`,
          icon: "success"
        })
        await router.push(`/boards/${result.data.createBoard._id}`)
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
    if (e.currentTarget.id === "write_cancel") router.replace(`/boards`)
    else router.replace(`/boards/${router.query.boardId}`)
  }

  const onClickEdit = async () => {
    const file = fileList.map((el) => {
      return el.url?.replace("https://storage.googleapis.com/", "")
    })
    if (writer?.current?.value === "") {
      if (writerError.current) {
        writerError.current.innerText = "※작성자를 적어주세요."
        return null
      }
    }
    if (pwd?.current?.value === "") {
      if (pwdError.current) {
        pwdError.current.innerText = "※처음 작성한 비밀번호를 입력해주세요."
        return null
      }
    }

    if (title.current?.value === "") {
      if (titleError.current) {
        titleError.current.innerText = "※제목을 작성해주세요."
        return null
      }
    }
    if (contents.current?.value === "") {
      if (contentError.current) {
        contentError.current.innerText = "※내용을 입력해주세요."
        return null
      }
    }

    try {
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: title.current?.value,
            contents: contents.current?.value,
            youtubeUrl: utubeUrl?.current?.value,
            boardAddress: {
              zipcode: zoneCode.current?.value,
              address: fullAddressCode.current?.value,
              addressDetail: detailAddressCode.current?.value
            },
            images: file
          },
          password: pwd?.current?.value,
          boardId: router.query.boardId
        }
      })
      if (result && result.data.updateBoard) {
        Swal.fire({
          title: `게시물이 정상적으로 수정되었습니다.`,
          icon: "success"
        })
        router.push(`/boards/${result.data.updateBoard._id}`)
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
    toggleModal()
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

  useLayoutEffect(() => {
    if (!props?.loading) {
      const data = props?.editData?.fetchBoard?.images?.map((el, idx) => {
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
      setFileList(editImages)
    }
  }, [])

  return (
    <>
      <BoardWritePresenter
        // 작성하기 구간
        isWriter={isWriter}
        onChangeData={onChangeInput}
        onClickWrite={onClickWrite}
        toggleModal={toggleModal}
        onChangeDetailAddress={onChangeDetailAddress}
        onChangeUtube={onChangeUtube}
        onChangeFile={onChangeFile}
        writerError={writerError}
        pwdError={pwdError}
        titleError={titleError}
        contentError={contentError}
        zoneCode={zoneCode}
        fullAddressCode={fullAddressCode}
        detailAddressCode={detailAddressCode}
        utubeUrl={utubeUrl}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleComplete={handleComplete}
        isModalOpen={isModalOpen}
        // 수정하기 구간
        editData={props.editData}
        onClickEdit={onClickEdit}
        writer={writer}
        pwd={pwd}
        title={title}
        contents={contents}
        onClickCancel={onClickCancel}
        isEdit={props.isEdit}
        fileList={fileList}
      />
    </>
  )
}

export default React.memo(BoardWriteContainer)
