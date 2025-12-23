"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import AvailableBonusesTab from "../../components/bonus/AvailableBonusesTab";
import ActiveBonusesTab from "../../components/bonus/ActiveBonusesTab";
import BonusHistoryTab from "../../components/bonus/BonusHistoryTab";

// Mock Data for Stats
const STATS = [
  { label: "Total Bonuses Claimed", value: "15" },
  { label: "Total Bonus Value", value: "$2,450" },
  { label: "Active Bonuses", value: "2" },
  { label: "Completion Rate", value: "87%" },
];

export default function BonusPage() {
  const [activeTab, setActiveTab] = useState("Available Bonuses");

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
        <h1 className="font-heading text-3xl md:text-4xl text-white tracking-wide ">
          Bonuses & Rewards
        </h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-2xl p-6"
          >
            <p className="text-white text-sm mb-1 font-medium">{stat.label}</p>
            <p className="text-white text-3xl  tracking-wide">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-[#59168B66] w-fit px-2 py-1 rounded-3xl gap-3 mb-8">
        {["Available Bonuses", "Active Bonuses", "Bonus History"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 cursor-pointer py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white shadow-[0_0_15px_rgba(152,16,250,0.4)]"
                : "text-[#E9D4FF] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="pb-20">
        {activeTab === "Available Bonuses" && <AvailableBonusesTab />}
        {activeTab === "Active Bonuses" && <ActiveBonusesTab />}
        {activeTab === "Bonus History" && <BonusHistoryTab />}
      </div>
    </div>
  );
}
