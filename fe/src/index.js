import React from "react";
import ReactDOM from "react-dom/client";
import AppUser from "./AppUser";
import AppAdmin from "./AppAdmin";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AppUser /> */}
      <AppAdmin />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
