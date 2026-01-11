import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GameTable } from "../components/GameTable";
import { Lobby } from "../components/Lobby";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lobby" replace />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/table/:tableId" element={<GameTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
