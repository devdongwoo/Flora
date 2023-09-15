import styled from "@emotion/styled"

interface IStyled {
  check?: boolean
  activeTarget?: string
  id?: string
}

export const Wrap = styled.div`
  width: 630px;
  height: 40px;
  line-height: 40px;
  position: relative;
  padding-left: 10px;
`

export const NextOrPrevBtn = styled.button`
  color: ${(props: IStyled) => {
    return props.check ? "#a1a1a1" : "#000"
  }};
  cursor: ${(props: IStyled) => {
    return props.check ? "default" : "pointer"
  }};
  border: none;
  background: none;
`

export const PageList = styled.span`
  width: 40px;
  display: inline-block;
  cursor: pointer;
  color: ${(props: IStyled) => {
    if (props.activeTarget === props.id) {
      return "#0076ff;"
    }
  }};
  font-weight: ${(props: IStyled) => {
    return props.activeTarget === props.id ? "bold" : "normal"
  }};
  text-align: center;
`
