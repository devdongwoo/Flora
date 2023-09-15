import { useQuery, useMutation, useApolloClient } from "@apollo/client"
import { useRouter } from "next/router"
import { YouTubeProps } from "react-youtube"
import {
  FETCH_BOARD,
  FETCH_USED_ITEM,
  DELETE_BOARD,
  LIKE_BOARD,
  DISLIKE_BOARD,
  DELETE_USED_ITEM,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
} from "./Detail.queries"
import DetailPresenter from "./Detail.presenter"
import { DetailContainer } from "./Detail.types"
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationDeleteUseditemArgs,
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchUseditemArgs
} from "../../../commons/types/generated/types"
import { useEffect, useLayoutEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { useRecoilState } from "recoil"
import { userData } from "../../../commons/stores"
import { kakaoMapCreate } from "../../../commons/utilities/utility"
import Swal from "sweetalert2"

export default function BoardDetailContainer(props: DetailContainer) {
  const [user] = useRecoilState(userData)
  const client = useApolloClient()

  // 삭제하기
  const [deleteBoard] = useMutation(DELETE_BOARD)
  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM)

  const [likeBoard] = useMutation(LIKE_BOARD)
  const [dislikeBoard] = useMutation(DISLIKE_BOARD)
  const [profile, setProfile] = useState(<></>)

  const opts: YouTubeProps["opts"] = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  }

  const router = useRouter()

  // 자유게시판
  const { data: fetchBoard, loading: boardLoading } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: {
      boardId: String(router.query.boardId)
    }
  })

  // 중고마켓
  const { data: fetchUsedItem, loading: usedItemLoading } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.usedItemId)
    }
  })

  const onClickLike = async () => {
    if (
      props.isDetail === "board" &&
      (fetchBoard?.fetchBoard?.likeCount === 0 ||
        fetchBoard?.fetchBoard?.likeCount)
    ) {
      await likeBoard({
        variables: {
          boardId: String(router.query.boardId)
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: {
              boardId: String(router.query.boardId)
            }
          }
        ]
      })
    }
  }

  const onClickDisLike = async () => {
    if (
      props.isDetail === "board" &&
      (fetchBoard?.fetchBoard?.dislikeCount === 0 ||
        fetchBoard?.fetchBoard?.dislikeCount)
    ) {
      await dislikeBoard({
        variables: {
          boardId: String(router.query.boardId)
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: {
              boardId: String(router.query.boardId)
            }
          }
        ]
      })
    }
  }

  const onClickList = () => {
    if (props.isDetail === "board") router.push(`/boards`)
    else router.push("/useditem")
  }

  const onClickEdit = () => {
    if (props.isDetail === "board")
      router.push(`/boards/${router.query.boardId}/edit`)
    else {
      router.push({
        pathname: `/useditem/${router.query.usedItemId}/edit`,
        query: {
          sellerId: router.query.sellerId
        }
      })
    }
  }

  const onClickBuy = async (useritemId: string | undefined) => {
    Swal.fire({
      title: "구매하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "구매",
      cancelButtonText: "취소",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await client.mutate<
            Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
            IMutationCreatePointTransactionOfBuyingAndSellingArgs
          >({
            mutation: CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
            variables: { useritemId: String(useritemId) }
          })

          Swal.fire({
            icon: `success`,
            title: "구매완료"
          })

          router.replace("/useditem")
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire({
              icon: `error`,
              title: error.message
            })
          }
        }
      }
    })
  }

  const onClickDelete = async () => {
    Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (props.isDetail === "board") {
          try {
            await deleteBoard({
              variables: {
                boardId: router.query.boardId
              }
            })
            Swal.fire({
              title: "삭제되었습니다.",
              icon: "success"
            })

            await router.push(`/boards/`)
          } catch (error) {
            if (error instanceof Error) alert(error.message)
          }
        } else if (props.isDetail === "usedItem") {
          try {
            await deleteUseditem({
              variables: {
                useditemId: String(router.query.usedItemId)
              }
            })
            Swal.fire({
              title: "삭제되었습니다.",
              icon: "success"
            })

            await router.push(`/useditem/`)
          } catch (error) {
            if (error instanceof Error) alert(error.message)
          }
        }
      }
    })
  }

  useEffect(() => {
    if (fetchUsedItem?.fetchUseditem?.useditemAddress?.lat) {
      kakaoMapCreate(
        fetchUsedItem?.fetchUseditem?.useditemAddress?.lat ?? 126.570667,
        fetchUsedItem?.fetchUseditem?.useditemAddress?.lng ?? 33.450701,
        fetchUsedItem?.fetchUseditem?.useditemAddress?.address ?? "kakao"
      )
    }
  }, [fetchUsedItem?.fetchUseditem?.useditemAddress?.lat])

  useLayoutEffect(() => {
    if (!(usedItemLoading ?? boardLoading)) {
      if (
        fetchUsedItem?.fetchUseditem.seller?.picture ??
        fetchBoard?.fetchBoard?.user?.picture
      ) {
        setProfile(
          <img
            src={`https://storage.googleapis.com/${
              fetchUsedItem?.fetchUseditem.seller?.picture?.replaceAll(
                "https://storage.googleapis.com/",
                ""
              ) ??
              fetchBoard?.fetchBoard?.user?.picture?.replaceAll(
                "https://storage.googleapis.com/",
                ""
              )
            }`}
            width="38px"
            height="38px"
            style={{
              borderRadius: "50%"
            }}
          />
        )
      } else {
        setProfile(
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ color: "gray" }}
          ></FontAwesomeIcon>
        )
      }
    }
  }, [usedItemLoading, boardLoading])

  return (
    <>
      <DetailPresenter
        // 자유게시판
        fetchBoard={fetchBoard}
        // 중고마켓
        fetchUsedItem={fetchUsedItem}
        profile={profile}
        userId={user._id}
        // 공통
        onClickEdit={onClickEdit}
        onClickList={onClickList}
        onClickBuy={onClickBuy}
        onClickDelete={onClickDelete}
        onClickLike={onClickLike}
        onClickDisLike={onClickDisLike}
        opts={opts}
        isDetail={props.isDetail}
      />
    </>
  )
}
