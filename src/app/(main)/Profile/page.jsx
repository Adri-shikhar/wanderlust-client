"use client";

import { Button, Surface } from "@heroui/react";
import { authClient } from "../lib/auth-client";

export default function ProfilePage() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12">
        <p className="text-sm text-neutral-600">Loading session…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12">
        <p className="text-sm text-red-600">{error.message ?? "Could not load session."}</p>
      </main>
    );
  }

  if (!data?.user) {
    return (
      <main className="mx-auto max-w-lg px-4 py-12">
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Profile</h1>
        <p className="text-sm text-neutral-600">You are not signed in.</p>
      </main>
    );
  }

  const { name, email } = data.user;

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Profile</h1>
      <p className="mb-6 text-sm text-neutral-600">Signed-in account from session.</p>
      <Surface variant="default" className="space-y-4 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Name</p>
          <p className="text-neutral-900">{name ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Email</p>
          <p className="text-neutral-900">{email ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Password</p>
          <p className="text-sm text-neutral-600">
            Not available here. Sessions never include your password (only a secure cookie). To
            change password, use your app&apos;s account or password-reset flow when you add one.
          </p>
        </div>
        <Button
          type="button"
          variant="bordered"
          className="w-full"
          onClick={() => authClient.signOut()}
        >
          Sign out
        </Button>
      </Surface>
    </main>
  );
}
