"use client";

import { createPortal } from "react-dom";
import { Spinner } from "@heroui/react";

export default function LogoutOverlay() {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm"
      style={{ animation: "fade-in 0.12s ease-out both" }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner color="accent" size="lg" />
      <p className="text-sm font-medium text-neutral-700">Signing out…</p>
    </div>,
    document.body,
  );
}
