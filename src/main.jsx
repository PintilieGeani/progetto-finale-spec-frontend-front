import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WineProvider } from "../context/WineContext.jsx";
import './index.css'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WineProvider>
        <App />
      </WineProvider>
    </BrowserRouter>
  </React.StrictMode>
);