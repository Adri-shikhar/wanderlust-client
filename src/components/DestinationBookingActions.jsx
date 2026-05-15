"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { authClient } from "@/app/(main)/lib/auth-client";
import { createBooking } from "@/app/(main)/lib/data";
import { toast } from "sonner";

/** Local calendar day as YYYY-MM-DD (works with `<input type="date">`). */
function ymd(d) {
  return d.toLocaleDateString("en-CA");
}

export default function DestinationBookingActions({
  bookingId,
  departureDate,
  accent,
  data,
}) {
  const handleBooking = async (booking_data) => {
    const response = await createBooking(booking_data);
    console.log(response);
    if (response.acknowledged) {
      toast.success("Booking created successfully");
    } else {
      toast.error("Failed to create booking");
    }
  };
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const sessionId = session?.session?.id;

  const [dateYmd, setDateYmd] = useState(() => {
    const today = ymd(new Date());
    if (!departureDate) return today;
    const fromTrip = new Date(departureDate);
    if (Number.isNaN(fromTrip.getTime())) return today;
    const trip = ymd(fromTrip);
    return trip < today ? today : trip;
  });

  const booking_data = useMemo(() => {
    const session_id = sessionId ?? null;
    const user_id = user?.id ?? null;
    const email = user?.email ? String(user.email).trim() : null;
    const name = user?.name ? String(user.name).trim() : null;
    const username = user?.username ? String(user.username).trim() : null;

    const payload = {
      ...data,
      destinationId: bookingId,
      date: dateYmd,
      user_id,
      session_id,
      email,
      name,
      username,
    };

    return payload;
  }, [data, user, sessionId, dateYmd, bookingId]);
  console.log(booking_data);

  const today = ymd(new Date());
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
          min={today}
          onChange={(e) => setDateYmd(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
      </div>

      <button
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: accent }}
        onClick={() => handleBooking(booking_data)}
      >
        Confirm Booking
      </button>
    </>
  );
}
