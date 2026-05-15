"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/app/(main)/lib/auth-client";
import BookingsList from "@/components/BookingsList";
import Reveal from "@/components/motion/Reveal";
import { deleteBooking, fetchBookingsByUserId } from "@/app/(main)/lib/data";

const ACCENT = "#33A1C9";

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
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="skeleton-shimmer h-10 w-40 rounded-lg" aria-label="Loading" />
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <Reveal>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-500">Sign in to see your trips.</p>
          <button
            type="button"
            onClick={() => router.push("/Login")}
            className="btn-brand mt-6 rounded-lg px-6 py-3 text-sm font-semibold text-white"
          >
            Log in
          </button>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <header
            className="mb-8 rounded-2xl p-6 text-white shadow-lg shadow-[#33A1C9]/25"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #2a8aad 100%)`,
            }}
          >
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="mt-1 text-sm text-white/90">{session.user.email}</p>
            {!loading && (
              <p className="mt-2 text-sm text-white/80">
                {bookings.length} booking{bookings.length === 1 ? "" : "s"}
              </p>
            )}
          </header>
        </Reveal>

        {loading && (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="skeleton-shimmer h-48 rounded-2xl" />
            ))}
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <Reveal>
            <div className="animate-scale-in rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
              <p className="text-gray-600">No bookings yet.</p>
              <Link href="/Destinations" className="link-arrow mt-4 inline-block text-sm">
                Browse destinations →
              </Link>
            </div>
          </Reveal>
        )}

        {!loading && bookings.length > 0 && (
          <BookingsList bookings={bookings} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}
