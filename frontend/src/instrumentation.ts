export function register() {
  if (typeof window !== "undefined") {
    return;
  }

  const storage = (globalThis as { localStorage?: unknown }).localStorage;

  if (storage && typeof (storage as { getItem?: unknown }).getItem !== "function") {
    // Avoid Next dev overlay crashes when Node injects a non-Storage localStorage.
    try {
      Object.defineProperty(globalThis, "localStorage", {
        value: undefined,
        configurable: true,
        writable: true,
      });
    } catch {
      try {
        (globalThis as { localStorage?: unknown }).localStorage = undefined;
      } catch {
        // Ignore if the environment disallows mutation.
      }
    }
  }
}
