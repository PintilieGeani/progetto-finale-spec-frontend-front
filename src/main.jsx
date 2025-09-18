import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WineProvider } from "../context/WineContext.jsx";
import './index.css'
import { WineryProvider } from "../context/WineryContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WineProvider>
        <WineryProvider>
        <App />
        </WineryProvider>
      </WineProvider>
    </BrowserRouter>
  </React.StrictMode>
);