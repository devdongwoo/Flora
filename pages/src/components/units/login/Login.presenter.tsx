import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { ILoginPresenter } from "./Login.types"
import * as L from "./Login.styles"

export default function LoginPresenter(props: ILoginPresenter) {
  return (
    <L.Wrap>
      <L.WrapContent>
        <L.ListBox>
          <L.Header>
            <L.MainText>Flora</L.MainText>
            <L.SubText>New age that we make</L.SubText>
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
                onKeyUp={props.onKeyupLogin}
              />
              <L.Error ref={props.emailError}></L.Error>
            </L.TopBox>
            <L.BottomBox>
              <L.InputText>비밀번호</L.InputText>
              <L.PasswordInput
                type="password"
                autoComplete="off"
                onChange={props.onChangePassword}
                onKeyUp={props.onKeyupLogin}
              />
            </L.BottomBox>
            <L.LoginBtn
              isActive={props.isActive}
              password={props.password}
              email={props.email}
              onClick={props.onClickLogin}
            >
              로그인
            </L.LoginBtn>
            <L.GoMember onClick={props.onClickJoin}>
              <L.Icon>
                <FontAwesomeIcon icon={faArrowRightToBracket}></FontAwesomeIcon>
              </L.Icon>
              회원가입하러 가기
            </L.GoMember>
          </L.Content>
        </L.ListBox>
      </L.WrapContent>
    </L.Wrap>
  )
}
