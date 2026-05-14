const API_BASE =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function readJsonResponse(response) {
  const text = await response.text();
  const type = response.headers.get("content-type") ?? "";

  if (!type.includes("application/json")) {
    throw new Error(
      `Expected JSON from API, got "${type}". Is wanderlust-server running at ${API_BASE}? Body starts: ${text.slice(0, 120)}`,
    );
  }

  const data = JSON.parse(text);

  if (!response.ok) {
    const msg = data?.error ?? response.statusText;
    const err = new Error(`API ${response.status}: ${msg}`);
    err.status = response.status;
    throw err;
  }

  return data;
}

export const fetchDestinations = async () => {
  try {
    const response = await fetch(`${API_BASE}/destinations`, {
      next: { revalidate: 60 },
    });
    return await readJsonResponse(response);
  } catch (e) {
    console.error("fetchDestinations:", e.message);
    return [];
  }
};

export const fetchDestinationById = async (id) => {
  const response = await fetch(`${API_BASE}/destinations/${id}`, {
    cache: "no-store",
  });

  const text = await response.text();
  const type = response.headers.get("content-type") ?? "";

  if (response.status === 404) {
    return null;
  }

  if (!type.includes("application/json")) {
    throw new Error(
      `Expected JSON from API, got "${type}". Is wanderlust-server running at ${API_BASE}? Body starts: ${text.slice(0, 120)}`,
    );
  }

  const data = JSON.parse(text);

  if (!response.ok) {
    throw new Error(data?.error ?? `API ${response.status}`);
  }

  return data;
};
