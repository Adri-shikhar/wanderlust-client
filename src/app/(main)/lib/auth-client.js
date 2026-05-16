"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";
import { getAuthBaseURL } from "./auth-url";

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  plugins: [jwtClient()],
});
