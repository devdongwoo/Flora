import * as D from "./Detail.style"
import YouTube from "react-youtube"
import { dateFormat, getVideoId } from "../../../commons/utilities/utility"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons"
import { IBoardDetailPresenter } from "./Detail.types"
import CommentWriteContainer from "./commentWrite/commentWrite.container"
import CommentListContainer from "./commentList/commentList.container"
import Carousel from "../carousel/Carousel.container"

export default function DetailPresenter(props: IBoardDetailPresenter) {
  return (
    <D.Wrap>
      <D.WrapContent>
        <D.ListBox>
          <D.LeftContentBox>
            <D.Header>
              <D.User>
                <D.UserPicture>{props.profile}</D.UserPicture>
                <D.UserData>
                  <D.UserName>
                    {props.fetchUsedItem?.fetchUseditem.seller?.name ??
                      props.fetchBoard?.fetchBoard.writer}
                  </D.UserName>
                  <D.UserCreatedAt>
                    {dateFormat(
                      props.fetchBoard?.fetchBoard.createdAt ??
                        props.fetchUsedItem?.fetchUseditem.createdAt
                    )}
                  </D.UserCreatedAt>
                </D.UserData>
              </D.User>
              {(props.fetchUsedItem?.fetchUseditem.price === 0 ||
                props.fetchUsedItem?.fetchUseditem.price) && (
                <D.Price>
                  가격:&nbsp;
                  {props.fetchUsedItem?.fetchUseditem.price.toLocaleString()}원
                </D.Price>
              )}
              {props.isDetail === "board" && (
                <D.LikeOrUnLikeBox>
                  <D.Like onClick={props.onClickLike}>
                    <FontAwesomeIcon
                      style={{
                        color: "#ef6d6d",
                        fontSize: "13px",
                        marginRight: "4px"
                      }}
                      icon={faHeart}
                    ></FontAwesomeIcon>
                    {props.fetchBoard?.fetchBoard.likeCount}
                  </D.Like>
                  <D.UnLike onClick={props.onClickDisLike}>
                    <FontAwesomeIcon
                      style={{
                        color: "rgb(66 37 37)",
                        fontSize: "13px",
                        marginRight: "4px"
                      }}
                      icon={faHeartCrack}
                    ></FontAwesomeIcon>
                    {props.fetchBoard?.fetchBoard.dislikeCount}
                  </D.UnLike>
                </D.LikeOrUnLikeBox>
              )}
            </D.Header>
            <D.HeaderBottom>
              <D.Title>
                {props.fetchBoard?.fetchBoard.title ??
                  props.fetchUsedItem?.fetchUseditem.name}
              </D.Title>
              <D.Other>
                <D.GoList onClick={props.onClickList}>목록으로</D.GoList>
                {props.fetchBoard?.fetchBoard ? (
                  <D.GoEdit onClick={props.onClickEdit}>수정하기</D.GoEdit>
                ) : props.fetchUsedItem?.fetchUseditem.seller?._id ===
                  props.userId ? (
                  <D.GoEdit onClick={props.onClickEdit}>수정하기</D.GoEdit>
                ) : (
                  <></>
                )}
                {props.fetchUsedItem?.fetchUseditem &&
                  props.fetchUsedItem?.fetchUseditem.seller?._id !==
                    props.userId &&
                  !props.fetchUsedItem?.fetchUseditem.buyer && (
                    <D.GoBuy
                      onClick={() => {
                        const useritemId =
                          props.fetchUsedItem?.fetchUseditem._id
                        props.onClickBuy(useritemId)
                      }}
                    >
                      구매하기
                    </D.GoBuy>
                  )}
                {props.fetchBoard?.fetchBoard ? (
                  <D.GoDelete onClick={props.onClickDelete}>
                    삭제하기
                  </D.GoDelete>
                ) : props.fetchUsedItem?.fetchUseditem.seller?._id ===
                  props.userId ? (
                  <D.GoDelete onClick={props.onClickDelete}>
                    삭제하기
                  </D.GoDelete>
                ) : (
                  <></>
                )}
              </D.Other>
            </D.HeaderBottom>
            <D.Contents>
              {props.isDetail === "board" &&
                props.fetchBoard?.fetchBoard.images &&
                props.fetchBoard?.fetchBoard.images.length > 0 &&
                props.fetchBoard?.fetchBoard.images.map((el, idx) => {
                  return el ? (
                    <img
                      key={idx}
                      src={`https://storage.googleapis.com/${el}`}
                      width={"100%"}
                    />
                  ) : (
                    <></>
                  )
                })}
              {props.isDetail === "board" &&
                props.fetchBoard?.fetchBoard.youtubeUrl && (
                  <YouTube
                    videoId={getVideoId(
                      props.fetchBoard?.fetchBoard.youtubeUrl
                    )}
                    opts={props.opts}
                  />
                )}
              {props.isDetail === "usedItem" &&
                (props.fetchUsedItem?.fetchUseditem?.images?.filter((el) => {
                  return el
                }).length ? (
                  <Carousel
                    images={props.fetchUsedItem?.fetchUseditem.images}
                  />
                ) : (
                  <></>
                ))}
              <D.Text>
                {props.fetchBoard?.fetchBoard.contents}
                {props.fetchUsedItem?.fetchUseditem.contents && (
                  <D.ItemText
                    dangerouslySetInnerHTML={{
                      __html: props.fetchUsedItem?.fetchUseditem.contents
                    }}
                  ></D.ItemText>
                )}
              </D.Text>
              {props.fetchUsedItem?.fetchUseditem.useditemAddress?.lat && (
                <D.MapBox>
                  <D.Map id="map" />
                  {props.fetchUsedItem?.fetchUseditem.useditemAddress
                    ?.addressDetail && (
                    <D.addressDetail>
                      <D.addressDetailText>
                        ※상세주소:&nbsp;
                        {
                          props.fetchUsedItem?.fetchUseditem.useditemAddress
                            .addressDetail
                        }
                      </D.addressDetailText>
                    </D.addressDetail>
                  )}
                </D.MapBox>
              )}
            </D.Contents>
          </D.LeftContentBox>
          <D.RightContentBox>
            <CommentWriteContainer isEdit={false} isClose={false} />
            <D.CommentListBox>
              <CommentListContainer />
            </D.CommentListBox>
          </D.RightContentBox>
        </D.ListBox>
      </D.WrapContent>
    </D.Wrap>
  )
}
