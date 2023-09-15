import { css, Theme } from "@emotion/react"

export const GlobalStyles = (theme: Theme) => css`
  /* reset css 적용 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: url(/new2.png) no-repeat;
    background-blend-mode: multiply;
    background-color: ${theme.bg.bodyBg};
  }
`

export default GlobalStyles
