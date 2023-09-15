import { ICommentWritePresenter } from "./commentWrite.types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import {
  faCircleUser,
  faPenToSquare
} from "@fortawesome/free-regular-svg-icons"
import * as C from "./commentWrite.style"
import { Fragment } from "react"

export default function CommentWriterPresenter(props: ICommentWritePresenter) {
  return (
    <C.Wrap>
      <C.WrapContent>
        <C.CommentBox>
          {props.isEdit ? (
            <Fragment></Fragment>
          ) : (
            <Fragment>
              {props.reComment ? (
                <></>
              ) : (
                <C.Icon>
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </C.Icon>
              )}

              <C.Text>
                {props.commentWriter ? (
                  props.reComment ? (
                    <></>
                  ) : (
                    <>문의하기</>
                  )
                ) : (
                  <>댓글 작성</>
                )}
              </C.Text>
            </Fragment>
          )}
        </C.CommentBox>
        {props.commentWriter ? (
          <C.CommentBox>
            {props.isEdit ? (
              props.user.picture ? (
                <C.UserBox>
                  <C.UserInfo>
                    <img
                      src={`https://storage.googleapis.com/${props?.user?.picture?.replaceAll(
                        "https://storage.googleapis.com/",
                        ""
                      )}`}
                      width="38px"
                      height="38px"
                      style={{
                        borderRadius: "50%"
                      }}
                    />
                    <C.UserName>{props.user.name}</C.UserName>
                  </C.UserInfo>

                  <C.Cancel>
                    <C.CancelIcon onClick={props.onClickCancel}>
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </C.CancelIcon>
                  </C.Cancel>
                </C.UserBox>
              ) : (
                <C.UserBox>
                  <C.UserInfo>
                    <C.UnUser>
                      <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
                    </C.UnUser>
                    <C.UserName>{props.user.name}</C.UserName>
                  </C.UserInfo>
                  <C.Cancel>
                    <C.CancelIcon onClick={props.onClickCancel}>
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </C.CancelIcon>
                  </C.Cancel>
                </C.UserBox>
              )
            ) : (
              <Fragment></Fragment>
            )}
          </C.CommentBox>
        ) : (
          <C.CommentBox>
            <C.Input
              onChange={props.onChangeWriter}
              placeholder="작성자"
              ref={props.writerInput}
              disabled={props.isEdit}
            />

            <C.Input
              onChange={props.onChangePassword}
              placeholder={props.isEdit ? "초창기 비밀번호" : "비밀번호"}
              type="password"
              ref={props.passwordInput}
            />
            <C.UserRate onChange={props.setRate} value={props.rate} />
            {props.isEdit ? (
              <C.CancelIcon onClick={props.onClickCancel}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </C.CancelIcon>
            ) : (
              <Fragment></Fragment>
            )}
          </C.CommentBox>
        )}

        <C.CommentBox>
          <C.TextArea
            maxLength={100}
            onChange={props.onChangeComment}
            ref={props.textArea}
            placeholder={
              props.isEdit
                ? ""
                : props.commentWriter
                ? props.reComment
                  ? `인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요.`
                  : `개인정보를 공유 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.`
                : `인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요.`
            }
          />
          <C.TextBottom>
            <C.LimitChar ref={props.comment}>0 / 100</C.LimitChar>
            {props.isEdit ? (
              <C.RegisterBtn
                onClick={props.onClickUpdate}
                isEdit={props.isEdit}
              >
                수정
              </C.RegisterBtn>
            ) : (
              <C.RegisterBtn
                onClick={props.onClickRegist}
                isEdit={props.isEdit}
              >
                {props.commentWriter ? (
                  props.reComment ? (
                    <>답글</>
                  ) : (
                    <>등록</>
                  )
                ) : (
                  <>등록</>
                )}
              </C.RegisterBtn>
            )}
          </C.TextBottom>
        </C.CommentBox>
      </C.WrapContent>
    </C.Wrap>
  )
}
