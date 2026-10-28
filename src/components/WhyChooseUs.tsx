"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface WhyChooseUsProps {
  onStartLearning: () => void;
}

export default function WhyChooseUs({ onStartLearning }: WhyChooseUsProps) {
  const benefits = [
    {
      title: "Structured curriculum from basics to advanced levels",
      desc: "Carefully calibrated lessons progressing from classical principles to contemporary quantum mechanics.",
    },
    {
      title: "Live classes & recorded sessions",
      desc: "Attend interactive live masterclasses or rewatch HD recordings at your own pace.",
    },
    {
      title: "Doubt solving with expert teachers",
      desc: "Get personalized answers and step-by-step guidance from experienced physics faculty.",
    },
    {
      title: "Regular assessments and performance tracking",
      desc: "Weekly chapter quizzes, mock exams, and analytics to identify strengths and weaknesses.",
    },
    {
      title: "Lifetime access to course materials",
      desc: "Revisit lecture notes, formula sheets, and solved problem sets whenever you need revision.",
    },
  ];

  return (
    <section id="why-choose" className="py-16 sm:py-24 bg-white border-y border-[#E5EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Benefits & Narrative */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-teal-50 text-[#0D8B83] mb-3">
                Why Us
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
                Why Choose Physics School?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed">
                We go beyond traditional learning to give you a complete and engaging physics education experience.
              </p>
            </div>

            {/* Checklist with clean styling */}
            <div className="space-y-4 sm:space-y-5">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200 text-[#0D8B83] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0D8B83] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B1726]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onStartLearning}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#0B1726] text-white hover:bg-[#FFAA24] hover:text-[#0B1726] transition-all shadow-sm"
              >
                <span>Join Our Academic Community</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Visual with Quote Overlay */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-2xl border border-[#E5EAF0] group">
              <Image
                src="/images/why-choose-student-hd.jpg"
                alt="Student studying physics problem solving with laptop and notebook under warm desk lamp"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Dark Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Quote Card (from Attachment 2) */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                <blockquote className="text-xs sm:text-sm italic font-medium leading-relaxed">
                  &ldquo;Physics is not just a subject, it&apos;s a way of seeing the world.&rdquo;
                </blockquote>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#FFAA24]">
                  <span className="font-semibold uppercase tracking-wider">Physics School Philosophy</span>
                  <span>Newton to Quantum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
