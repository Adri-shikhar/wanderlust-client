"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function DestinationCard({ destination, index = 0 }) {
  const d = destination;

  return (
    <Reveal delay={index * 90}>
      <article className="group card-lift overflow-hidden rounded-2xl border border-gray-100/80 bg-white shadow-sm">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={d.imageUrl}
            alt={d.destinationName}
            fill
            className="img-zoom object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-md backdrop-blur-sm">
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
              className="size-4 shrink-0 text-[#33A1C9]"
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
          <Link href={`/Destinations/${d._id}`} className="link-arrow text-xs uppercase tracking-wide">
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
    </Reveal>
  );
}
