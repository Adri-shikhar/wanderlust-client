"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const ACCENT = "#33A1C9";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44daf258?auto=format&fit=crop&w=800&q=80";

export default function BookingsList({ bookings, onDelete }) {
  return (
    <>
      {bookings.map((b, i) => {
        const id = String(b._id);
        const title = b.destinationName || b.name || "Trip";

        return (
          <Reveal key={id} delay={i * 80}>
            <article className="card-lift mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={b.imageUrl || FALLBACK_IMG}
                  alt={title}
                  fill
                  className="img-zoom object-cover"
                  sizes="800px"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                {b.country && <p className="text-sm text-gray-500">{b.country}</p>}
                {b.date && <p className="mt-2 text-sm text-gray-600">Date: {b.date}</p>}
                {b.duration && <p className="text-sm text-gray-600">{b.duration}</p>}
                {b.price != null && (
                  <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                    ${Number(b.price).toLocaleString()}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  {b.destinationId && (
                    <Link
                      href={`/Destinations/${b.destinationId}`}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-[#33A1C9] hover:text-[#33A1C9]"
                    >
                      View trip
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => onDelete(id)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </>
  );
}
