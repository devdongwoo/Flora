import * as B from "./UsedWrite.style"
import { IWritePresenter } from "./UsedWrite.types"
import { Button, Modal, Upload } from "antd"
import DaumPostcodeEmbed from "react-daum-postcode"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import React, { Fragment } from "react"
import dynamic from "next/dynamic"

const ToastEditor = dynamic(
  async () => await import("../../../commons/toastEditor"),
  {
    ssr: false
  }
)

function UseditemWritePresenter(props: IWritePresenter) {
  return (
    <B.Wrap>
      <B.WrapContent>
        <B.ListBox>
          <B.Header>
            <B.MainText>
              <B.TextIcon>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
              </B.TextIcon>
              {props.isEdit ? props.editData && "상품 수정" : "상품 등록"}
            </B.MainText>
          </B.Header>
          <B.Contents>
            <B.First>
              <B.PwdBox style={{ marginLeft: "10px" }}>
                <B.Title>
                  <B.Point>＊</B.Point>상품명
                </B.Title>
                <B.TitleInput
                  id="title"
                  placeholder="제목을 작성해주세요."
                  defaultValue={
                    props.isEdit
                      ? props.editData &&
                        String(props?.editData?.fetchUseditem.name)
                      : ""
                  }
                  ref={props.title}
                  onChange={props.onChangeData}
                  spellCheck={false}
                  autoComplete="off"
                />
                <B.Error ref={props.titleError}></B.Error>
              </B.PwdBox>
            </B.First>
            <B.Second>
              <B.WriteContentBox>
                <B.Title>
                  <B.Point>＊</B.Point>내용
                </B.Title>
                <B.ToastBox>
                  <ToastEditor
                    contentError={props.contentError}
                    contents={props.contents}
                    setContent={props.setContent}
                    htmlString={
                      props.isEdit && props.editData
                        ? props?.editData?.fetchUseditem?.contents
                        : ""
                    }
                  />
                </B.ToastBox>
                <B.Error ref={props.contentError}></B.Error>
              </B.WriteContentBox>
            </B.Second>
            <B.Third>
              <B.AddressBox>
                <B.Title>지도</B.Title>
                <B.AddressBoxFirst>
                  <B.Map id="map" />
                  <B.AddressBox>
                    <B.AddressInput
                      placeholder="73021"
                      disabled
                      defaultValue={
                        props.isEdit &&
                        props.editData &&
                        props?.editData?.fetchUseditem?.useditemAddress?.zipcode
                          ? String(
                              props?.editData?.fetchUseditem?.useditemAddress
                                ?.zipcode
                            )
                          : ""
                      }
                      ref={props.zoneCode}
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <Button type="primary" onClick={props.toggleModal}>
                      우편번호 검색
                    </Button>
                    <B.AddressSubInput
                      disabled
                      ref={props.fullAddressCode}
                      defaultValue={
                        props.isEdit &&
                        props.editData &&
                        props?.editData?.fetchUseditem?.useditemAddress?.address
                          ? String(
                              props?.editData?.fetchUseditem?.useditemAddress
                                ?.address
                            )
                          : ""
                      }
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <B.AddressBoxThird>
                      <B.AddressSubInput
                        ref={props.detailAddressCode}
                        onChange={props.onChangeDetailAddress}
                        defaultValue={
                          props.isEdit &&
                          props.editData &&
                          props?.editData?.fetchUseditem?.useditemAddress
                            ?.addressDetail
                            ? String(
                                props?.editData?.fetchUseditem?.useditemAddress
                                  ?.addressDetail
                              )
                            : ""
                        }
                        placeholder="상세주소를 적어주세요."
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </B.AddressBoxThird>
                    <B.Error ref={props.mapError}></B.Error>
                  </B.AddressBox>

                  {props.isModalOpen && (
                    <Modal
                      open={props.isModalOpen}
                      onCancel={props.handleCancel}
                      cancelText="취소"
                      okButtonProps={{ style: { display: "none" } }}
                    >
                      <DaumPostcodeEmbed onComplete={props.handleComplete} />;
                    </Modal>
                  )}
                </B.AddressBoxFirst>
              </B.AddressBox>
              <B.Sell>
                <B.SellBox>
                  <B.Title>판매가격</B.Title>
                </B.SellBox>
                <B.SellInput
                  placeholder="가격을 기입해주세요."
                  defaultValue={
                    props.isEdit && props.editData
                      ? Number(
                          String(props.editData?.fetchUseditem?.price)
                        ).toLocaleString()
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.currentTarget.value = Number(
                      e.currentTarget.value.replace(/[^0-9]/g, "")
                    ).toLocaleString()
                    props.onChangeSell(e.currentTarget.value)
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  ref={props.sell}
                />

                <B.PictureBox>
                  <B.Title>
                    <B.Text>사진</B.Text>
                    <Upload
                      listType="picture-circle"
                      fileList={props.fileList}
                      onChange={(e) => {
                        props.onChangeFile(e)
                      }}
                    >
                      {props.fileList.length >= 3 ? null : (
                        <div>
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  </B.Title>
                </B.PictureBox>
              </B.Sell>
              <B.Tags>
                <B.TagBox>
                  <B.Title>태그입력</B.Title>
                </B.TagBox>
                <B.TagInput
                  placeholder="태그내용"
                  defaultValue={
                    props.isEdit && props.editData
                      ? String(
                          props.editData?.fetchUseditem?.tags &&
                            props.editData?.fetchUseditem?.tags[0]
                        )
                      : ""
                  }
                  id="tag1"
                  onChange={props.onChangeTags}
                  spellCheck={false}
                  autoComplete="off"
                  ref={(el: HTMLInputElement) => (props.tags.current[0] = el)}
                />
                <B.TagInput
                  placeholder="태그내용"
                  defaultValue={
                    props.isEdit && props.editData
                      ? String(
                          props.editData?.fetchUseditem?.tags &&
                            props.editData?.fetchUseditem?.tags[1]
                        )
                      : ""
                  }
                  id="tag2"
                  onChange={props.onChangeTags}
                  spellCheck={false}
                  autoComplete="off"
                  ref={(el: HTMLInputElement) => (props.tags.current[1] = el)}
                />
                <B.TagInput
                  placeholder="태그내용"
                  defaultValue={
                    props.isEdit && props.editData
                      ? String(
                          props.editData?.fetchUseditem?.tags &&
                            props.editData?.fetchUseditem?.tags[2]
                        )
                      : ""
                  }
                  id="tag3"
                  onChange={props.onChangeTags}
                  spellCheck={false}
                  autoComplete="off"
                  ref={(el: HTMLInputElement) => (props.tags.current[2] = el)}
                />
              </B.Tags>
            </B.Third>
          </B.Contents>
          {props.isEdit && props.editData ? (
            <Fragment>
              <B.Cancel id="detail_cancel" onClick={props.onClickCancel}>
                취소하기
              </B.Cancel>
              <B.EditBtn onClick={props.onClickEdit}>수정하기</B.EditBtn>
            </Fragment>
          ) : (
            <Fragment>
              <B.Cancel id="write_cancel" onClick={props.onClickCancel}>
                취소하기
              </B.Cancel>
              <B.WriterBtn onClick={props.onClickWrite}>등록하기</B.WriterBtn>
            </Fragment>
          )}
        </B.ListBox>
      </B.WrapContent>
    </B.Wrap>
  )
}

export default React.memo(UseditemWritePresenter)
