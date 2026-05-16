import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import DestinationBookingActions from "@/components/DestinationBookingActions";
import { fetchDestinationById } from "../../lib/data";
import { auth } from "../../lib/auth";
import Delete_button from "@/components/Delete_button";

const accent = "#33A1C9";

const fallbackImage =
  "https://images.unsplash.com/photo-1488646953014-85cb44daf258?auto=format&fit=crop&w=1600&q=80";

const defaultHighlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 size-5 shrink-0 text-emerald-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function DestinationPage({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  if (!token) {
    redirect(`/Login?callbackUrl=${encodeURIComponent(`/Destinations/${id}`)}`);
  }

  const destination = await fetchDestinationById(id, token);

  if (!destination) {
    notFound();
  }

  const {
    _id,
    destinationName,
    name,
    country,
    price,
    rating,
    duration,
    imageUrl,
    description,
    departureDate,
    highlights,
    reviewCount,
    reviews,
    category,
  } = destination;
  const data = {
    destinationName,
    name,
    country,
    price,
    rating,
    duration,
    imageUrl,
    description,
    departureDate,
    highlights,
    reviewCount,
    reviews,
    category,
  };

  const title = destinationName ?? name ?? "Destination";
  const image = imageUrl ?? fallbackImage;
  const overview =
    description ??
    "Discover unforgettable scenery, local culture, and curated experiences on this journey.";
  const highlightList =
    Array.isArray(highlights) && highlights.length > 0
      ? highlights
      : defaultHighlights;
  const reviewTotal = reviewCount ?? reviews ?? null;
  const ratingNum = Number(rating);
  const priceNum = Number(price) || 0;
  const bookingId = String(_id ?? id);

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/Destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <span aria-hidden>←</span>
            Back to Destinations
          </Link>
          <Delete_button destinationId={bookingId} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <div className="relative aspect-[21/9] w-full min-h-[200px] overflow-hidden bg-gray-200 sm:rounded-b-xl lg:mt-2">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="size-4 text-gray-400"
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
              <span>{country ?? "—"}</span>
            </div>

            <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <svg
                  className="size-5 text-emerald-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {Number.isFinite(ratingNum) ? ratingNum.toFixed(1) : "—"}
                {reviewTotal != null && (
                  <span className="font-normal text-gray-500">
                    {" "}
                    ({reviewTotal} reviews)
                  </span>
                )}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-gray-900">
                <svg
                  className="size-5 text-gray-400"
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
                {duration ?? "—"}
              </span>
              {category && (
                <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                  {category}
                </span>
              )}
            </div>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900">Overview</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{overview}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900">Highlights</h2>
              <p className="mt-3 text-gray-600">
                Everything included in this curated package for a seamless trip.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlightList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50">
              <p className="text-sm text-gray-500">Starting from</p>
              <p
                className="mt-1 font-serif text-4xl font-bold"
                style={{ color: accent }}
              >
                ${priceNum.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">per person</p>

              <DestinationBookingActions
                data={data}
                bookingId={bookingId}
                departureDate={departureDate}
                accent={accent}
              />

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Free cancellation up to 7 days</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>Travel insurance included</span>
                </li>
                <li className="flex gap-3">
                  <CheckIcon />
                  <span>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
