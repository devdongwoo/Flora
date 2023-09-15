import styled from "@emotion/styled"
import { Rate } from "antd"

interface IStyles {
  isEdit?: boolean
  question?: boolean
}

export const Wrap = styled.div`
  width: 100%;
  font-family: "Noto Sans CJK KR";
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapContent = styled.div`
  width: 100%;
`

export const Boundary = styled.div`
  width: 100%;
  border-top: 1px solid #bdbdbd;
`

export const CommentBox = styled.div`
  margin: 15px 0;
  position: relative;
`

export const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

export const UserName = styled.span`
  margin-left: 5px;
  font-size: 14px;
  font-weight: 700;
`

export const UnUser = styled.span`
  font-size: 28px;
  padding-left: 3px;
  margin-right: 5px;
`

export const Icon = styled.span`
  font-size: 17px;
  color: #ee2837;
  margin-right: 6px;
`

export const Text = styled.span`
  font-size: 15px;
  font-weight: 700;
`

export const Input = styled.input`
  margin-right: 14px;
  width: 120px;
  height: 28px;
  line-height: 31.8px;
  border: 1px solid #bdbdbd;
  padding-left: 10px;
  color: #000;
  font-weight: 300;
`

export const UserRate = styled(Rate)`
  font-size: 16px;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 141px;
  padding: 10px 0 0 10px;
  whitespace: "pre-wrap";
  border: 1px solid #bdbdbd;
  font-weight: 300;
  resize: none;
  color: #000;
`

export const TextBottom = styled.div`
  width: 100%;
  padding: 0px 0 0 10px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #bdbdbd;
  display: flex;
  position: absolute;
  bottom: 4px;
`

export const RegisterBtn = styled.button`
  width: 80px;
  height: 32px;
  background-color: ${(props: IStyles) => {
    return props.isEdit ? "#FFD600" : "#ee2837"
  }};
  border: none;
  color: #fff;
  cursor: pointer;
`

export const LimitChar = styled.div`
  font-size: 14px;
  color: #bdbdbd;
`

export const Cancel = styled.div`
  margin-right: 20px;
`

export const CancelIcon = styled.span`
  font-size: 16px;
  margin-left: 7%;
  color: #bdbdbd;
  cursor: pointer;
`
