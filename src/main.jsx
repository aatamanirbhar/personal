import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import AdminDashboard from "./pages/AdminDashboard";
import AddHeroSlide from "./pages/AddHeroSlide";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route
        path="/bkl"
        element={<AdminDashboard />}
      />

      <Route
        path="/mkl"
        element={<AddHeroSlide />}
      />
    </Routes>
  </BrowserRouter>
);