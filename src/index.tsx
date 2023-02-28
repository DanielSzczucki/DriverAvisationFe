import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-auth-kit";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { refreshApi } from "./utils/refreshToken";

import App from "./App";
import "./index.css";
import { create } from "domain";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName="{_auth}"
      refresh={refreshApi}
      cookieDomain={window.location.hostname}
      cookieSecure={true}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
