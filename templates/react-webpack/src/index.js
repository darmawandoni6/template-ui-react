import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Components = React.lazy(() => import("./features/components/Components"));
const App = React.lazy(() => import("./App"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="components" element={<Components />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </Provider>
);
