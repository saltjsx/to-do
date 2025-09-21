import React from "react";
import { Databuddy } from "@databuddy/sdk/react";

// Hardcoded client ID per user request. Consider using env vars for production security.
const DATABUDDY_CLIENT_ID = "ASXGpJ05APlrIzFKVuq-j";

export function DatabuddyProvider({ children }) {
  if (!DATABUDDY_CLIENT_ID) return children;
  return (
    <>
      <Databuddy
        clientId={DATABUDDY_CLIENT_ID}
        trackWebVitals
        trackErrors
        enableBatching
        batchSize={10}
        batchTimeout={3000}
        disabled={import.meta.env.DEV}
      />
      {children}
    </>
  );
}
