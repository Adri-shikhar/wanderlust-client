"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function isoOrStringToLocalYmd(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function localTodayYmd() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DestinationBookingActions({
  bookingId,
  departureDate,
  accent,
}) {
  const defaultYmd = useMemo(() => {
    const fromApi = isoOrStringToLocalYmd(departureDate);
    const today = localTodayYmd();
    if (!fromApi) return today;
    return fromApi < today ? today : fromApi;
  }, [departureDate]);

  const [dateYmd, setDateYmd] = useState(defaultYmd);

  const href = `/Bookings?destination=${encodeURIComponent(bookingId)}&departureDate=${encodeURIComponent(dateYmd)}`;

  return (
    <>
      <div className="mt-6">
        <label
          htmlFor="trip-date"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-400"
        >
          Departure date
        </label>
        <input
          id="trip-date"
          type="date"
          value={dateYmd}
          min={localTodayYmd()}
          onChange={(e) => setDateYmd(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <Link
        href={href}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accent }}
      >
        Book Now
        <span aria-hidden>→</span>
      </Link>
    </>
  );
}
