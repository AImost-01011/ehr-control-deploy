import React, { useEffect } from "react";
import "../styles/globals.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/dist/next-server/lib/router/router";
import theme from "../theme/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </MuiThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
