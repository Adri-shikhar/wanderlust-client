# Wanderlust Client

Next.js frontend for Wanderlust — browse destinations, book trips, and manage reservations. Uses Better Auth (email/password and Google) and talks to the [Wanderlust API](../wanderlust-server/) for destinations and bookings.

## Live link https://wanderlust-client-4ghv-git-main-obito4.vercel.app



## Features

- Browse and view destination details
- Book trips with departure date selection
- **My Bookings** — view and delete your reservations
- Sign in with email/password or Google
- Admin panel to add destinations

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Better Auth + MongoDB adapter
- Hero UI

## Prerequisites

- Node.js 18+
- MongoDB Atlas (auth sessions and users)
- Google OAuth credentials (optional, for Google sign-in)
- Wanderlust API running (see `../wanderlust-server/`) — default `http://localhost:8000`

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_WANDERLUST_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |

## Environment variables

| Variable | Description |
| -------- | ----------- |
| `MONGODB_URI` | MongoDB connection string (Better Auth) |
| `BETTER_AUTH_SECRET` | Secret for session signing |
| `BETTER_AUTH_URL` | Public URL of this app (`http://localhost:3000` locally, or your Vercel URL) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_WANDERLUST_API_URL` | Base URL of the Wanderlust REST API |

### Vercel

Set the same variables in the Vercel project settings. For production:

- `BETTER_AUTH_URL` → `https://wanderlust-client-4ghv-git-main-obito4.vercel.app`
- `NEXT_PUBLIC_WANDERLUST_API_URL` → your deployed API URL (not `localhost`)

## Google OAuth

In [Google Cloud Console](https://console.cloud.google.com/) → Credentials → your OAuth client, add:

**Authorized JavaScript origins**

```
https://wanderlust-client-4ghv-git-main-obito4.vercel.app
http://localhost:3000
```

**Authorized redirect URIs**

```
https://wanderlust-client-4ghv-git-main-obito4.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

`BETTER_AUTH_URL` must match the origin used in redirect URIs.

## Project layout

```
src/
├── app/
│   ├── (main)/          # Pages: Destinations, Bookings, Login, Admin, …
│   │   └── lib/         # data.js, auth.js, auth-client.js
│   └── api/auth/        # Better Auth route handler
└── components/          # Navbar, booking UI, etc.
```

## Related

- API server: [`../wanderlust-server/`](../wanderlust-server/)
