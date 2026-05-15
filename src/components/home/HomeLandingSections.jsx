"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

const ACCENT = "#33A1C9";

const features = [
  {
    title: "Curated trips",
    desc: "Hand-picked destinations with verified guides and premium stays.",
    icon: "✦",
  },
  {
    title: "Flexible booking",
    desc: "Pick your date, confirm in seconds, manage trips anytime.",
    icon: "◎",
  },
  {
    title: "Trusted reviews",
    desc: "Real ratings from travelers who booked the same experience.",
    icon: "★",
  },
];

export default function HomeLandingSections({ topDestinations = [] }) {
  return (
    <>
      <section className="page-gradient px-4 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Top rated
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Popular destinations
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Start with our highest-rated packages — loved by travelers worldwide.
              </p>
            </div>
          </Reveal>

          {topDestinations.length === 0 ? (
            <Reveal delay={100}>
              <p className="rounded-2xl border border-dashed border-gray-200 bg-white/80 px-8 py-14 text-center text-gray-500">
                Destinations loading soon.{" "}
                <Link href="/Destinations" className="font-semibold" style={{ color: ACCENT }}>
                  Browse all →
                </Link>
              </p>
            </Reveal>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {topDestinations.map((d, i) => (
                <Reveal key={d._id} delay={i * 120}>
                  <li>
                    <Link
                      href={`/Destinations/${d._id}`}
                      className="group card-lift block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={d.imageUrl}
                          alt={d.destinationName}
                          fill
                          className="img-zoom object-cover"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-sm text-white/80">{d.country}</p>
                          <h3 className="text-xl font-bold">{d.destinationName}</h3>
                          <p className="mt-1 text-sm font-semibold">
                            From ${d.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-500">{d.duration}</span>
                        <span className="link-arrow text-xs uppercase">View trip</span>
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          )}

          <Reveal delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/Destinations"
                className="btn-brand inline-flex rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                View all destinations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Wanderlust
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-500">
                Everything you need for a seamless journey, from discovery to checkout.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <li className="card-lift rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50 p-8 text-center shadow-sm">
                  <span
                    className="animate-float inline-flex size-14 items-center justify-center rounded-2xl text-2xl text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, #2a8aad)`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {f.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-12">
        <Reveal>
          <div
            className="mx-auto max-w-7xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white sm:px-16"
            style={{
              background: `linear-gradient(135deg, ${ACCENT} 0%, #1e6d8a 100%)`,
            }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Ready for your next adventure?</h2>
            <p className="mx-auto mt-3 max-w-lg text-white/85">
              Browse destinations, pick a date, and confirm your booking in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/Destinations"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-transform hover:scale-105"
                style={{ color: ACCENT }}
              >
                Explore now
              </Link>
              <Link
                href="/Bookings"
                className="btn-glass rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white"
              >
                My bookings
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
