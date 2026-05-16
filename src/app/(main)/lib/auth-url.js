/** Browser / SSR public origin for auth client (same-origin on Vercel when unset). */
export function getAuthBaseURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const fromEnv =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL;
  if (fromEnv && !/^https?:\/\/localhost/i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

/** Better Auth `baseURL` for server — trusts Vercel hosts even if env still says localhost. */
export function getServerAuthBaseURL() {
  const envUrl = process.env.BETTER_AUTH_URL?.trim().replace(/\/$/, "");
  const envIsLocalhost =
    envUrl && /^https?:\/\/localhost(\b|:)/i.test(envUrl);

  if (process.env.VERCEL) {
    if (envUrl && !envIsLocalhost) {
      return envUrl;
    }
    return {
      allowedHosts: ["localhost:*", "*.vercel.app"],
      protocol: "https",
      fallback: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`.replace(/\/$/, "")
        : "http://localhost:3000",
    };
  }

  return envUrl || "http://localhost:3000";
}
