"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import wanderlastLogo from "@/assets/Wanderlast.png";

const navLeft = [
  { href: "/", label: "Home" },
  { href: "/Destinations", label: "Destinations" },
  { href: "/Bookings", label: "My Bookings" },
  { href: "/Admin", label: "Admin" },
];

const accent = "#33A1C9";

function NavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        active
          ? "border-b-2 pb-0.5"
          : "text-neutral-900 hover:text-neutral-600"
      }`}
      style={
        active
          ? { color: accent, borderColor: accent }
          : undefined
      }
    >
      {label}
    </Link>
  );
}



export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-8 lg:gap-10">
          {navLeft.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              active={href === "/" ? pathname === "/" : pathname.startsWith(href)}
            />
          ))}
        </div>

        <div className="flex justify-center px-4">
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

        <div className="flex items-center justify-end gap-8 lg:gap-10">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600"
          >
            Profile
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
