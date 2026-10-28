"use client";

import React from "react";
import { GraduationCap, BookOpen, Users, Star } from "lucide-react";
import { TRUST_STATS, StatItem } from "@/data/stats";

export default function TrustStats() {
  const getIcon = (name: StatItem["iconName"]) => {
    switch (name) {
      case "graduation-cap":
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAA24]" />;
      case "book-open":
        return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D8B83]" />;
      case "users":
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAA24]" />;
      case "star":
        return <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFAA24] fill-[#FFAA24]" />;
    }
  };

  return (
    <section aria-label="Trust and Statistics" className="relative -mt-6 sm:-mt-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-[#E5EAF0] p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#E5EAF0]">
            {TRUST_STATS.map((stat, idx) => (
              <div
                key={stat.id}
                className={`flex items-center gap-3.5 sm:gap-4 ${
                  idx > 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F3] border border-[#FFAA24]/30 flex items-center justify-center shrink-0 shadow-inner">
                  {getIcon(stat.iconName)}
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B1726] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#64748B]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent Developer / Configurator Note */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]/80">
            <span>* Illustrative metrics shown for presentation. Configurable via data schema before launch.</span>
            <span className="hidden sm:inline font-mono text-[10px]">VERIFIED_ACADEMIC_2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
