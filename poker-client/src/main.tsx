import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GameTable from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameTable />
  </StrictMode>
);
