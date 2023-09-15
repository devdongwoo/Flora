import * as L from "./BoardList.style"
import { IBoardListPresenter } from "./BoardList.types"
import PaginationContainer from "../../../commons/pagination/pagination.container"
import { dateFormat } from "../../../../commons/utilities/utility"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClipboard,
  faMagnifyingGlass,
  faCircleUser
} from "@fortawesome/free-solid-svg-icons"
import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons"

export default function BoardDetailPresenter(props: IBoardListPresenter) {
  return (
    <L.Wrap>
      <L.WrapContent>
        <L.ListBox>
          <L.Header>
            <L.MainText>
              <L.TextIcon>
                <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon>
              </L.TextIcon>
              자유게시판
            </L.MainText>
            <L.SearchBox>
              <L.SearchIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
              </L.SearchIcon>
              <L.Input
                placeholder="제목을 검색해주세요."
                onChange={props.onChangeSearch}
              />
            </L.SearchBox>
          </L.Header>
          <L.Content>
            <L.BestBoards>
              {props.bestBoards &&
                props.bestBoards.fetchBoardsOfTheBest.map((el, idx) => {
                  return (
                    <L.Contents
                      key={el._id}
                      id={el._id}
                      onClick={(e) => {
                        props.onClickDetailPage(e)
                      }}
                    >
                      <L.TitleBox>
                        <L.Title>{el.title}</L.Title>
                        <L.Best>베스트</L.Best>
                      </L.TitleBox>
                      <L.Body>{el.contents}</L.Body>
                      <L.Bottom>
                        <L.LeftBox>
                          {el.user && el.user.picture ? (
                            <L.UserPicture>{el.user.picture}</L.UserPicture>
                          ) : (
                            <L.Unknown>
                              <FontAwesomeIcon
                                icon={faCircleUser}
                              ></FontAwesomeIcon>
                            </L.Unknown>
                          )}
                          <L.UserName>
                            {el.writer}
                            <L.UserDate>{dateFormat(el.createdAt)}</L.UserDate>
                          </L.UserName>
                        </L.LeftBox>
                        <L.Up>
                          <L.LikeIcon>
                            <FontAwesomeIcon icon={faHeart} />
                          </L.LikeIcon>
                          <L.UpCount>{el.likeCount}</L.UpCount>
                        </L.Up>
                      </L.Bottom>
                    </L.Contents>
                  )
                })}
            </L.BestBoards>
            <L.Boards>
              <L.RowHeader>
                <L.ColTitle>제목</L.ColTitle>
                <L.ColTitle>글쓴이</L.ColTitle>
                <L.ColTitle>추천수</L.ColTitle>
                <L.ColTitle>날짜</L.ColTitle>
              </L.RowHeader>
              {props.data &&
                props.data.fetchBoards.map((el, idx) => {
                  return (
                    <L.Row key={el._id}>
                      <L.Col
                        id={el._id}
                        onClick={(e) => {
                          props.onClickDetailPage(e)
                        }}
                      >
                        {el.title}
                      </L.Col>
                      <L.Col>{el.writer}</L.Col>
                      <L.Col>
                        <L.LikeIcon>
                          <FontAwesomeIcon icon={faHeart} />
                        </L.LikeIcon>
                        {el.likeCount}
                      </L.Col>
                      <L.Col>{dateFormat(el.createdAt)}</L.Col>
                    </L.Row>
                  )
                })}
            </L.Boards>
            <L.BoardsBottom>
              <PaginationContainer
                fetchBoardsCount={props.fetchBoardsCount}
                refetch={props.refetch}
                lastPage={props.lastPage}
                setResetPagination={props.setResetPagination}
                resetPagination={props.resetPagination}
              />
              <L.WriteBtn onClick={props.onClickWritePage}>
                <L.WriteIcon>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </L.WriteIcon>
                작성하기
              </L.WriteBtn>
            </L.BoardsBottom>
          </L.Content>
        </L.ListBox>
      </L.WrapContent>
    </L.Wrap>
  )
}
