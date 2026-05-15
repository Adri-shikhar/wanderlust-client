import Link from "next/link";

const linkClass =
  "inline-block transition-all duration-300 hover:translate-x-0.5 hover:text-white";

const Footer = () => {
  return (
    <footer className="animate-fade-in bg-black px-6 py-16 text-gray-400 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-6xl font-bold tracking-tight text-white md:text-7xl">
            Wanderlust
          </h1>
          <p className="mt-4 max-w-xl text-gray-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white">NEWSLETTER</h3>
            <p className="mb-4 text-sm">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="flex items-center rounded-lg bg-gray-800 px-4 py-3 transition-shadow focus-within:ring-2 focus-within:ring-[#33A1C9]/50">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <span className="cursor-pointer text-lg text-white transition-transform hover:scale-110">
                ↗
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Destinations" className={linkClass}>
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/Bookings" className={linkClass}>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/Profile" className={linkClass}>
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white">SUPPORT</h3>
            <ul className="space-y-2 text-sm">
              <li className={`${linkClass} cursor-pointer`}>Help Center</li>
              <li className={`${linkClass} cursor-pointer`}>Terms of Service</li>
              <li className={`${linkClass} cursor-pointer`}>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-white">CONTACT US</h3>
            <ul className="space-y-2 text-sm">
              <li>786 901 1622</li>
              <li>info@wandarland.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 md:flex-row">
          <p className="text-sm">© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex gap-5 text-lg text-white">
            {["X", "in", "◎"].map((icon) => (
              <span
                key={icon}
                className="cursor-pointer transition-all duration-300 hover:scale-125 hover:text-[#33A1C9]"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
