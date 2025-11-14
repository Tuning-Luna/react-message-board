import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { initThemeMode } from "flowbite-react";
// import { ThemeInit } from "../.flowbite-react/init";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ThemeInit /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);

// initThemeMode();
