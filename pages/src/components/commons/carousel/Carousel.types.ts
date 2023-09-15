import { Maybe } from "../../../commons/types/generated/types"

export interface ICarousel {
  images?: Maybe<string[]>
}

export interface ICarouselPresenter extends ICarousel {
  cur: number
  leftCur: number
  transition?: string
  carouselTransition: string
  total?: string[]
  tags: JSX.Element[]
  onClickPrev: () => void
  onClickNext: () => void
  moveToNonTimeSlide: (n: number) => void
}
