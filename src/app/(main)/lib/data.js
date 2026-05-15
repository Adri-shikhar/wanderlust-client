export const fetchDestinations = async () => {
  try {
    const response = await fetch("http://localhost:8000/destinations", {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export const fetchDestinationById = async (id) => {
  const response = await fetch(`http://localhost:8000/destinations/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
};

export const addDestination = async (data) => {
  const response = await fetch("http://localhost:8000/destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteDestination = async (id) => {
  const response = await fetch(`http://localhost:8000/destinations/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
