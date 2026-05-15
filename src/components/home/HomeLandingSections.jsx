import Image from "next/image";
import Link from "next/link";

const accent = "#33A1C9";

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ArrowOutIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function ChevronLeft({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

const whyFeatures = [
  {
    title: "Safe & Secure",
    body: "Verified partners, transparent pricing, and protected payments so you can book with confidence.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: "Expert Guides",
    body: "Local experts craft every itinerary so you experience authentic culture beyond the typical tourist trail.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    ),
  },
  {
    title: "24/7 Support",
    body: "Our team is always one message away—before, during, and after your trip—for stress-free travel.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    ),
  },
];

const testimonials = [
  {
    quote:
      "Wanderlust planned our honeymoon flawlessly—from hidden beaches to the perfect boutique hotel. We will book again.",
    name: "Sarah Mitchell",
    place: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    quote:
      "Every detail felt personal. Our guide knew the region inside out and made the whole family feel welcome.",
    name: "James Chen",
    place: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HomeLandingSections({ topDestinations = [] }) {
  const totalFeatured = topDestinations.length;
  const pageLabel = totalFeatured > 0 ? `1 / ${Math.max(1, Math.ceil(totalFeatured / 3))}` : "0 / 0";

  return (
    <>
      {/* Featured Destinations */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Featured Destinations
              </h2>
              <p className="mt-3 max-w-xl text-base text-gray-500 sm:text-lg">
                Hand-picked journeys with the highest ratings from travelers like you.
              </p>
            </div>
            <Link
              href="/Destinations"
              className="inline-flex shrink-0 items-center gap-2 self-start border-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-gray-50 sm:self-auto"
              style={{ borderColor: accent, color: accent }}
            >
              All destinations
              <ChevronRight className="size-4" />
            </Link>
          </div>

          {totalFeatured === 0 ? (
            <p className="mt-14 rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-14 text-center text-gray-600">
              No destinations yet. Add packages in{" "}
              <Link href="/Admin" className="font-semibold underline" style={{ color: accent }}>
                Admin
              </Link>{" "}
              to see them featured here.
            </p>
          ) : (
            <>
              <ul className="mt-12 grid gap-8 md:grid-cols-3">
                {topDestinations.map((d) => (
                  <li key={d._id}>
                    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={d.imageUrl}
                          alt={d.destinationName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white/95 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-sm">
                          <StarIcon className="size-4 text-amber-400" />
                          <span>{Number.isFinite(d.rating) && d.rating > 0 ? d.rating.toFixed(1) : "—"}</span>
                        </div>
                      </div>
                      <div className="space-y-4 p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <PinIcon className="size-4 shrink-0 text-gray-400" />
                          <span>{d.country || "—"}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-serif text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
                            {d.destinationName}
                          </h3>
                          <p className="shrink-0 text-right text-sm">
                            <span className="font-bold text-gray-900">${d.price.toLocaleString()}</span>
                            <span className="text-gray-500">/Person</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="size-4 shrink-0 text-gray-400" />
                          <span>{d.duration || "—"}</span>
                        </div>
                        <Link
                          href={`/Destinations/${d._id}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
                          style={{ color: accent }}
                        >
                          Book now
                          <ArrowOutIcon className="size-4" />
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-4">
                <span className="shrink-0 font-mono text-sm text-gray-400">{pageLabel}</span>
                <div className="h-px flex-1 bg-gray-200" aria-hidden />
                <div className="flex gap-2">
                  <span
                    className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-300"
                    aria-hidden
                  >
                    <ChevronLeft className="size-5" />
                  </span>
                  <span
                    className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-300"
                    aria-hidden
                  >
                    <ChevronRight className="size-5" />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Wanderlust */}
      <section className="bg-sky-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Why Choose Wanderlust
            </h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              We combine curated itineraries with human support so your trip feels effortless from the first click to
              the flight home.
            </p>
          </div>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {whyFeatures.map((item) => (
              <li key={item.title}>
                <article className="h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                  <svg
                    className="size-10 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={accent}
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    {item.icon}
                  </svg>
                  <h3 className="mt-6 font-serif text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Travelers Say */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 max-w-xl text-base text-gray-500">
                Real stories from guests who explored the world with us.
              </p>
            </div>
            <div className="flex gap-2 sm:shrink-0">
              <span
                className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400"
                aria-hidden
              >
                <ChevronLeft className="size-5" />
              </span>
              <span
                className="flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400"
                aria-hidden
              >
                <ChevronRight className="size-5" />
              </span>
            </div>
          </div>

          <ul className="mt-12 grid gap-8 lg:grid-cols-2">
            {testimonials.map((t) => (
              <li key={t.name}>
                <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md md:flex-row">
                  <div className="flex flex-1 flex-col justify-center p-8 md:p-10 lg:p-12">
                    <blockquote className="font-serif text-lg leading-relaxed text-gray-800 sm:text-xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <footer className="mt-8">
                      <p className="font-semibold" style={{ color: accent }}>
                        {t.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{t.place}</p>
                    </footer>
                  </div>
                  <div className="relative aspect-[4/3] w-full min-h-[220px] md:aspect-auto md:min-h-0 md:w-[42%]">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
