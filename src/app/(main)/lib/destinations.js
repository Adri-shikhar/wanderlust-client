import { fetchDestinations } from "./data";

export const fallbackDestinationImage =
  "https://images.unsplash.com/photo-1488646953014-85cb44daf258?auto=format&fit=crop&w=800&q=80";

export function normalizeDestination(destination) {
  const {
    _id,
    id,
    destinationName,
    name,
    country,
    price,
    rating,
    duration,
    imageUrl,
  } = destination;

  return {
    _id: String(_id ?? id ?? ""),
    destinationName: destinationName ?? name ?? "Destination",
    country: country ?? "",
    price: Number(price) || 0,
    rating: Number(rating) || 0,
    duration: duration ?? "",
    imageUrl: imageUrl ?? fallbackDestinationImage,
  };
}

/** Top N by rating; API only — empty array if none or request fails. */
export async function getTopDestinations(count = 3) {
  try {
    const raw = await fetchDestinations();
    if (!Array.isArray(raw) || raw.length === 0) return [];
    const list = raw.map(normalizeDestination);
    list.sort((a, b) => b.rating - a.rating);
    return list.slice(0, count);
  } catch {
    return [];
  }
}
