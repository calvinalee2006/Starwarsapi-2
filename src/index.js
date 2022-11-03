import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <React>
    <App />
  </React>
);
