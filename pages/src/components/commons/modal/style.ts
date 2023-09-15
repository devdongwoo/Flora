import styled from "@emotion/styled"

interface IStyle {
  isActive?: boolean
}

export const ImgText = styled.span`
  font-size: 12px;
  color: rgba(34, 34, 34, 0.5);
`

export const ImgBox = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  padding: 13px 0 13px 8px;
  margin-top: 8px;
  margin-bottom: 8px;
`

export const Sub = styled.div`
  display: flex;
  color: #555;
  font-size: 18px;
  font-weight: 600;
  padding: 20px 0 10px 0;
  text-align: center;
`

export const SubBox = styled.div`
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;

  :first-of-type {
    border-right: 1px solid #ebebeb;
  }
`

export const emoji = styled.span`
  color: #555;
  font-size: 16px;
  margin-right: 3px;
  &::selection {
    background: none;
  }
`
export const SubTitle = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-size: 8px;
  color: #222;
  position: relative;
  ::selection {
    background: none;
  }
`

export const NickNameBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const NickName = styled(ImgText)`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Input = styled.input`
  width: 470px;
  height: 32px;
  line-height: 32px;
  border: none;
  border-bottom: ${(props: IStyle) => {
    return props.isActive ? "2px solid #ccc" : "2px solid #f15746 !important"
  }};
  outline: none;
  font-size: 15px;

  :focus {
    border-bottom: 2px solid #000;
  }
`

export const MoneyInput = styled(Input)`
  padding-left: 2px;
`

export const NickNameError = styled.div`
  height: 24px;
  line-height: 24px;
  color: red;
  font-size: 14px;
`

export const MoneyBox = styled(NickName)``

export const MoneyError = styled(NickNameError)``

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
export const Ex = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 10px;
`
