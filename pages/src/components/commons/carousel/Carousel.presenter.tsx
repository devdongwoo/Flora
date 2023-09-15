import * as C from "./Carousel.styled"
import { ICarouselPresenter } from "./Carousel.types"

export default function CarouselPresenter(props: ICarouselPresenter) {
  return (
    <C.Wrap>
      <C.LeftBox>
        {props.images
          ?.filter((el, idx) => {
            return el
          })
          .map((el, idx) => {
            return (
              <C.PreviewContainer key={idx}>
                <C.HoverCheck
                  focus={String(idx + 1)}
                  leftCur={props.leftCur}
                  className={String(idx + 1)}
                  onMouseOver={() => {
                    props.moveToNonTimeSlide(idx + 1)
                  }}
                />
                <C.Preview imgUrl={el} />
              </C.PreviewContainer>
            )
          })}
      </C.LeftBox>
      <C.RightBox>
        <C.LeftBtn onClick={props.onClickPrev}>{props.tags[0]}</C.LeftBtn>
        <C.PictureBox>
          <C.SelectPicture
            style={{
              transform: `translateX(-${
                props.total && props.total.length < 2 ? 0 : props.cur * 100
              }%)`,
              transition: `${
                props.total && props.total.length < 2
                  ? ""
                  : props.carouselTransition
              }`
            }}
          >
            {props.total
              ?.filter((el) => {
                return el
              })
              .map((el, idx) => {
                return <C.Picture imgUrl={el} key={el + String(idx)} />
              })}
          </C.SelectPicture>
        </C.PictureBox>

        <C.RightBtn onClick={props.onClickNext}>{props.tags[1]}</C.RightBtn>
      </C.RightBox>
    </C.Wrap>
  )
}
