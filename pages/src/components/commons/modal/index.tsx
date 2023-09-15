import { Modal, Upload, UploadFile, UploadProps } from "antd"
import { useRecoilState } from "recoil"
import { modalName, modalState, profileChange } from "../../../commons/stores"
import * as M from "./style"
import { useEffect, useRef, useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { UploadChangeParam } from "antd/es/upload"
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs
} from "../../../commons/types/generated/types"
import { useApolloClient, useMutation } from "@apollo/client"
import { checkValidationFile } from "../../../commons/utilities/utility"
import Swal from "sweetalert2"
import { FETCH_USER_LOGGED_IN } from "../header/header.queries"
import { UPLOAD_FILE } from "../../units/useditem/wirte/UsedWrite.queries"
import {
  UPDATE_USER,
  CREATE_POINT_TRANSACTION_OF_LOADING
} from "./modal.queries"

declare const window: typeof globalThis & {
  IMP: any
}

interface User {
  _id: string
  email: string
  name: string
  picture: string
  userPoint: {
    amount: number
  }
}

export default function CustomModal() {
  const [modalstate, setModalState] = useRecoilState(modalState)
  const [modalname] = useRecoilState(modalName)
  const [, setChangeProfile] = useRecoilState(profileChange)

  const [user, setUser] = useState<User>()

  const [imgUrl, setImgUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const ErrorName = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [updateUser] = useMutation<Pick<IMutation, "updateUser">>(UPDATE_USER)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  const client = useApolloClient()

  const uploadButton: JSX.Element = (
    <div>
      {loading ? <LoadingOutlined rev={true} /> : <PlusOutlined rev={true} />}
      <div style={{ marginTop: 8 }}>프로필관리</div>
    </div>
  )

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    const validation = checkValidationFile(info.file)
    if (!validation) return
    const result = await uploadFile({
      variables: {
        file: info.file.originFileObj
      }
    })
    // eslint-disable-next-line
    const regex = /[^\/]+$/g
    result.data.uploadFile.name = result.data.uploadFile.url.match(regex)
    result.data.uploadFile.queryUrl = result.data.uploadFile.url
    result.data.uploadFile.url = `https://storage.googleapis.com/${result.data.uploadFile.url}`

    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      setLoading(false)
      setImgUrl(result.data.uploadFile.url)
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modalname === "modification") {
      if (e.currentTarget.value.length > 0 && ErrorName.current) {
        ErrorName.current.innerText = ""
        setIsActive(true)
      } else if (e.currentTarget.value.length === 0 && ErrorName.current) {
        ErrorName.current.innerText = "※닉네임을 입력해주세요."
        setIsActive(false)
      }
    } else if (modalname === "charge") {
      if (Number(e.currentTarget.value) > 0 && ErrorName.current) {
        ErrorName.current.innerText = ""
        setIsActive(true)
      } else if (Number(e.currentTarget.value) === 0 && ErrorName.current) {
        ErrorName.current.innerText = "※충전금액을 입력해주세요."
        setIsActive(false)
      }

      if (inputRef.current)
        inputRef.current.value = inputRef?.current?.value.replace(
          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
          ","
        )
    }
  }

  const onClickOk = async () => {
    if (modalname === "modification") {
      if (inputRef?.current?.value.length === 0) return null
      try {
        const result = await updateUser({
          variables: {
            updateUserInput: {
              name: inputRef?.current?.value,
              picture: imgUrl
            }
          }
        })

        if (result && result.data?.updateUser._id) {
          Swal.fire({
            icon: `success`,
            title: `정상적으로 변경되었습니다👍`
          })
          setChangeProfile((prev) => !prev)

          setModalState((prev) => !prev)
        }
      } catch (error) {
        if (error instanceof Error)
          Swal.fire({
            icon: `error`,
            title: error.message
          })
      }
    } else if (modalname === "charge") {
      if (!inputRef?.current?.value && ErrorName.current) {
        ErrorName.current.innerText = "※충전금액을 입력해주세요."
        setIsActive(false)
        return
      }
      if (inputRef?.current?.value === String(0)) return

      const IMP = window.IMP
      IMP.init("imp49910675")

      IMP.request_pay(
        {
          pg: "kakaopay",
          pay_method: "card",
          name: "충전하기",
          amount: inputRef?.current?.value.replaceAll(",", ""),
          buyer_email: user?.email,
          buyer_name: user?.name,
          buyer_tel: "010-4242-4242",
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "01181",
          m_redirect_url: ""
        },
        async (rsp: any) => {
          // callback
          if (rsp.success) {
            await client.mutate<
              Pick<IMutation, "createPointTransactionOfLoading">,
              IMutationCreatePointTransactionOfLoadingArgs
            >({
              mutation: CREATE_POINT_TRANSACTION_OF_LOADING,
              variables: { impUid: rsp.imp_uid }
            })

            Swal.fire({
              icon: `success`,
              title: `결제완료!`
            })

            setModalState((prev) => !prev)
          } else {
            console.log(rsp, "fail")
          }
        }
      )
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.iamport.kr/v1/iamport.js"
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (modalname === "modification") {
      ;(async () => {
        const { data } = await client.query({
          query: FETCH_USER_LOGGED_IN
        })
        setUser(data.fetchUserLoggedIn)
        setImgUrl(data.fetchUserLoggedIn.picture)
      })()
    }
  }, [modalname])

  return (
    <Modal
      title={modalname === "modification" ? "정보수정" : "충전하기"}
      open={modalstate}
      okText={modalname === "modification" ? "변경" : "충전"}
      cancelText="취소"
      onOk={onClickOk}
      onCancel={() => {
        setModalState((prev) => !prev)
      }}
    >
      {modalname === "modification" && (
        <>
          <M.ImgText>프로필</M.ImgText>
          <M.ImgBox>
            <Upload
              name="profile"
              listType="picture-circle"
              onChange={handleChange}
              showUploadList={false}
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt="profile"
                  style={{
                    width: "100%",
                    borderRadius: "50%",
                    height: "100%"
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <M.Sub>
              <M.SubBox>
                <M.NickName>
                  <M.emoji title={user?.name}>😀{user?.name}</M.emoji>
                </M.NickName>
                <M.SubTitle>Web Developer</M.SubTitle>
              </M.SubBox>
              <M.SubBox>
                <M.NickName>
                  <M.emoji>포인트</M.emoji>
                </M.NickName>
                <M.SubTitle style={{ fontSize: "14px" }}>
                  &#8361;{" "}
                  {String(user?.userPoint?.amount).replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </M.SubTitle>
              </M.SubBox>
            </M.Sub>
          </M.ImgBox>
          <M.NickName>
            <M.NickName>닉네임</M.NickName>
            <M.Input
              isActive={isActive}
              defaultValue={user?.name}
              ref={inputRef}
              onChange={onChangeInput}
            />
          </M.NickName>
          <M.NickNameError ref={ErrorName} />
        </>
      )}
      {modalname !== "modification" && (
        <>
          <M.NickNameBox>
            <M.NickName>충전금액</M.NickName>
            <M.Input
              type="text"
              isActive={isActive}
              ref={inputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ""
                )

                onChangeInput(e)
              }}
            />
          </M.NickNameBox>
          <M.MoneyError ref={ErrorName} />
          <M.Description>
            <M.Ex>＊ 숫자만 입력가능합니다.</M.Ex>
            <M.Ex>＊ 포인트로 물건을 구매할 수 있습니다.</M.Ex>
            <M.Ex>＊ 카카오페이로는 최대 100만원까지 가능합니다.</M.Ex>
          </M.Description>
        </>
      )}
    </Modal>
  )
}
