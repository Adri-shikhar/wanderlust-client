"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { toast } from "sonner";
import wanderlastLogo from "@/assets/Wanderlast.png";
import UserAvatar from "@/components/UserAvatar";
import { authClient } from "@/app/(main)/lib/auth-client";

const navLeft = [
  { href: "/", label: "Home" },
  { href: "/Destinations", label: "Destinations" },
  { href: "/Bookings", label: "My Bookings" },
  { href: "/Admin", label: "Admin" },
];

const accent = "#33A1C9";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const displayName = user?.name || user?.email;

  async function logOut() {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "Could not sign out. Try again.");
    }
  }

  return (
    <header className="glass-nav animate-slide-down sticky top-0 z-50 w-full border-b border-gray-100/80 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-4 sm:px-10 lg:px-12">
        <div
          className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto lg:gap-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {navLeft.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-b-2 pb-0.5 text-[#33A1C9]"
                    : "text-neutral-900 hover:text-[#33A1C9]"
                }`}
                style={active ? { borderColor: accent } : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 justify-center px-2 sm:px-4">
          <Link href="/" className="flex items-center" aria-label="Wanderlast home">
            <Image
              src={wanderlastLogo}
              alt="Wanderlast"
              width={162}
              height={24}
              className="h-6 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3 lg:gap-6">
          {isPending ? (
            <div className="skeleton-shimmer h-9 w-32 rounded-lg" aria-hidden />
          ) : user ? (
            <>
              <div className="flex max-w-full min-w-0 items-center gap-2">
                <UserAvatar user={user} size="sm" className="size-8 shrink-0 text-xs" />
                <span
                  className="hidden max-w-36 truncate text-sm text-neutral-700 sm:inline"
                  title={displayName}
                >
                  {displayName}
                </span>
              </div>
              <Link
                href="/Profile"
                className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              >
                Profile
              </Link>
              <Button type="button" variant="danger" size="sm" className="shrink-0" onPress={logOut}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/Profile"
                className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              >
                Profile
              </Link>
              <Link
                href="/Login"
                className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              >
                Login
              </Link>
              <Link
                href="/Signup"
                className="shrink-0 text-sm font-medium text-neutral-900 hover:text-neutral-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
