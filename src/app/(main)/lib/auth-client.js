import { createAuthClient } from "better-auth/react";

/** Same-origin `/api/auth` by default; set NEXT_PUBLIC_AUTH_URL if auth lives elsewhere. */
export const authClient = createAuthClient();
