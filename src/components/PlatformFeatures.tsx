"use client";

import React from "react";
import {
  FileText,
  Calendar,
  Clock,
  ClipboardCheck,
  Wallet,
  Bell,
  Users2,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { PLATFORM_FEATURES, PlatformFeature } from "@/data/features";

export default function PlatformFeatures() {
  const getIcon = (name: PlatformFeature["iconName"]) => {
    switch (name) {
      case "online-admission":
        return <FileText className="w-5 h-5 text-emerald-600" />;
      case "class-routine":
        return <Calendar className="w-5 h-5 text-amber-600" />;
      case "attendance-tracking":
        return <Clock className="w-5 h-5 text-teal-600" />;
      case "exam-results":
        return <ClipboardCheck className="w-5 h-5 text-purple-600" />;
      case "fee-management":
        return <Wallet className="w-5 h-5 text-green-600" />;
      case "notice-board":
        return <Bell className="w-5 h-5 text-orange-600" />;
      case "parent-portal":
        return <Users2 className="w-5 h-5 text-cyan-600" />;
      case "mobile-friendly":
        return <Smartphone className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase bg-[#FFAA24]/15 text-[#B45309] mb-3">
            Integrated Management & Learning Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1726] tracking-tight">
            Everything You Need to Learn Better
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B]">
            From routine schedules and exams to tuition invoices, experience a unified educational platform engineered for excellence.
          </p>
        </div>

        {/* 8 Feature Cards Grid (4x2 on desktop, matching Attachment 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PLATFORM_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-2xl bg-white border border-[#E5EAF0] shadow-sm hover:shadow-md hover:border-[#FFAA24]/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${feature.colorScheme.bg} border ${feature.colorScheme.border}`}
                >
                  {getIcon(feature.iconName)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B1726] mb-2 group-hover:text-[#FFAA24] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#64748B]">
                <span className="font-semibold">Platform Module</span>
                <span className="text-[#0D8B83] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Ready
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Capability Notice */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-[#E5EAF0] text-center text-xs text-[#64748B] max-w-2xl mx-auto">
          <p>
            * These represent the full planned and integrated platform capabilities for Physics School. Backend modules (payment gateways, automated gradebooks) connect into our secure database infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
