import { IPaginationContainer } from "./pagination.types"
import PaginationPresenter from "./pagination.presenter"
import { useEffect, useState } from "react"
export default function PaginationContainer(props: IPaginationContainer) {
  const [now, setNow] = useState(1)
  const [activeTarget, setActiveTarget] = useState("1")

  const onClickPrev = () => {
    if (now === 1) {
      return
    }
    props.refetch({ page: now - 10 })
    setActiveTarget(String(now - 10))
    setNow(now - 10)
  }

  const onClickNext = () => {
    props.refetch({ page: now + 10 })
    setActiveTarget(String(now + 10))
    setNow(now + 10)
  }

  const onClickPage = (event: React.MouseEvent<HTMLSpanElement>) => {
    setActiveTarget(event.currentTarget.id)
    props.refetch({ page: Number(event.currentTarget.id) })
  }

  useEffect(() => {
    setActiveTarget("1")
    setNow(1)
    props.setResetPagination(false)
  }, [props.resetPagination])
  return (
    <PaginationPresenter
      onClickPrev={onClickPrev}
      onClickNext={onClickNext}
      onClickPage={onClickPage}
      now={now}
      setNow={setNow}
      lastPage={props.lastPage}
      activeTarget={activeTarget}
    />
  )
}
