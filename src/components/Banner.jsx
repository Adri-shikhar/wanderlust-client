import Link from "next/link";
import { Separator } from "@heroui/react";
import bannerBackground from "@/assets/Banner.png";

const Banner = () => {
  return (
    <div
      className="relative flex min-h-[580px] flex-col items-center justify-between gap-5 overflow-hidden bg-cover bg-center bg-no-repeat text-white sm:min-h-[620px]"
      style={{ backgroundImage: `url(${bannerBackground.src})` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3.5 p-10 text-center">
        <h1 className="animate-fade-in-up text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="animate-fade-in-up animate-delay-200 max-w-2xl text-lg text-white/90 sm:text-2xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="animate-fade-in-up animate-delay-400 mt-2 flex flex-wrap justify-center gap-4">
          <Link
            href="/Destinations"
            className="btn-brand rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Explore Now
          </Link>

          <Link
            href="/Bookings"
            className="btn-glass rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            My Bookings
          </Link>
        </div>
      </div>

      <div className="animate-fade-in-up animate-delay-500 relative z-10 hidden w-full items-center justify-between gap-5 bg-white/25 backdrop-blur-md md:flex">
        <div className="px-6 py-4">
          <h3 className="text-sm font-semibold">Location</h3>
          <p className="text-xs text-white/80">Anywhere worldwide</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div className="px-4 py-4">
          <h3 className="text-sm font-semibold">Date / Duration</h3>
          <p className="text-xs text-white/80">Flexible dates</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div className="px-4 py-4">
          <h3 className="text-sm font-semibold">Budget</h3>
          <p className="text-xs text-white/80">$500 – $5,000+</p>
        </div>

        <Separator variant="tertiary" orientation="vertical" />

        <div className="px-4 py-4">
          <h3 className="text-sm font-semibold">Travelers</h3>
          <p className="text-xs text-white/80">Solo to groups</p>
        </div>

        <Link
          href="/Destinations"
          className="btn-brand shrink-0 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white"
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default Banner;
