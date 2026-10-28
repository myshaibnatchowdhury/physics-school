"use client";

import React from "react";
import Image from "next/image";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

interface FinalCtaProps {
  onGetStarted: () => void;
}

export default function FinalCta({ onGetStarted }: FinalCtaProps) {
  return (
    <section aria-label="Call to Action" className="py-12 sm:py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#07111D] via-[#0B1A2D] to-[#07111D] p-8 sm:p-12 lg:p-14 text-white overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FFAA24]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-[#0D8B83]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Glowing Icon Badge */}
            <div className="lg:col-span-2 flex justify-start sm:justify-center lg:justify-start">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#FFAA24]/20 to-white/5 border border-[#FFAA24]/40 flex items-center justify-center text-[#FFAA24] shadow-lg shadow-[#FFAA24]/10">
                <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
              </div>
            </div>

            {/* Center Content & CTA */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#FFAA24] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Begin Your Discovery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Ready to Explore the World of Physics?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                Join Physics School today and take the first step towards your dream. Discover the fundamental laws governing matter, energy, and the cosmos.
              </p>
              <div className="pt-2">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-[#FFAA24] text-[#0B1726] hover:bg-[#FFC247] shadow-lg shadow-[#FFAA24]/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Celestial Planet Visual */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-[#FFAA24]/30 shadow-2xl shadow-blue-500/20 group">
                <Image
                  src="/images/cta-planet-hd.jpg"
                  alt="Cosmic physics planet with glowing orbital trajectory"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111D]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
