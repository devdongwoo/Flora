// import * as L from "./commentList.style"
import Comment from "../../comment/comment.presenterItem"
import { IListPresenter } from "./commentList.types"
import InfiniteScroll from "react-infinite-scroller"

export default function CommentListPresenter(props: IListPresenter) {
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={props.onLoadMore}
      hasMore={true}
      useWindow={false}
    >
      {!props.commentWriter && props.data?.fetchBoardComments ? (
        props.data?.fetchBoardComments?.map((el, idx) => {
          return (
            <Comment
              key={el._id}
              boardComment={props.data?.fetchBoardComments[idx]}
            />
          )
        })
      ) : (
        <></>
      )}

      {props.commentWriter &&
      props.fetchUsedItemQuestions?.fetchUseditemQuestions ? (
        props.fetchUsedItemQuestions?.fetchUseditemQuestions.map((el, idx) => {
          return (
            <Comment
              key={el._id}
              id={el.user._id}
              useditemQuestion={
                props.fetchUsedItemQuestions?.fetchUseditemQuestions[idx]
              }
            />
          )
        })
      ) : (
        <></>
      )}
    </InfiniteScroll>
  )
}
