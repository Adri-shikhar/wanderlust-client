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

export const fetchBookingsByUserId = async (user_id) => {
  const response = await fetch(
    `http://localhost:8000/bookings?user_id=${user_id}`,
  );
  return response.json();
};

export const deleteBooking = async (id, user_id) => {
  const response = await fetch(
    `http://localhost:8000/bookings/${id}?user_id=${user_id}`,
    { method: "DELETE" },
  );
  return response.json();
};

export const createBooking = async (booking_data) => {
  const response = await fetch("http://localhost:8000/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking_data),
  });
  return response.json();
};