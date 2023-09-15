import { Theme, ThemeMode } from "@emotion/react"

declare module "@emotion/react" {
  export interface ThemeMode {
    bg: {
      primary: string
      bodyBg: string
      darkBtn: string
    }
    text: {
      primary: string
      bodyText: string
      darkBtn: string
    }
  }
  export interface Theme extends ThemeMode {
    mediaQuery: {
      mobile: string
      tablet: string
      laptop: string
      desktop: string
    }
  }
}
interface ThemeGroup {
  light: Theme
  dark: Theme
}

const light: ThemeMode = {
  bg: {
    primary: "#35c5f0",
    bodyBg: "#ffffff",
    darkBtn: "#1e1f21"
  },
  text: {
    primary: "#35c5f0",
    bodyText: "#000000",
    darkBtn: "#000000"
  }
}
const dark: ThemeMode = {
  bg: {
    primary: "#050505",
    bodyBg: "#1e1f21",
    darkBtn: "#fff"
  },
  text: {
    primary: "#fbfbfc",
    bodyText: "#d9d9d9",
    darkBtn: "#ffffff"
  }
}
interface MEDIA {
  mobile: string
  tablet: string
  laptop: string
  desktop: string
}

export const mediaQuery: MEDIA = {
  mobile: "375px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1600px"
}

export const mode: ThemeGroup = {
  light: { ...light, mediaQuery },
  dark: { ...dark, mediaQuery }
}
