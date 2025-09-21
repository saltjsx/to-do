import React from "react";
import { Databuddy } from "@databuddy/sdk/react";

// Hardcoded client ID per user request. Consider using env vars for production security.
const DATABUDDY_CLIENT_ID = "ASXGpJ05APlrIzFKVuq-j";

export function DatabuddyProvider({ children }) {
  if (!DATABUDDY_CLIENT_ID) return children;
  return (
    <>
      {children}
      <Databuddy
        clientId={DATABUDDY_CLIENT_ID}
        trackHashChanges
        trackAttributes
        trackOutgoingLinks
        trackInteractions
        trackEngagement
        trackScrollDepth
        trackExitIntent
        trackBounceRate
        trackWebVitals
        trackErrors
        enableBatching
        // Keep batching defaults; could expose via config later
        batchSize={10}
        batchTimeout={3000}
      />
    </>
  );
}
