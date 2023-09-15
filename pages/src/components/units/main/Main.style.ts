import styled from "@emotion/styled"

export const Wrap = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
`

export const Contents = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const MenuBar = styled.div`
  cursor: pointer;
`

export const LeftContent = styled.div``

export const RightContent = styled.div`
  display: flex;
  align-items: end;
`

export const Title = styled.div`
  font-family: "MBCFontBold";
  font-weight: bold;
  font-size: 104px;
  color: #fff;
  padding: 100px 120px;
  display: block;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
  @keyframes scale {
    100% {
      transform: scale(1);
    }
  }
`

export const First = styled.div`
  opacity: 0;
  filter: blur(4px);
  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
  &::selection {
    background: none;
  }
`

export const Second = styled.div`
  opacity: 0;
  filter: blur(4px);
  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
  animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
`

export const Third = styled.div`
  opacity: 0;
  filter: blur(4px);
  @keyframes fade-in {
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
  animation: fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
`
