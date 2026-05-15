import Image from "next/image";
import Link from "next/link";

const accent = "#33A1C9";

function StarRatingBadge({ rating }) {
  const display = Number.isFinite(rating) ? rating.toFixed(1) : "—";
  return (
    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white/95 px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm">
      <span>{display}</span>
      <svg
        className="size-4 text-amber-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
}

export default function FeaturedDestinationsSection({ destinations }) {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.5rem]">
              Featured Destinations
            </h2>
            <p className="mt-2 max-w-xl text-base text-gray-500">
              Hand-picked journeys with the highest guest ratings—start planning
              your next escape.
            </p>
          </div>
          <Link
            href="/Destinations"
            className="inline-flex shrink-0 items-center gap-2 self-start border-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-sky-50 sm:self-auto"
            style={{ borderColor: accent, color: accent }}
          >
            All destinations
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <li key={d._id}>
              <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={d.imageUrl}
                    alt={d.destinationName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <StarRatingBadge rating={d.rating} />
                </div>
                <div className="space-y-3 p-5 sm:p-6">
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
                    <h3 className="font-serif text-xl font-bold leading-snug text-gray-900">
                      {d.destinationName}
                    </h3>
                    <p className="shrink-0 text-right text-sm leading-tight">
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
                    <span>{d.duration || "—"}</span>
                  </div>
                  <Link
                    href={`/Destinations/${d._id}`}
                    className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
                    style={{ color: accent }}
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

        <div className="mt-10 flex items-center gap-4">
          <span className="text-sm font-medium tabular-nums text-gray-400">
            1 / 1
          </span>
          <div className="h-px flex-1 bg-gray-200" />
          <div className="flex gap-2">
            <span
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-300"
              aria-hidden
            >
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            <span
              className="flex size-10 items-center justify-center rounded-full border border-gray-200 text-gray-300"
              aria-hidden
            >
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
