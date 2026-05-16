const authPublicUrl =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  (process.env.BETTER_AUTH_URL &&
  !/^https?:\/\/localhost/i.test(process.env.BETTER_AUTH_URL)
    ? process.env.BETTER_AUTH_URL
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...(authPublicUrl ? { NEXT_PUBLIC_BETTER_AUTH_URL: authPublicUrl } : {}),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
