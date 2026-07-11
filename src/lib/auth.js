import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "portfolio_admin_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: MAX_AGE });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/** Validate admin credentials against env config. */
export async function validateCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  if (email.toLowerCase() !== adminEmail.toLowerCase()) return false;

  // Supports either a bcrypt hash or a plain value in ADMIN_PASSWORD.
  if (adminPassword.startsWith("$2")) {
    return bcrypt.compare(password, adminPassword);
  }
  return password === adminPassword;
}

export async function setAuthCookie(payload) {
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

/** Returns the decoded admin session or null. Server-side only. */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/** Throws a Response-shaped error object for route handlers. */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  return session;
}
