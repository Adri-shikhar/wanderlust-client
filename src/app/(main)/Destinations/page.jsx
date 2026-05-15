import Image from "next/image";
import Link from "next/link";
import { fetchDestinations } from "../lib/data";
import { normalizeDestination } from "../lib/destinations";

export default async function DestinationsPage() {
  const raw = await fetchDestinations();
  const list = raw.map(normalizeDestination);

  return (
    <div className="min-h-screen bg-white px-4 pb-16 pt-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore All Destinations
          </h1>
          <p className="mt-2 max-w-2xl text-base text-gray-500">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {list.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center text-gray-600">
            No destinations loaded. Start the API server and add packages from{" "}
            <Link href="/Admin" className="font-medium text-teal-600 underline">
              Admin
            </Link>
            .
          </p>
        ) : (
          <>
            <p className="mb-8 text-sm text-gray-500">
              Showing {list.length}{" "}
              {list.length === 1 ? "destination" : "destinations"}
            </p>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((d) => (
                <li key={d._id}>
                  <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={d.imageUrl}
                        alt={d.destinationName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm">
                        <span>{d.rating}</span>
                        <svg
                          className="size-4 text-amber-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3 p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <svg
                          className="size-4 shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{d.country}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-lg font-bold leading-tight text-gray-900">
                          {d.destinationName}
                        </h2>
                        <p className="shrink-0 text-right text-sm text-gray-600">
                          <span className="font-bold text-gray-900">
                            ${d.price.toLocaleString()}
                          </span>
                          <span className="text-gray-500">/Person</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <svg
                          className="size-4 shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{d.duration}</span>
                      </div>
                      <Link
                        href={`/Destinations/${d._id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-teal-600 hover:text-teal-700"
                      >
                        Book now
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M7 7h10v10"
                          />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
