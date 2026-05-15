"use client";

import Reveal from "@/components/motion/Reveal";

export default function AuthPageShell({ title, subtitle, children }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <Reveal>
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900">{title}</h1>
        {subtitle && <p className="mb-6 text-sm text-neutral-600">{subtitle}</p>}
      </Reveal>
      <Reveal delay={120}>
        <div className="animate-scale-in">{children}</div>
      </Reveal>
    </main>
  );
}
