import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/styles/globals.css";
import App, { ScrollToTop } from "./App.tsx";
import DefaultLayout from "./layouts/default.tsx";
import { Provider } from "./provider.tsx";
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
