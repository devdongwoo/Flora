import styled from "@emotion/styled"
import { Rate } from "antd"

interface IStyle {
  question?: boolean
}

export const Wrap = styled.div``

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: ${(props: IStyle) => {
    if (!props.question) return "10px"
  }};
  border-bottom: ${(props: IStyle) => {
    if (!props.question) return "1px solid #bdbdbd"
  }};
  margin-top: 10px;
`

export const ContentWrap = styled.div`
  display: flex;
`

export const Icon = styled.span`
  font-size: 28px;
  position: relative;
`

export const ReCommentIcon = styled.span`
  position: absolute;
  top: 4px;
  left: 12px;
  font-size: 18px;
`

export const Img = styled.img`
  border-radius: 50%;
  margin-left: ${(props: IStyle) => {
    if (props.question) return "40px"
  }};
`

export const UnUser = styled.span`
  color: gray;
  padding-left: 3px;
  margin-left: ${(props: IStyle) => {
    if (props.question) return "40px"
  }};
  margin-right: 5px;
`

export const RightContents = styled.div`
  display: flex;
  /* width: 716px; */
  flex-direction: column;
  padding-left: 10px;
`

export const Date = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #bdbdbd;
`

export const Top = styled.div`
  width: ${(props: IStyle) => {
    return props.question ? "340px" : "380px"
  }};
  display: flex;
  justify-content: space-between;
`

export const TopLeftBox = styled.span``

export const TopRightBox = styled.span``

export const PenIcon = styled.button`
  font-size: 14px;
  background-color: transparent;
  border: none;
  color: #bdbdbd;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`

export const CancelIcon = styled(PenIcon)`
  font-size: 16px;
  margin-left: 0px;
  margin-right: 0px;
`
export const Comments = styled(PenIcon)`
  margin-right: 0px;
`

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
`

export const UserRate = styled(Rate)`
  font-size: 16px;
  margin-left: 10px;
`

export const RightCenter = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #4f4f4f;
  padding-top: 7px;
`

export const ReComment = styled.div`
  width: 90%;
  margin-left: 20px;
`
