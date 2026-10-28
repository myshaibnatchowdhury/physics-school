import { db, isFirebaseConfigured } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface AdmissionSubmission {
  fullName: string;
  email: string;
  phone: string;
  academicLevel: string;
  primaryCourse: string;
  createdAt?: unknown;
}

/**
 * Helper to ensure async operations never hang indefinitely
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs = 4000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("FIRESTORE_TIMEOUT")), timeoutMs);
  });
  return Promise.race([
    promise.then((res) => {
      clearTimeout(timer);
      return res;
    }),
    timeoutPromise,
  ]);
}

/**
 * Submit student admission application to Firebase Firestore
 */
export async function submitAdmission(data: AdmissionSubmission) {
  // If db is not initialized
  if (!isFirebaseConfigured || !db) {
    console.log("Firebase offline mode:", data);
    backupToLocalStorage("offline_admissions", data);
    return { success: true, mode: "demo", id: "demo-" + Date.now() };
  }

  try {
    const writePromise = addDoc(collection(db, "admissions"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "pending_review",
    });

    const docRef = await withTimeout(writePromise, 4500);
    console.log("Admission recorded in Firestore:", docRef.id);
    return { success: true, mode: "live", id: docRef.id };
  } catch (error) {
    console.warn("Firestore write timed out or encountered error, saving locally:", error);
    backupToLocalStorage("offline_admissions", data);
    return {
      success: true,
      mode: "queued",
      id: "local-" + Date.now().toString(36),
    };
  }
}

function backupToLocalStorage(key: string, data: unknown) {
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push({ data, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }
  }
}
