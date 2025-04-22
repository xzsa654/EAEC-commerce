import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import DefaultLayout from "./layouts/default.tsx";
import { ScrollToTop } from "./App.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Provider>
        <DefaultLayout>
          <App />
        </DefaultLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
