import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faShop } from "@fortawesome/free-solid-svg-icons"
import * as U from "./UsedItem.styles"
import { IUsedItemPresenter } from "./UsedItem.types"
import InfiniteScroll from "react-infinite-scroller"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import NonePicture from "./nonPicture"
export default function UsedItemPresenter(props: IUsedItemPresenter) {
  return (
    <U.Wrap>
      <U.WrapContent>
        <U.ListBox>
          <U.Header>
            <U.MainText>
              <U.TextIcon>
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
              </U.TextIcon>
              중고마켓
            </U.MainText>
            <U.SearchBox>
              <U.SearchIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
              </U.SearchIcon>
              <U.Input
                placeholder="제목을 검색해주세요."
                onChange={props.onChangeSearch}
              />
            </U.SearchBox>
          </U.Header>
          <U.Choice>
            <U.Selling
              underline={props.underline}
              value="selling"
              onClick={props.onClickUnderline}
            >
              판매중
            </U.Selling>
            <U.Selled
              underline={props.underline}
              value="selled"
              onClick={props.onClickUnderline}
            >
              판매완료
            </U.Selled>
          </U.Choice>
          <U.Content ref={props.content}>
            <InfiniteScroll
              pageStart={0}
              loadMore={props.onLoadMore}
              hasMore={true}
              useWindow={false}
            >
              {props.bestItemHidden ? (
                <></>
              ) : (
                props.underline === "selling" && (
                  <U.BestItems>
                    {props?.bestItems?.fetchUseditemsOfTheBest
                      .filter((el) => el)
                      .map((el: any) => {
                        return (
                          <>
                            <U.Contents
                              key={el?._id}
                              id={el?._id}
                              onClick={props.onClickDetailPage}
                            >
                              <U.BestTag className="bestTag">
                                인기상품
                              </U.BestTag>
                              {el.buyer && (
                                <U.BestSellTag>판매완료</U.BestSellTag>
                              )}
                              <U.Img imgUrl={el.images[0]} />
                              <U.SelTitle>{el.name}</U.SelTitle>
                              <U.SubTitle>
                                <U.Price>{el.price.toLocaleString()}원</U.Price>
                                <U.SelTags>
                                  {el.tags.map((el: string) => {
                                    return `#${el}\u00a0\u00a0`
                                  })}
                                </U.SelTags>
                              </U.SubTitle>
                            </U.Contents>
                          </>
                        )
                      })}
                  </U.BestItems>
                )
              )}

              <U.Items>
                {props?.usedItems?.fetchUseditems.map((el) => {
                  return (
                    <U.Contents
                      key={el?._id}
                      id={`${el?._id}//${el?.seller?._id}`}
                      onClick={props.onClickDetailPage}
                    >
                      {el?.images?.filter((el) => el)[0] ? (
                        <U.Img imgUrl={el?.images?.filter((el) => el)[0]} />
                      ) : (
                        <NonePicture />
                      )}
                      <U.SelTitle>{el.name}</U.SelTitle>
                      <U.SubTitle>
                        <U.Price>
                          {el.price && el?.price.toLocaleString()}원
                        </U.Price>
                        <U.SelTags>
                          {el?.tags &&
                            el?.tags
                              .filter((el) => el)
                              .map((el: string) => {
                                return `#${el.replaceAll("#", "")}\u00a0\u00a0`
                              })}
                        </U.SelTags>
                      </U.SubTitle>
                    </U.Contents>
                  )
                })}
              </U.Items>
            </InfiniteScroll>
          </U.Content>
          <U.Contentbottom>
            <U.WriteBtn onClick={props.onClickWritePage}>
              <U.WriteIcon>
                <FontAwesomeIcon icon={faPenToSquare} />
              </U.WriteIcon>
              작성하기
            </U.WriteBtn>
          </U.Contentbottom>
        </U.ListBox>
      </U.WrapContent>
    </U.Wrap>
  )
}
