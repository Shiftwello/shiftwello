const API_URL = process.env.REACT_APP_API_URL;

export async function fetchShifts() {
  const res = await fetch(`${API_URL}/api/shifts`);
  if (!res.ok) {
    throw new Error('Failed to fetch shifts');
  }
  return await res.json();
}