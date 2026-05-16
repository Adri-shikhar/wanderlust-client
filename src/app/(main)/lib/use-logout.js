"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "./auth-client";

const LOGOUT_MS = 1500;

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logOut() {
    if (isLoggingOut) return;

    flushSync(() => {
      setIsLoggingOut(true);
    });

    const started = Date.now();
    try {
      await authClient.signOut();
      const remaining = LOGOUT_MS - (Date.now() - started);
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      setIsLoggingOut(false);
      toast.error(err?.message || "Could not sign out. Try again.");
    }
  }

  return { logOut, isLoggingOut };
}
