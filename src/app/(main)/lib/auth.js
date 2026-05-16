import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getServerAuthBaseURL } from "./auth-url";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("Wanderlust");

export const auth = betterAuth({
  /** Full site origin (OAuth redirect). See https://www.better-auth.com/docs/authentication/google */
  baseURL: getServerAuthBaseURL(),
  trustedOrigins: [
    "http://localhost:3000",
    "https://*.vercel.app",
  ],
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      /** Only add fields here so we never overwrite `image` with `undefined` (would clear Google photo). */
      mapProfileToUser: (profile) =>
        profile.picture ? { image: String(profile.picture) } : {},
    },
  },
});
