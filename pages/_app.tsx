import type { AppProps } from "next/app"
import { Fragment } from "react"
import { RecoilRoot } from "recoil"
import Layout from "./src/components/commons"
import ApolloSetting from "./src/components/commons/apollo"
import { CustomThemeProvider } from "./src/components/commons/custom"
import "../styles/globals.css"

export default function App({ Component }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Fragment>
          <CustomThemeProvider>
            <Layout>
              <Component />
            </Layout>
          </CustomThemeProvider>
        </Fragment>
      </ApolloSetting>
    </RecoilRoot>
  )
}
