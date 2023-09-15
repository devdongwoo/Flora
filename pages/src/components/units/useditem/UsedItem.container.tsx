import UsedItemPresenter from "./UsedItem.presenter"
import { useQuery } from "@apollo/client"
import { FETCH_USED_ITEMS_THE_BEST, FETCH_USED_ITEMS } from "./UsedItem.queries"
import { useEffect, useRef, useState } from "react"
import _, { isEmpty } from "lodash"
import { IQuery } from "../../../commons/types/generated/types"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { usedItemDetailComment } from "../../../commons/stores"

let pageNum = 1
let bestItemsHidden = false
let sellCheck = false

export default function UsedItemContainer() {
  const [, setUsedItemComment] = useRecoilState(usedItemDetailComment)
  const content = useRef<HTMLDivElement>(null)
  const [underline, setUnderLine] = useState("selling")

  const router = useRouter()

  const { data: bestItems } = useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(
    FETCH_USED_ITEMS_THE_BEST
  )
  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS)

  const onLoadMore = async () => {
    if (data === undefined) return
    await fetchMore({
      variables: {
        page: ++pageNum
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          fetchMoreResult.fetchUseditems === undefined ||
          fetchMoreResult.fetchUseditems.length === 0
        ) {
          if (isEmpty(prev)) return
          return { fetchUseditems: [...prev.fetchUseditems] }
        }
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems
          ]
        }
      }
    })
  }
  const debounce = _.debounce((value) => {
    pageNum = 1
    refetch({
      search: value,
      page: pageNum
    })
  }, 500)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(e.currentTarget.value)
    bestItemsHidden = e.currentTarget.value !== ""
  }

  const onClickUnderline = (e: React.MouseEvent<HTMLButtonElement>) => {
    pageNum = 1
    content?.current?.scrollTo(0, 0)
    setUnderLine(e.currentTarget.value)
    sellCheck = e.currentTarget.value === "selled"
    refetch({
      isSoldout: sellCheck
    })
  }

  const onClickDetailPage = (event: React.MouseEvent<HTMLElement>) => {
    const regex = /[//]/g
    setUsedItemComment(true)

    router.push({
      pathname: `/useditem/${event.currentTarget.id.split(regex)[0]}`,
      query: {
        sellerId:
          event.currentTarget.id.split(regex).length > 2
            ? event.currentTarget.id.split(regex)[2]
            : "none"
      }
    })
  }

  const onClickWritePage = () => {
    router.push(`/useditem/new`)
  }

  useEffect(() => {
    return () => {
      pageNum = 1
    }
  }, [])

  return (
    <UsedItemPresenter
      bestItems={bestItems}
      usedItems={data}
      underline={underline}
      content={content}
      onLoadMore={onLoadMore}
      onChangeSearch={onChangeSearch}
      bestItemHidden={bestItemsHidden}
      onClickUnderline={onClickUnderline}
      onClickDetailPage={onClickDetailPage}
      onClickWritePage={onClickWritePage}
    />
  )
}
