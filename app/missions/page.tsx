"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { LuTarget } from "react-icons/lu";

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#3C0366_50%,#000000_100%)] font-sans p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="w-10 h-10 rounded-lg bg-[#59168B80] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="font-heading text-4xl text-white tracking-wide uppercase">
          Missions
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-8 min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center text-center">
        {/* Icon Container */}
        <div className="w-24 h-24 rounded-full bg-red-400/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(89,22,139,0.4)]">
          <LuTarget className="text-5xl text-[#FF8904]" />
        </div>

        {/* Text Content */}
        <h2 className="text-white text-3xl font-bold mb-4 tracking-wide">
          Missions Coming Soon!
        </h2>
        <p className="text-white max-w-lg text-sm md:text-base leading-relaxed">
          We're working on exciting daily and weekly missions for you to
          complete and earn amazing rewards. Check back soon to start your
          mission journey!
        </p>
      </div>
    </div>
  );
}
