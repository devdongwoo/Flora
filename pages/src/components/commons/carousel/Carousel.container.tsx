import { useLayoutEffect, useState } from "react"
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CarouselPresenter from "./Carousel.presenter"
import { ICarousel } from "./Carousel.types"

export default function CarouselContainer(props: ICarousel) {
  let total = props.images?.filter((el) => {
    return el
  })

  if (total && total.length >= 2) {
    const start = total[0]
    const end = total[total.length - 1]
    const result = [end, ...total, start]
    total = result
  }

  const [cur, setCur] = useState(1)
  const [leftCur, setLeftCur] = useState(1)

  const [carouselTransition, setCarouselTransition] = useState(
    "transform 300ms ease-in-out"
  )
  const [tags, setTags] = useState<JSX.Element[]>([<></>, <></>])

  const onClickNext = () => {
    setCur((prev) => prev + 1)
    setCarouselTransition("transform 300ms ease-in-out")
  }

  const onClickPrev = () => {
    setCur((prev) => prev - 1)
    setCarouselTransition("transform 300ms ease-in-out")
  }

  const moveToNthSlide = (n: number) => {
    setTimeout(() => {
      setCur(n)
      setCarouselTransition("")
    }, 300)
  }

  const moveToNonTimeSlide = (n: number) => {
    setCur(n)
    setCarouselTransition("")
  }

  useLayoutEffect(() => {
    setLeftCur(cur)

    if (total && cur === total.length - 1) {
      moveToNthSlide(1)
      setLeftCur(1)
    } else if (total && cur === 0) {
      moveToNthSlide(total.length - 2)
      setLeftCur(total.length - 2)
    }
  }, [total && total.length, total && total.length - 1, cur])

  useLayoutEffect(() => {
    if (total)
      total.length >= 2
        ? setTags([
            <>
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </>,
            <>
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </>
          ])
        : setTags([...tags])
  }, [props.images])

  return (
    <CarouselPresenter
      images={props.images}
      tags={tags}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
      total={total}
      cur={cur}
      leftCur={leftCur}
      moveToNonTimeSlide={moveToNonTimeSlide}
      carouselTransition={carouselTransition}
    />
  )
}
