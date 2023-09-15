import { NextRouter, useRouter } from "next/router"
import { ApolloClient, gql, useApolloClient } from "@apollo/client"
import UseditemEdit from "../../../src/components/units/useditem/wirte/UsedWrite.container"
import {
  IQuery,
  IQueryFetchUseditemArgs
} from "../../../src/commons/types/generated/types"
import React from "react"
import { SetterOrUpdater, useRecoilState } from "recoil"
import { usedItemEdit } from "../../../src/commons/stores"

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        zipcode
        address
        addressDetail
        lat
        lng
      }
      buyer {
        _id
        name
        picture
      }
      seller {
        _id
        name
        picture
      }
      soldAt
      createdAt
    }
  }
`

let itemId = ""

const fetchData = async (
  router: NextRouter,
  client: ApolloClient<object>,
  setUsedItemEdit: SetterOrUpdater<unknown>
) => {
  if (router.query.usedItemId) {
    itemId = String(router.query.usedItemId)
    const { data } = await client.query<
      Pick<IQuery, "fetchUseditem">,
      IQueryFetchUseditemArgs
    >({
      query: FETCH_USED_ITEM,
      variables: {
        useditemId: itemId
      }
    })
    setUsedItemEdit(data)
    return data
  }
}

function UsedEdit() {
  const [, setUsedItemEdit] = useRecoilState(usedItemEdit)
  const router = useRouter()
  const client = useApolloClient()

  const result = fetchData(router, client, setUsedItemEdit)

  if (!result) {
    return null
  } else {
    return <UseditemEdit isEdit={true} editData={result} />
  }
}

export default React.memo(UsedEdit)
