import styled from "@emotion/styled"

interface IProps {
  imgUrl?: string
  transition?: string
  focus?: string
  imgLength?: number
  leftCur?: number
}

export const Wrap = styled.div`
  display: flex;
  width: 100%;
`

export const LeftBox = styled.div`
  display: inline-block;
  width: 180px;
`

export const PreviewContainer = styled.div`
  position: relative;
`

export const HoverCheck: any = styled.div`
  position: absolute;
  width: 180px;
  height: 150px;
  left: 0;
  top: 0;
  border-radius: ${(props: IProps) => {
    if (props.focus === String(props.leftCur)) return "4px"
  }};
  background: ${(props: IProps) => {
    if (props.focus === String(props.leftCur)) return "rgba(17, 17, 17, 0.4)"
  }};
`

export const Preview = styled.img`
  width: 180px;
  height: 150px;
  cursor: pointer;
  background: none;
  border-radius: 4px;
  border: 1px solid #ededed;
  margin-bottom: 6px !important;
  content: url(${(props: IProps) => {
    if (!props.imgUrl) return
    return `https://storage.googleapis.com/${props.imgUrl.replaceAll(
      " ",
      "%20"
    )}`
  }});
  z-index: 1;

  :last-of-type {
    margin-bottom: 0px;
  }
`

export const RightBox = styled.div`
  display: inline-block;
  width: 842px;
  padding: 0 50px;
  margin: 0 auto;
  height: 470px;
  position: relative;
`

export const PictureBox = styled.div`
  width: 742px;
  height: 470px;
  overflow: hidden;
  display: flex;
  border: 1px solid #ededed;
  border-radius: 4px;
`

export const SelectPicture = styled.div`
  width: 742px;
  display: flex;
`

export const Picture = styled.img`
  width: 100%;
  height: 470px;
  content: url(${(props: IProps) => {
    if (!props.imgUrl) return
    return `https://storage.googleapis.com/${props.imgUrl.replaceAll(
      " ",
      "%20"
    )}`
  }});
  flex: none;
`

export const LeftBtn = styled.button`
  position: absolute;
  left: 4rem;
  top: 12rem;
  font-size: 28px;
  cursor: pointer;
  border: none;
  color: #666;
  background-color: transparent;
  z-index: 1;
`
export const RightBtn = styled.button`
  position: absolute;
  right: 4rem;
  top: 12rem;
  font-size: 28px;
  cursor: pointer;
  border: none;
  color: #666;
  background-color: transparent;
  z-index: 1;
`
