"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import GeneralTab from "../../components/settings/GeneralTab";
import SecurityTab from "../../components/settings/SecurityTab";
import AvatarTab from "../../components/settings/AvatarTab";
import DocumentsTab from "../../components/settings/DocumentsTab";
import NewslettersTab from "../../components/settings/NewslettersTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  // Mock State for Toggles
  const [toggles, setToggles] = useState({
    sound: true,
    notifications: true,
    onlineStatus: true,
    statistics: true,
    messages: true,
    shareActivity: false,
    "2fa": true,
    promotions: true,
    newGames: true,
    weeklyDigest: false,
    personalizedOffers: true,
    tournamentAlerts: true,
    systemUpdates: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          Settings
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center md:items-start items-center bg-[#59168B66] w-fit px-2 py-1 rounded-3xl gap-2 mb-8">
        {["General", "Security", "Avatar", "Documents", "Newsletters"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white shadow-[0_0_15px_rgba(152,16,250,0.4)]"
                  : "text-[#E9D4FF] hover:text-white"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === "General" && (
          <GeneralTab toggles={toggles} handleToggle={handleToggle} />
        )}
        {activeTab === "Security" && (
          <SecurityTab toggles={toggles} handleToggle={handleToggle} />
        )}
        {activeTab === "Avatar" && <AvatarTab />}
        {activeTab === "Documents" && <DocumentsTab />}
        {activeTab === "Newsletters" && (
          <NewslettersTab toggles={toggles} handleToggle={handleToggle} />
        )}
      </div>
    </div>
  );
}
