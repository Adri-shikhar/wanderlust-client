import Link from "next/link";
import Navbar from "@/components/Navbar";

const ACCENT = "#33A1C9";

export function NotFoundContent() {
  return (
    <main className="page-gradient flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <div className="animate-fade-in-up mx-auto max-w-lg text-center">
        <p
          className="animate-float text-8xl font-bold leading-none sm:text-9xl"
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, #1e6d8a 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 text-base text-gray-500">
          This URL doesn&apos;t exist or the trip may have moved. Head back and
          explore our destinations.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-brand rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Go home
          </Link>
          <Link
            href="/Destinations"
            className="rounded-full border-2 border-[#33A1C9] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#33A1C9] transition-all duration-300 hover:bg-[#33A1C9] hover:text-white"
          >
            Destinations
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <NotFoundContent />
    </>
  );
}
