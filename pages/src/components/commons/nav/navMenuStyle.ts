import "../../../commons/styles/globalStyles"
import styled from "@emotion/styled"

export const Wrap = styled.div`
  width: 100%;
`

export const WrapBox = styled.div`
  width: 600px;
  font-weight: bold;
  text-align: center;
`

export const Text = styled.a`
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;
  margin-right: 20px;
  padding-bottom: 6px;
  &::selection {
    background: none;
  }
`
