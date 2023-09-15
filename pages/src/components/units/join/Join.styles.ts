import styled from "@emotion/styled"

interface IStyle {
  isActive?: boolean
  password?: string
  email?: string
  name?: string
}

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: 0.98;
`

export const WrapContent = styled.div`
  width: 1600px;
  padding-top: 50px;
`

export const ListBox = styled.div`
  width: 100%;
  height: 700px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  position: relative;
`

export const Header = styled.div`
  width: 100%;
  padding: 20px 40px 50px 40px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  line-height: 1.4;
`

export const MainText = styled.div`
  font-size: 34px;
`

export const SubText = styled(MainText)`
  font-size: 14px;
  font-style: normal;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TopBox = styled.div`
  height: 80px;
`

export const MiddleBox = styled.div`
  margin-top: 20px;
`

export const BottomBox = styled(MiddleBox)`
  margin-top: 40px;
`

export const InputText = styled.div`
  font-size: 13px;
  font-family: Suit;
  font-weight: bold;
  color: #222;
  margin-bottom: 4px;
`

export const EmailInput = styled.input`
  width: 340px;
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

export const PasswordInput = styled.input`
  width: 340px;
  height: 32px;
  line-height: 32px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 15px;

  :focus {
    border-bottom: 2px solid #000;
  }
`

export const Error = styled.div`
  font-size: 11px;
  color: #f15746;
`

export const LoginBtn = styled.button`
  background-color: ${(props: IStyle) => {
    return props.isActive && props.name && props.email && props.password
      ? "#222"
      : "#ebebeb"
  }};
  border-radius: 12px;
  border: none;
  color: #fff;
  cursor: ${(props: IStyle) => {
    return props.isActive && props.name && props.email && props.password
      ? "pointer"
      : "default"
  }};
  width: 340px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.16px;
  height: 52px;
  margin-top: 30px;
`

export const Icon = styled.span`
  margin-right: 10px;
`

export const GoMember = styled(LoginBtn)`
  color: #222;
  border-color: #ebebeb;
  font-family: Suit;
  font-weight: bold;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #ebebeb;
`
