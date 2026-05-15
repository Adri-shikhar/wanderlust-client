"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/app/(main)/lib/auth-client";
import { deleteBooking, fetchBookingsByUserId } from "@/app/(main)/lib/data";

const ACCENT = "#33A1C9";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44daf258?auto=format&fit=crop&w=800&q=80";

export default function BookingsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;

  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    if (!userId) return;
    fetchBookingsByUserId(userId).then((data) => {
      setBookings(Array.isArray(data) ? data : []);
    });
  }, [userId]);

  const loading = bookings === null;

  async function handleDelete(id) {
    const res = await deleteBooking(id, userId);
    if (res?.deletedCount > 0) {
      toast.success("Booking removed");
      setBookings((list) => list.filter((b) => String(b._id) !== String(id)));
    } else {
      toast.error("Could not delete booking");
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center text-gray-500">
        Loading…
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-2 text-gray-500">Sign in to see your trips.</p>
        <button
          type="button"
          onClick={() => router.push("/Login")}
          className="mt-6 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Log in
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <header
          className="mb-8 rounded-2xl p-6 text-white"
          style={{ backgroundColor: ACCENT }}
        >
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="mt-1 text-sm text-white/90">{session.user.email}</p>
          {!loading && (
            <p className="mt-2 text-sm text-white/80">
              {bookings.length} booking{bookings.length === 1 ? "" : "s"}
            </p>
          )}
        </header>

        {loading && <p className="text-center text-gray-500">Loading bookings…</p>}

        {!loading && bookings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-gray-600">No bookings yet.</p>
            <Link
              href="/Destinations"
              className="mt-4 inline-block text-sm font-semibold"
              style={{ color: ACCENT }}
            >
              Browse destinations →
            </Link>
          </div>
        )}

        {!loading &&
          bookings.map((b) => {
            const id = String(b._id);
            const title = b.destinationName || b.name || "Trip";

            return (
              <article
                key={id}
                className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={b.imageUrl || FALLBACK_IMG}
                  alt={title}
                  className="h-44 w-full object-cover"
                />
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
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700"
                      >
                        View trip
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </main>
  );
}
