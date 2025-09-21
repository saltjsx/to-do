import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DatabuddyProvider } from "./analytics/databuddy.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DatabuddyProvider>
      <App />
    </DatabuddyProvider>
  </StrictMode>
);
