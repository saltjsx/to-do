import { track } from "@databuddy/sdk";

export async function trackEvent(name, properties) {
  try {
    await track(name, properties || {});
  } catch (e) {
    // Swallow errors to avoid impacting UX
    if (import.meta.env.DEV) {
      console.warn("Databuddy track failed", e);
    }
  }
}
