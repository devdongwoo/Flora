import style from "./utility.module.css"
import { UploadFile } from "antd/es/upload"
import { Dispatch, SetStateAction } from "react"
import Swal from "sweetalert2"

export const dateFormat = (date: string | undefined) => {
  if (typeof date === "string") {
    const yyyy = date.slice(0, 4)
    const mm = date.slice(5, 7)
    const dd = date.slice(8, 10)

    return `${yyyy}.${mm}.${dd}`
  }
}

export const getVideoId = (url: string): string => {
  const strArr = url.split("v=")
  return strArr[strArr.length - 1]
}

export const checkValidationFile = (file: UploadFile<any>) => {
  if (typeof file === "undefined") {
    Swal.fire({
      icon: `error`,
      title: `파일이 없습니다!`
    })
    return false
  }

  if (file.size && file.size > 5 * 1024 * 1024) {
    Swal.fire({
      icon: `error`,
      title: `파일 용량이 너무큽니다.(제한: 5MB)`
    })
    return false
  }

  if (file.type && !file.type.includes("jpeg") && !file.type.includes("png")) {
    Swal.fire({
      icon: `error`,
      title: `jpeg 또는 png 파일만 업로드 가능합니다.`
    })
    return false
  }
  return true
}

declare const window: typeof globalThis & {
  kakao: any
}

export const kakaoMapReset = (
  address: string,
  end?: () => void,
  setLatLng?: Dispatch<
    SetStateAction<{
      La: number
      Ma: number
    }>
  >
): any => {
  const mapContainer = document.getElementById("map")
  const mapOption = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  }
  const map = new window.kakao.maps.Map(mapContainer, mapOption)
  const geocoder = new window.kakao.maps.services.Geocoder()

  geocoder.addressSearch(address, function (result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      const position = new window.kakao.maps.LatLng(result[0].y, result[0].x)

      const addressName = address.replace(/[,]/g, " ")

      const content = `<div class=${style.customoverlay}>
      <a href='https://map.kakao.com/link/map/${addressName},${position.Ma},${position.La}' target="_blank">
        <span class=${style.title}>${address}</span>
      </a>
    </div>`

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content,
        yAnchor: 0
      })

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      customOverlay.setMap(map)
      map.setCenter(position)
      map.setZoomable(false)
      if (setLatLng) setLatLng(position)
      if (end) end()
    }
  })
}

export const kakaoMapCreate = (
  lng?: number,
  lat?: number,
  address?: string
) => {
  const addressName = address && address.replace(/[,]/g, " ")

  const script = document.createElement("script")
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=0950afad7a5a19a264a312bff919af61&libraries=services&autoload=false"
  document.head.appendChild(script)

  script.onload = () => {
    const instance = new window.kakao.maps.load(function () {
      const container = document.getElementById("map")

      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3
      }

      const map = new window.kakao.maps.Map(container, options)
      const markerPosition = new window.kakao.maps.LatLng(lat, lng)

      const content = `<div class=${style.customoverlay}>
      <a href='https://map.kakao.com/link/map/${addressName},${markerPosition.Ma},${markerPosition.La}' target="_blank">
        <span class=${style.title}>${address}</span>
      </a>
    </div>`

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content,
        yAnchor: 0
      })

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      customOverlay.setMap(map)
      map.setZoomable(false)
    })
  }
}
