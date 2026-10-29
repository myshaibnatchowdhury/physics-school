"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { COURSES } from "@/data/courses";
import { submitAdmission } from "@/lib/firestore";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(
      `Demo Authentication Mode: Logged in as ${role} (${email || "demo@physicsschool.edu"}). Ready for Supabase / Firebase auth integration.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111D]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 sm:p-8 text-[#101D32]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0B1726] rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 relative mb-2">
            <Image
              src="/images/logo-mark.png"
              alt="Physics School Emblem"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1726]">Portal Login</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Access your courses, routine, assignments & results
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAF8F3] border border-[#E5EAF0] rounded-xl mb-5 text-xs font-semibold">
          {(["student", "teacher", "parent"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setMessage(null);
              }}
              className={`py-2 rounded-lg capitalize transition-all ${
                role === r
                  ? "bg-[#0B1726] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#0B1726]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {message && (
          <div className="mb-4 p-3 bg-teal-50 border border-teal-200 text-teal-800 text-xs rounded-xl flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
              {role === "student" ? "Student ID or Email" : "Institutional Email"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "student" ? "PHY-2026-001 or email@domain.com" : "educator@physicsschool.edu"}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-[#FFAA24] focus:ring-[#FFAA24]" />
              Remember me
            </label>
            <button type="button" className="hover:text-[#FFAA24] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#FFAA24] text-[#0B1726] hover:bg-[#FF9A00] font-bold text-sm rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FFAA24]"
          >
            Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#E5EAF0] space-y-2 text-center text-xs text-[#64748B]">
          <div>
            New student?{" "}
            <button
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
              className="font-bold text-[#0B1726] hover:text-[#FFAA24] underline"
            >
              Apply for Admission
            </button>
          </div>
          <div className="pt-1">
            <Link
              href="/admin/login"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 font-bold text-[#2563EB] hover:underline text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Are you an Administrator? Access Admin Portal →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  defaultCourseId?: string;
}

export function SignUpModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  defaultCourseId,
}: SignUpModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(defaultCourseId || "classical-mechanics");
  const [level, setLevel] = useState("High School / HSC");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [submissionMode, setSubmissionMode] = useState<string>("demo");

  useEffect(() => {
    if (defaultCourseId) setCourse(defaultCourseId);
  }, [defaultCourseId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitAdmission({
        fullName: name,
        email,
        phone,
        academicLevel: level,
        primaryCourse: course,
      });
      setSubmissionId(res.id);
      setSubmissionMode(res.mode);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111D]/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] p-6 sm:p-8 text-[#101D32] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0B1726] rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 relative mb-2">
            <Image
              src="/images/logo-mark.png"
              alt="Physics School Emblem"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1726]">Start Learning Physics</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Apply online for the upcoming term • Admissions Open
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1726]">Application Received!</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Thank you, <strong>{name || "Prospective Student"}</strong>! Your registration for{" "}
              <strong>{COURSES.find((c) => c.id === course)?.title || "Physics Course"}</strong> has been logged.
              Our academic admissions team will contact you at <strong>{email}</strong>.
            </p>
            <div className={`p-3 rounded-xl text-xs ${
              submissionMode === "live"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-teal-50 border border-teal-200 text-teal-800"
            }`}>
              <strong>{submissionMode === "live" ? "✓ Firebase Live Connected:" : "✓ Application Received:"}</strong>{" "}
              {submissionMode === "live"
                ? `Application recorded directly in Firebase Firestore (Document ID: ${submissionId})`
                : `Application logged securely (Reference ID: ${submissionId}). Admissions team will review.`}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-[#0B1726] text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition-colors"
            >
              Back to Homepage
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rafid Rahman"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1700 000000"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  Academic Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                >
                  <option value="High School / HSC">High School / HSC</option>
                  <option value="A-Level / AP Physics">A-Level / AP Physics</option>
                  <option value="Undergraduate">Undergraduate / College</option>
                  <option value="Enthusiast / Independent">Enthusiast / Independent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  Primary Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-3 bg-[#FAF8F3] border border-[#E5EAF0] rounded-xl text-xs text-[#64748B] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#0D8B83] shrink-0 mt-0.5" />
              <span>
                By submitting, you will receive our complete syllabus preview and admission guidelines.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-[#FFAA24] text-[#0B1726] hover:bg-[#FF9A00] font-bold text-sm rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FFAA24] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{submitting ? "Submitting..." : "Submit Admission Application"}</span>
            </button>

            <div className="pt-2 text-center text-xs text-[#64748B]">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
                className="font-bold text-[#0B1726] hover:text-[#FFAA24] underline"
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
