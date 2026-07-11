/**
 * Thin client-side API layer. Every admin screen and the contact
 * form go through this so error handling stays in one place.
 */
async function request(path, { method = "GET", body, ...opts } = {}) {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    ...opts,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // non-JSON response
  }

  if (!res.ok || payload?.success === false) {
    const error = new Error(payload?.error || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return payload?.data ?? payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};
