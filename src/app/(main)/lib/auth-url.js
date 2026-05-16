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
