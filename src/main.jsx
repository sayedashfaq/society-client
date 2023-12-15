import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="*" element={<App />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
