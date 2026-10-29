"use client";

const DEFAULT_ADMIN_PASSWORD = "admin";
const ADMIN_PASSWORD_KEY = "physics_school_admin_pass";
const ADMIN_SESSION_KEY = "physics_school_admin_session";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PASSWORD;
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_ADMIN_PASSWORD;
}

export function setAdminPassword(newPassword: string): boolean {
  if (typeof window === "undefined") return false;
  if (!newPassword || newPassword.trim().length < 3) return false;
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
  return true;
}

export function checkAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function loginAdmin(enteredPassword: string): boolean {
  if (typeof window === "undefined") return false;
  const currentPassword = getAdminPassword();
  if (enteredPassword.trim() === currentPassword) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
}
