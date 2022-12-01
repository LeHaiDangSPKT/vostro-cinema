import React from "react";
import ReactDOM from "react-dom/client";
import AppUser from "./AppUser";
import AppAdmin from "./AppAdmin";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT;
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        {localStorage.getItem("login") == "admin" ? <AppAdmin /> : <AppUser />}
      </GoogleOAuthProvider>
      ;
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
