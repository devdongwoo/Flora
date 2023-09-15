import * as B from "./BoardWrite.style"
import { IWritePresenter } from "./BoardWrite.types"
import { Button, Modal, Upload } from "antd"
import DaumPostcodeEmbed from "react-daum-postcode"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import React, { Fragment } from "react"

function BoardWritePresenter(props: IWritePresenter) {
  return (
    <B.Wrap>
      <B.WrapContent>
        <B.ListBox>
          <B.Header>
            <B.MainText>
              <B.TextIcon>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
              </B.TextIcon>
              {props.editData ? "글수정" : "글작성"}
            </B.MainText>
          </B.Header>
          <B.Contents>
            <B.First>
              <B.WriterBox>
                <B.Title>
                  <B.Point>＊</B.Point>작성자
                </B.Title>
                <B.Input
                  id="writer"
                  placeholder="이름을 적어주세요."
                  defaultValue={
                    props?.editData
                      ? String(props?.editData?.fetchBoard.writer)
                      : ""
                  }
                  ref={props.writer}
                  onChange={props.onChangeData}
                  spellCheck={false}
                  autoComplete="off"
                  disabled={props.isEdit}
                />
                <B.Error ref={props.writerError}></B.Error>
              </B.WriterBox>
              <B.PwdBox>
                <B.Title>
                  <B.Point>＊</B.Point>비밀번호
                </B.Title>
                <B.Input
                  id="pwd"
                  placeholder={
                    props.editData
                      ? "게시글 작성한 비밀번호 입력"
                      : "비밀번호를 입력해주세요."
                  }
                  ref={props.pwd}
                  onChange={props.onChangeData}
                  spellCheck={false}
                  autoComplete="off"
                />
                <B.Error ref={props.pwdError}></B.Error>
              </B.PwdBox>

              <B.PwdBox style={{ marginLeft: "10px" }}>
                <B.Title>
                  <B.Point>＊</B.Point>제목
                </B.Title>
                <B.TitleInput
                  id="title"
                  placeholder="제목을 작성해주세요."
                  defaultValue={
                    props.editData
                      ? String(props.editData?.fetchBoard.title)
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
                <B.TextArea
                  id="content"
                  placeholder="내용을 입력해주세요."
                  defaultValue={
                    props.editData
                      ? String(props.editData?.fetchBoard.contents)
                      : ""
                  }
                  ref={props.contents}
                  onChange={props.onChangeData}
                  spellCheck={false}
                />
                <B.Error ref={props.contentError}></B.Error>
              </B.WriteContentBox>
            </B.Second>
            <B.Third>
              <B.AddressBox>
                <B.AddressBoxFirst>
                  <B.Title>주소</B.Title>
                  <B.AddressInput
                    placeholder="73021"
                    disabled
                    defaultValue={
                      props.editData && props.editData.fetchBoard.boardAddress
                        ? String(props.editData.fetchBoard.boardAddress.zipcode)
                        : ""
                    }
                    ref={props.zoneCode}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <Button type="primary" onClick={props.toggleModal}>
                    우편번호 검색
                  </Button>
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
                <B.AddressBoxSecond>
                  <B.AddressSubInput
                    disabled
                    ref={props.fullAddressCode}
                    defaultValue={
                      props.editData && props.editData.fetchBoard.boardAddress
                        ? String(props.editData.fetchBoard.boardAddress.address)
                        : ""
                    }
                    spellCheck={false}
                    autoComplete="off"
                  />
                </B.AddressBoxSecond>
                <B.AddressBoxThird>
                  <B.AddressSubInput
                    ref={props.detailAddressCode}
                    onChange={props.onChangeDetailAddress}
                    defaultValue={
                      props.editData && props.editData.fetchBoard.boardAddress
                        ? String(
                            props.editData.fetchBoard.boardAddress.addressDetail
                          )
                        : ""
                    }
                    placeholder="상세주소를 적어주세요."
                    spellCheck={false}
                    autoComplete="off"
                  />
                </B.AddressBoxThird>
              </B.AddressBox>
              <B.UtubBox>
                <B.UtubBoxFirst>
                  <B.Title>유튜브</B.Title>
                </B.UtubBoxFirst>
                <B.UtubeInput
                  placeholder="링크를 복사해주세요."
                  ref={props.utubeUrl}
                  defaultValue={
                    props.editData
                      ? String(props.editData?.fetchBoard?.youtubeUrl)
                      : ""
                  }
                  onChange={props.onChangeUtube}
                  spellCheck={false}
                  autoComplete="off"
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
              </B.UtubBox>
            </B.Third>
          </B.Contents>
          {props.editData ? (
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

export default React.memo(BoardWritePresenter)
