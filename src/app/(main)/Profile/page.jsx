"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { toast } from "sonner";
import { FiBook, FiHome, FiLogOut, FiMail } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import LogoutOverlay from "@/components/LogoutOverlay";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "../lib/auth-client";
import { useLogout } from "../lib/use-logout";

const ACCENT = "#33A1C9";

function ProfileShell({ children, className = "" }) {
  return (
    <main
      className={`mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-lg flex-col px-4 py-10 sm:py-14 ${className}`}
    >
      {children}
    </main>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl border border-neutral-100 bg-neutral-50/60 px-4 py-3.5"
    >
      <span
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: ACCENT }}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
        <p className="mt-0.5 break-all text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adminDeniedToast = useRef(false);
  const { logOut, isLoggingOut } = useLogout();
  const { data, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (adminDeniedToast.current) return;
    if (searchParams.get("adminOnly") !== "1") return;
    adminDeniedToast.current = true;
    toast.error("This area is for admins only.");
    router.replace("/Profile", { scroll: false });
  }, [router, searchParams]);

  if (isPending) {
    return (
      <ProfileShell className="justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <Spinner color="accent" size="lg" />
          <p className="text-sm text-neutral-500">Loading profile…</p>
        </div>
      </ProfileShell>
    );
  }

  if (error) {
    return (
      <ProfileShell className="justify-center">
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center">
          <h1 className="text-lg font-semibold text-neutral-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-red-600">
            {error.message || "Could not load your session."}
          </p>
        </div>
      </ProfileShell>
    );
  }

  if (!data?.user) {
    return (
      <ProfileShell className="justify-center">
        <Reveal>
          <div className="text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              Wanderlast
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">
              Your profile
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Sign in to view account details and manage your trip.
            </p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <Button type="button" className="w-full" onPress={() => router.push("/Login")}>
              Log in
            </Button>
            <p className="mt-4 text-center text-sm text-neutral-500">
              New here?{" "}
              <Link href="/Signup" className="font-medium hover:underline" style={{ color: ACCENT }}>
                Create account
              </Link>
            </p>
          </div>
        </Reveal>
      </ProfileShell>
    );
  }

  const user = data.user;
  const name = user.name?.trim() || "Traveler";
  const email = user.email || "—";
  const hasPhoto = Boolean(user.image || user.picture);

  return (
    <ProfileShell>
      {isLoggingOut ? <LogoutOverlay /> : null}
      <Reveal>
        <header className="mb-8 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            Account
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Manage your Wanderlast account</p>
        </header>
      </Reveal>

      <Reveal delay={60}>
        <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
          <div className="flex flex-col items-center px-6 pb-2 pt-8 text-center sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:pt-8 sm:text-left">
            <UserAvatar
              user={user}
              size="lg"
              className="size-24 shrink-0 text-xl ring-2 ring-[#33A1C9]/20 sm:size-28"
            />
            <div className="mt-4 min-w-0 sm:mt-0">
              <h2 className="truncate text-xl font-semibold text-neutral-900">{name}</h2>
              <p className="mt-0.5 truncate text-sm text-neutral-500">{email}</p>
              <span
                className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  hasPhoto
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {hasPhoto ? "Google photo linked" : "Initials avatar"}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3 px-6 pb-6 sm:px-8">
            <InfoRow icon={FiMail} label="Email" value={email} />
          </div>

          <div className="flex flex-col gap-2 border-t border-neutral-100 bg-neutral-50/80 p-4 sm:flex-row sm:p-5">
            <Button
              type="button"
              variant="tertiary"
              className="w-full justify-center gap-2 sm:flex-1"
              onPress={() => router.push("/")}
            >
              <FiHome className="size-4" aria-hidden />
              Home
            </Button>
            <Button
              type="button"
              variant="tertiary"
              className="w-full justify-center gap-2 sm:flex-1"
              onPress={() => router.push("/Bookings")}
            >
              <FiBook className="size-4" aria-hidden />
              My bookings
            </Button>
            <Button
              type="button"
              variant="danger"
              className="w-full justify-center gap-2 sm:flex-1"
              onPress={logOut}
              isDisabled={isLoggingOut}
            >
              <FiLogOut className="size-4" aria-hidden />
              Log out
            </Button>
          </div>
        </section>
      </Reveal>
    </ProfileShell>
  );
}
