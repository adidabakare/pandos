import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./utils/AuthProvider";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { JamProvider, useJam, use } from "jam-core-react";
import { MoralisProvider } from "react-moralis";

const jamConfig = {
  domain: "beta.jam.systems",
  development: true,

  sfu: true,
};

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider theme={darkTheme}>
        <JamProvider options={{ jamConfig }}>
          <MoralisProvider
            appId="o2DpocS7Kd4jPFVCEmYUdxyQAyx51SflwTnyCGln"
            serverUrl="https://jtog9qjv1t2r.usemoralis.com:2053/server"
          >
            <App />
          </MoralisProvider>
        </JamProvider>
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
