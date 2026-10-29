"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Phone, Mail, Clock, RefreshCw, UserCheck } from "lucide-react";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { EnrolledStudent } from "@/data/mockStudents";

interface OnlineApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  academicLevel: string;
  primaryCourse: string;
  status: "pending_review" | "approved" | "rejected";
  createdAt?: string;
}

interface OnlineAdmissionsTabProps {
  onApproveToEnrolled: (student: EnrolledStudent) => void;
}

export default function OnlineAdmissionsTab({ onApproveToEnrolled }: OnlineAdmissionsTabProps) {
  const [applications, setApplications] = useState<OnlineApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    const loaded: OnlineApplication[] = [];

    // 1. Try Firebase Firestore
    if (isFirebaseConfigured && db) {
      try {
        const querySnapshot = await getDocs(collection(db, "admissions"));
        querySnapshot.forEach((d) => {
          const data = d.data();
          loaded.push({
            id: d.id,
            fullName: data.fullName || "Prospective Student",
            email: data.email || "student@example.com",
            phone: data.phone || "N/A",
            academicLevel: data.academicLevel || "HSC / A-Level",
            primaryCourse: data.primaryCourse || "Classical Mechanics",
            status: data.status || "pending_review",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : "Recent",
          });
        });
      } catch (err) {
        console.warn("Could not load from Firestore, checking local storage:", err);
      }
    }

    // 2. Check LocalStorage fallback
    if (typeof window !== "undefined") {
      try {
        const local = JSON.parse(localStorage.getItem("offline_admissions") || "[]");
        local.forEach((item: { data: OnlineApplication; timestamp: string }, idx: number) => {
          loaded.push({
            id: "local-" + idx,
            fullName: item.data.fullName || "Student",
            email: item.data.email || "",
            phone: item.data.phone || "",
            academicLevel: item.data.academicLevel || "High School",
            primaryCourse: item.data.primaryCourse || "General",
            status: "pending_review",
            createdAt: new Date(item.timestamp).toLocaleDateString(),
          });
        });
      } catch {
        // Ignore
      }
    }

    // If empty, provide sample applications matching user's demo
    if (loaded.length === 0) {
      loaded.push(
        {
          id: "demo-app-1",
          fullName: "Mysha Chowdhury",
          email: "mysha@gmail.com",
          phone: "01789123456",
          academicLevel: "High School / HSC",
          primaryCourse: "Classical Mechanics",
          status: "pending_review",
          createdAt: "2026-10-28",
        },
        {
          id: "demo-app-2",
          fullName: "Sakib Al Hasan",
          email: "sakib@gmail.com",
          phone: "01812345678",
          academicLevel: "A-Level / AP Physics",
          primaryCourse: "Quantum Mechanics",
          status: "pending_review",
          createdAt: "2026-10-27",
        },
        {
          id: "demo-app-3",
          fullName: "Zarin Tasnim",
          email: "zarin@gmail.com",
          phone: "01912345678",
          academicLevel: "Undergraduate",
          primaryCourse: "Electromagnetism",
          status: "pending_review",
          createdAt: "2026-10-26",
        }
      );
    }

    setApplications(loaded);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (app: OnlineApplication) => {
    // Convert application to EnrolledStudent
    const newEnrolled: EnrolledStudent = {
      id: "stu-enrolled-" + Date.now(),
      roll: (Math.floor(10 + Math.random() * 80)).toString(),
      admissionNo: `ADM-2026-${Math.floor(100 + Math.random() * 899)}`,
      nameEn: app.fullName,
      nameBn: app.fullName,
      classSection: app.academicLevel,
      guardianName: "Guardian of " + app.fullName.split(" ")[0],
      guardianContact: app.phone,
      status: "ACTIVE",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    onApproveToEnrolled(newEnrolled);

    // Update status in list
    setApplications((prev) =>
      prev.map((item) => (item.id === app.id ? { ...item, status: "approved" } : item))
    );

    // Update in Firestore if connected
    if (isFirebaseConfigured && db && !app.id.startsWith("demo-") && !app.id.startsWith("local-")) {
      try {
        await updateDoc(doc(db, "admissions", app.id), { status: "approved" });
      } catch (e) {
        console.warn("Could not update Firestore document status:", e);
      }
    }
  };

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          ওয়েবসাইট থেকে অনলাইনে জমা হওয়া আবেদনসমূহ সরাসরি এখানে প্রদর্শিত হচ্ছে।
        </p>
        <button
          onClick={fetchApplications}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E5EAF0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] border-b border-[#E5EAF0] text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Applicant Name</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Academic Level</th>
                <th className="py-3 px-4">Target Course</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    কোনো আবেদন পেন্ডিং নেই।
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#0B1726]">{app.fullName}</p>
                      <p className="text-[11px] text-slate-400">Date: {app.createdAt}</p>
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{app.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {app.academicLevel}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#0D8B83]">
                      {app.primaryCourse}
                    </td>
                    <td className="py-3.5 px-4">
                      {app.status === "approved" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          APPROVED
                        </span>
                      ) : app.status === "rejected" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          REJECTED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 flex items-center gap-1 w-max">
                          <Clock className="w-2.5 h-2.5" />
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {app.status === "pending_review" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleApprove(app)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 shadow-xs"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>অনুমোদন (+ Enroll)</span>
                          </button>
                          <button
                            onClick={() => handleReject(app.id)}
                            className="p-1.5 rounded-lg border border-slate-200 text-rose-500 hover:bg-rose-50 text-[11px]"
                            title="বাতিল"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">প্রসেসড</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
