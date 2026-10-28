"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, GraduationCap, Monitor, Users, Award } from "lucide-react";

interface HeroProps {
  onStartLearning: () => void;
}

export default function Hero({ onStartLearning }: HeroProps) {
  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      icon: GraduationCap,
      title: "Expert Teachers",
      desc: "Learn from experienced physics educators",
    },
    {
      icon: Monitor,
      title: "Flexible Learning",
      desc: "Study anytime, anywhere",
    },
    {
      icon: Users,
      title: "Interactive Content",
      desc: "Videos, quizzes & real-life examples",
    },
    {
      icon: Award,
      title: "Certificate",
      desc: "Get certified upon completion",
    },
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-[#07111D] text-white overflow-hidden"
    >
      {/* Background Physics Atmosphere & Subtle Chalk Formulas */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 text-4xl sm:text-6xl font-mono text-slate-500/40 select-none">
          E = mc²
        </div>
        <div className="absolute top-1/2 left-1/3 text-3xl sm:text-5xl font-mono text-slate-500/30 select-none">
          F = ma
        </div>
        <div className="absolute bottom-16 left-1/4 text-2xl sm:text-4xl font-mono text-slate-500/20 select-none">
          ∇ × B = μ₀J
        </div>
        <div className="absolute top-20 right-1/4 text-3xl sm:text-5xl font-mono text-slate-500/30 select-none">
          λ = h / p
        </div>
      </div>

      {/* Atmospheric Glow Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FFAA24]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0D8B83]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#FFAA24] animate-pulse" />
              <span>Admissions Open for 2026 Term</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Build Your Future with{" "}
              <span className="text-[#FFAA24] drop-shadow-sm">
                Physics Knowledge
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Physics School is a modern learning platform designed to help students
              understand the universe, one concept at a time. Learn, practice, and
              grow with expert guidance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartLearning}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#FFAA24] text-[#0B1726] hover:bg-[#FFC247] shadow-lg shadow-[#FFAA24]/20 hover:shadow-xl hover:shadow-[#FFAA24]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07111D] focus:ring-[#FFAA24]"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                onClick={scrollToCourses}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white hover:text-[#FFAA24] bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#FFAA24]/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Explore Courses
              </a>
            </div>

            {/* 4 Feature Highlights Row */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {benefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex flex-col space-y-1.5 group">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#FFAA24] group-hover:scale-110 group-hover:bg-[#FFAA24]/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white pt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Visual Asset from Attachment 2 */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/images/hero-atom-hd.jpg"
                alt="Glowing physics atomic model sculpture resting on a textbook before a chalkboard of scientific equations"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111D] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

              {/* Floating floating physics formula badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#0B1726]/80 backdrop-blur-md rounded-xl border border-white/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFAA24] animate-ping" />
                  <span className="font-semibold text-white">Interactive Concept Labs</span>
                </div>
                <span className="text-[#FFAA24] font-mono font-bold">ħ = h / 2π</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
