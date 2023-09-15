import { gql } from "@apollo/client"

export const FETCH_USED_ITEMS_THE_BEST = gql`
  query {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      createdAt
      tags
      price
      pickedCount
      images
      buyer {
        _id
        name
      }
    }
  }
`

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      price
      tags
      images
      seller {
        _id
      }
    }
  }
`
