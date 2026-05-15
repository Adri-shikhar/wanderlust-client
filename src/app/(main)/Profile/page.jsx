"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Spinner, Surface } from "@heroui/react";
import { toast } from "sonner";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "../lib/auth-client";

const ACCENT = "#33A1C9";

export default function ProfilePage() {
  const router = useRouter();
  const { data, isPending, error } = authClient.useSession();

  async function logOut() {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "Could not sign out. Try again.");
    }
  }

  if (isPending) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center px-4 py-12">
        <Surface variant="default" className="flex flex-col items-center gap-4 p-12">
          <Spinner color="accent" size="lg" />
          <p className="text-sm text-neutral-600">Loading your profile…</p>
        </Surface>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center px-4 py-12">
        <Surface variant="default" className="p-6">
          <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Profile</h1>
          <p className="text-sm text-red-600">{error.message || "Could not load session."}</p>
        </Surface>
      </main>
    );
  }

  if (!data?.user) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center px-4 py-12">
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900">Your profile</h1>
        <p className="mb-6 text-sm text-neutral-600">
          Sign in to view your account details and manage your session.
        </p>
        <Surface variant="default" className="space-y-4 p-6">
          <p className="text-center text-sm text-neutral-600">You are not signed in.</p>
          <Button type="button" className="w-full" onPress={() => router.push("/Login")}>
            Log in
          </Button>
          <p className="text-center text-sm text-neutral-600">
            No account?{" "}
            <Link href="/Signup" className="font-medium hover:underline" style={{ color: ACCENT }}>
              Sign up
            </Link>
          </p>
        </Surface>
      </main>
    );
  }

  const user = data.user;
  const name = user.name?.trim() || "Traveler";
  const email = user.email || "—";
  const hasPhoto = Boolean(user.image || user.picture);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Profile</h1>
        <p className="mt-1 text-sm text-neutral-600">Your Wanderlast account</p>
      </div>

      <Surface variant="default" className="overflow-hidden p-0 shadow-sm">
        <div className="h-28 sm:h-32" style={{ backgroundColor: ACCENT }} aria-hidden />

        <div className="relative px-6 pb-2 pt-0 sm:px-10">
            <div className="-mt-16 flex flex-col items-center gap-4 sm:-mt-18 sm:flex-row sm:items-end sm:gap-6">
            <UserAvatar
              user={user}
              size="lg"
              className="size-28 shrink-0 text-2xl ring-4 ring-white shadow-lg sm:size-32"
            />
            <div className="min-w-0 flex-1 pb-1 text-center sm:pb-3 sm:text-left">
              <p className="truncate text-xl font-semibold text-neutral-900 sm:text-2xl">{name}</p>
              <p className="mt-0.5 truncate text-sm text-neutral-600">{email}</p>
              {hasPhoto ? (
                <p className="mt-2 inline-block rounded-full bg-neutral-100 px-3 py-0.5 text-xs font-medium text-neutral-600">
                  Photo from your account
                </p>
              ) : (
                <p className="mt-2 inline-block rounded-full bg-amber-50 px-3 py-0.5 text-xs font-medium text-amber-800">
                  Add a photo by signing in with Google, or we show your initials
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-6 py-8 sm:grid-cols-2 sm:gap-6 sm:px-10">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Email</p>
            <p className="mt-2 break-all text-sm font-medium text-neutral-900">{email}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Security</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Your password is never sent to the browser in full. Use password reset when you add
              that flow.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-6 sm:flex-row sm:px-10">
          <Button type="button" variant="tertiary" className="w-full sm:w-auto" onPress={() => router.push("/")}>
            Home
          </Button>
          <Button type="button" variant="danger" className="w-full sm:ml-auto sm:w-auto sm:min-w-40" onPress={logOut}>
            Log out
          </Button>
        </div>
      </Surface>
    </main>
  );
}
