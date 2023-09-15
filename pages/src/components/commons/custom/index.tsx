import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { Global, ThemeProvider } from "@emotion/react"
import styled from "@emotion/styled"
import { useCallback, useEffect, useState } from "react"
import { GlobalStyles } from "./globals"
import { mode } from "./theme"

export const CustomThemeProvider: React.FC = ({ children }: any) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState(mode.light)
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setMounted(true)
    if (
      window.localStorage.getItem("welcoming-theme") === "dark" ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches &&
        !window.localStorage.getItem("welcoming-theme"))
    ) {
      setDark(true)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem("welcoming-theme", `${dark ? "dark" : "light"}`)
    if (window.localStorage.getItem("welcoming-theme") === "dark") {
      setTheme(mode.dark)
    } else if (window.localStorage.getItem("welcoming-theme") === "light") {
      setTheme(mode.light)
    }
  }, [dark])
  const toggleTheme = useCallback(() => {
    setDark((curr) => !curr)
  }, [dark])

  const body = (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles(theme)} />
      {children}
      <DarkModeBtn type="button" onClick={toggleTheme}>
        {dark ? (
          <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
        )}
      </DarkModeBtn>
    </ThemeProvider>
  )

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>
  }
  return body
}

const DarkModeBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 40px;
  height: 40px;
  padding: 0 25px;
  border-radius: 20px;
  cursor: pointer;
  color: ${({ theme }) => {
    return theme.bg.darkBtn
  }};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  font-size: 24px;
  text-align: center;
  :hover {
    background: hsla(0, 0%, 100%, 0.3);
  }
`
