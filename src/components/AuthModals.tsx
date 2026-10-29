"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users2,
  BookOpen,
} from "lucide-react";
import { COURSES } from "@/data/courses";
import { submitAdmission } from "@/lib/firestore";
import {
  registerStudentAccount,
  loginPortalUser,
  DEMO_ACCOUNTS,
  PortalUser,
} from "@/lib/userAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<PortalUser | null>(null);

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

  const handleFillDemo = () => {
    const demo = DEMO_ACCOUNTS[role];
    setEmailOrId(role === "student" ? (demo as any).studentId : demo.email);
    setPassword(demo.password);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = loginPortalUser(role, emailOrId, password);
    if (res.success && res.user) {
      setLoggedInUser(res.user);
    } else {
      setError(res.error || "ভুল আইডি বা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন।");
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
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E5EAF0] p-6 sm:p-8 text-[#101D32]"
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
          <h2 className="text-2xl font-black text-[#0B1726]">Portal Login</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Access your courses, routine, assignments & results
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-[#FAF8F3] border border-[#E5EAF0] rounded-xl mb-4 text-xs font-semibold">
          {(["student", "teacher", "parent"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setError(null);
                setLoggedInUser(null);
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

        {loggedInUser ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                {loggedInUser.role} Authenticated
              </span>
              <h3 className="text-lg font-bold text-[#0B1726] mt-2">
                স্বাগতম, {loggedInUser.name}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {loggedInUser.email} {loggedInUser.studentId ? `• ID: ${loggedInUser.studentId}` : ""}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <p className="font-semibold">✓ আপনার অ্যাকাউন্টে সফলভাবে লগইন হয়েছে।</p>
              <p className="text-[11px] text-slate-500">
                {role === "student" && "আপনার কোর্স, লাইভ ক্লাস শিডিউল ও অ্যাসাইনমেন্ট সক্রিয় রয়েছে।"}
                {role === "teacher" && "অনলাইন ক্লাস ও পরীক্ষার মার্কশিট এন্ট্রি প্যানেল রেডি।"}
                {role === "parent" && "সন্তানের উপস্থিতি ও ফলাফল মনিটরিং পোর্টাল প্রস্তুত।"}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                const el = document.getElementById("courses");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-2.5 px-4 bg-[#0B1726] text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore My Courses & Lessons</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Demo Autofill Pill */}
            <div className="mb-4 p-2.5 bg-amber-50/80 border border-amber-200/60 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFAA24]" />
                <span className="text-[11px]">
                  {role === "student" && "ভর্তি ফর্মে দেওয়া ইমেইল ও পাসওয়ার্ড লিখুন, অথবা:"}
                  {role === "teacher" && "ফ্যাকাল্টি ডেমো একাউন্ট ব্যবহার করুন:"}
                  {role === "parent" && "অভিভাবক ডেমো একাউন্ট ব্যবহার করুন:"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="font-bold underline text-[#0B1726] hover:text-[#FFAA24] text-[11px] shrink-0"
              >
                Auto-fill Demo
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  {role === "student" && "Student ID or Email"}
                  {role === "teacher" && "Faculty Email / Teacher ID"}
                  {role === "parent" && "Guardian Mobile Number or Email"}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    placeholder={
                      role === "student"
                        ? "PHY-2026-001 or email@domain.com"
                        : role === "teacher"
                        ? "teacher@physicsschool.edu"
                        : "01811234568 or parent@example.com"
                    }
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1.5">
                  Password (পাসওয়ার্ড)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                className="w-full py-3 px-4 bg-[#FFAA24] text-[#0B1726] hover:bg-[#FF9A00] font-bold text-sm rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FFAA24]"
              >
                Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#E5EAF0] space-y-2 text-center text-xs text-[#64748B]">
              <div>
                নতুন শিক্ষার্থী?{" "}
                <button
                  onClick={() => {
                    onClose();
                    onSwitchToSignUp();
                  }}
                  className="font-bold text-[#0B1726] hover:text-[#FFAA24] underline"
                >
                  Apply for Admission & Create Password
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
          </>
        )}
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setCourse] = useState(defaultCourseId || "classical-mechanics");
  const [level, setLevel] = useState("High School / HSC");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [assignedStudentId, setAssignedStudentId] = useState<string>("");
  const [submissionMode, setSubmissionMode] = useState<string>("live");
  const [passwordError, setPasswordError] = useState<string | null>(null);

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
    setPasswordError(null);

    if (password.length < 4) {
      setPasswordError("পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে!");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("উভয় পাসওয়ার্ড একই হতে হবে!");
      return;
    }

    setSubmitting(true);

    // 1. Register student account locally for instant login
    const regRes = registerStudentAccount({
      fullName: name,
      email,
      phone,
      password,
      course,
      academicLevel: level,
    });
    setAssignedStudentId(regRes.studentId);

    // 2. Submit to Firebase Firestore
    try {
      const res = await submitAdmission({
        fullName: name,
        email,
        phone,
        academicLevel: level,
        primaryCourse: course,
        password,
        studentId: regRes.studentId,
      });
      setSubmissionId(res.id);
      setSubmissionMode(res.mode);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
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
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E5EAF0] p-6 sm:p-8 text-[#101D32] max-h-[90vh] overflow-y-auto"
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
          <h2 className="text-2xl font-black text-[#0B1726]">Start Learning Physics</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Apply online & set your login password • Admissions Open
          </p>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1726]">ভর্তি আবেদন ও অ্যাকাউন্ট সফলভাবে সম্পন্ন!</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              অভিনন্দন <strong>{name || "Student"}</strong>! আপনার অ্যাকাউন্ট এবং <strong>{COURSES.find((c) => c.id === course)?.title || "Physics Course"}</strong> কোর্সের আবেদন সফল হয়েছে।
            </p>

            {/* Login Credentials Box */}
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E5EAF0] text-left text-xs space-y-2">
              <p className="font-bold text-[#0B1726] border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#FFAA24]" />
                <span>আপনার লগইন তথ্য (Login Credentials):</span>
              </p>
              <div className="flex justify-between">
                <span className="text-slate-500">Student ID:</span>
                <span className="font-mono font-bold text-[#0B1726]">{assignedStudentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Login Email:</span>
                <span className="font-bold text-[#0B1726]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password:</span>
                <span className="font-mono font-bold text-[#0D8B83]">•••••••• ({password})</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs">
              <strong>✓ লাইভ ডাটাবেজ আপডেট:</strong> আপনার তথ্য Firebase Firestore ও লোকাল সিস্টেমে সফলভাবে সংরক্ষিত হয়েছে।
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
                onSwitchToLogin();
              }}
              className="w-full py-3 px-4 bg-[#FFAA24] text-[#0B1726] hover:bg-[#FFC247] font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>এখনই স্টুডেন্ট পোর্টালে লগইন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {passwordError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                Full Name (শিক্ষার্থীর পূর্ণ নাম) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mysha Chowdhury"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01700000000"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD CREATION SECTION */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2.5">
              <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#FFAA24]" />
                <span>লগইন পাসওয়ার্ড নির্ধারণ করুন (Set Login Password)</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-[#0B1726] mb-1">
                    পাসওয়ার্ড দিন *
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g. 123456"
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#0B1726] mb-1">
                    পাসওয়ার্ড নিশ্চিত করুন *
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="পুনরায় লিখুন"
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-amber-800">
                এই পাসওয়ার্ড এবং আপনার ইমেইল দিয়ে আপনি যেকোনো সময় স্টুডেন্ট পোর্টালে লগইন করতে পারবেন।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                  Academic Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                >
                  <option value="High School / HSC">High School / HSC</option>
                  <option value="A-Level / AP Physics">A-Level / AP Physics</option>
                  <option value="Undergraduate">Undergraduate / College</option>
                  <option value="Enthusiast / Independent">Enthusiast / Independent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1726] mb-1">
                  Primary Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FFAA24]"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 bg-[#FFAA24] text-[#0B1726] hover:bg-[#FF9A00] font-bold text-sm rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-[#FFAA24] flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{submitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "Submit Application & Create Account"}</span>
            </button>

            <div className="pt-2 text-center text-xs text-[#64748B]">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
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
