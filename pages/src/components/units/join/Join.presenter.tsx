import { ILoginPresenter } from "./Join.types"
import * as L from "./Join.styles"

export default function JoinPresenter(props: ILoginPresenter) {
  return (
    <L.Wrap>
      <L.WrapContent>
        <L.ListBox>
          <L.Header>
            <L.MainText>회원가입</L.MainText>
          </L.Header>
          <L.Content>
            <L.TopBox>
              <L.InputText>이메일 주소</L.InputText>
              <L.EmailInput
                type="text"
                placeholder="예) flora@naver.com"
                autoComplete="off"
                onChange={props.onChangeEmail}
                isActive={props.isActive}
              />
              <L.Error ref={props.emailError}></L.Error>
            </L.TopBox>
            <L.MiddleBox>
              <L.InputText>비밀번호</L.InputText>
              <L.PasswordInput
                type="password"
                autoComplete="off"
                onChange={props.onChangePassword}
              />
            </L.MiddleBox>
            <L.BottomBox>
              <L.InputText>닉네임</L.InputText>
              <L.PasswordInput
                type="text"
                autoComplete="off"
                onChange={props.onChangeName}
              />
            </L.BottomBox>
            <L.LoginBtn
              isActive={props.isActive}
              password={props.password}
              email={props.email}
              name={props.name}
              onClick={props.onClickJoin}
            >
              가입하기
            </L.LoginBtn>
          </L.Content>
        </L.ListBox>
      </L.WrapContent>
    </L.Wrap>
  )
}
