import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import Reveal from "@/components/motion/Reveal";
import { fetchDestinations } from "../lib/data";
import { normalizeDestination } from "../lib/destinations";

export default async function DestinationsPage() {
  const raw = await fetchDestinations();
  const list = raw.map(normalizeDestination);

  return (
    <div className="min-h-screen px-4 pb-16 pt-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#33A1C9]">
              Travel catalog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore All Destinations
            </h1>
            <p className="mt-2 max-w-2xl text-base text-gray-500">
              Find your perfect travel experience from our curated collection
            </p>
          </header>
        </Reveal>

        {list.length === 0 ? (
          <Reveal delay={100}>
            <p className="animate-scale-in rounded-2xl border border-dashed border-gray-200 bg-white/80 px-6 py-12 text-center text-gray-600 shadow-sm">
              No destinations loaded. Start the API server and add packages from{" "}
              <Link href="/Admin" className="font-medium text-[#33A1C9] underline">
                Admin
              </Link>
              .
            </p>
          </Reveal>
        ) : (
          <>
            <Reveal delay={80}>
              <p className="mb-8 text-sm text-gray-500">
                Showing {list.length}{" "}
                {list.length === 1 ? "destination" : "destinations"}
              </p>
            </Reveal>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((d, i) => (
                <li key={d._id}>
                  <DestinationCard destination={d} index={i} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
