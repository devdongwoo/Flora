import * as P from "./pagination.styles"
import { IPaginationPresenter } from "./pagination.types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons"

export default function PaginationPresenter(props: IPaginationPresenter) {
  return (
    <P.Wrap>
      {props.now === 1 ? (
        <P.NextOrPrevBtn check={true}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </P.NextOrPrevBtn>
      ) : (
        <P.NextOrPrevBtn onClick={props.onClickPrev} check={false}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </P.NextOrPrevBtn>
      )}

      {new Array(10).fill(1).map((_, idx) => {
        return (
          idx + props.now <= props.lastPage && (
            <P.PageList
              key={String(idx + props.now)}
              onClick={props.onClickPage}
              id={String(idx + props.now)}
              activeTarget={props.activeTarget}
            >
              {idx + props.now}&nbsp;
            </P.PageList>
          )
        )
      })}
      {props.now + 10 >= props.lastPage ? (
        <P.NextOrPrevBtn check={true}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </P.NextOrPrevBtn>
      ) : (
        <P.NextOrPrevBtn onClick={props.onClickNext} check={false}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </P.NextOrPrevBtn>
      )}
    </P.Wrap>
  )
}
