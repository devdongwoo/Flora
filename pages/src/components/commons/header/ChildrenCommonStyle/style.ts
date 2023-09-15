import styled from "@emotion/styled"

export const Container = styled.div`
  margin-top: 10px;
  position: relative;
`

export const Profile = styled.div``

export const UserProfile = styled.div`
  text-align: right;
  padding-right: 10px;
`

export const UnUser = styled.div`
  color: ${() => {
    if (typeof window !== "undefined")
      return window.localStorage.getItem("welcoming-theme") === "dark"
        ? "#fff"
        : "gray"
  }};
  font-size: 32px;
`

export const DropdownMenu = styled.div`
  box-shadow: 0px 10px 20px 3px #0000001a;
  position: absolute;
  color: #000;
  top: 70px;
  right: 12px;
  background-color: #fff;
  border-radius: 8px;
  padding: 0px 20px;
  width: 140px;
  z-index: 9999;

  &:before {
    content: "";
    position: absolute;
    top: -4px;
    right: 12px;
    height: 20px;
    width: 20px;
    background: #fff;
    transform: rotate(45deg);
  }

  &::selection {
    background: none;
  }
`
export const emoji = styled.span`
  margin-right: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  &::selection {
    background: none;
  }
`

export const UserName = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 20px 0 10px 0;
  font-weight: 600;
  color: #555;
  line-height: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  &::selection {
    background: none;
  }
`

export const SubTitle = styled.span`
  display: inline-block;
  margin-top: 12px;
  font-size: 8px;
  color: #222;
  ::selection {
    background: none;
  }
`

export const Icon = styled.span`
  margin: 0 7px;
  opacity: 0.6;
  ::selection {
    background: none;
  }
`

export const Title = styled.span`
  color: #bdbaba;
`

export const DropDownItem = styled.li`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  line-height: 3rem;
  text-align: right;
  &:hover {
    cursor: pointer;
    color: red;
    ${Icon} {
      opacity: 1;
      color: #000;
    }
    ${Title} {
      color: #000;
    }
  }

  :nth-of-type(1) ${Icon} {
    margin: 0 7px;
  }
`
