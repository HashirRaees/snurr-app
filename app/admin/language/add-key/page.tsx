"use client";

import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";

const LanguageAddKeyPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Language</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Language Settings
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Language Keys
            </span>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md p-8 md:p-12">
          <h3 className="text-white text-xl md:text-2xl mb-8 pb-6 border-b border-[#1E293980]">
            Language Keys Settings
          </h3>

          <div className="max-w-3xl mx-auto">
            {/* Key Field */}
            <div className="mb-6">
              <label className="block text-[#D1D5DC] text-sm font-normal mb-3">
                Key
              </label>
              <textarea
                placeholder="Can be separated by comma (,)"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all h-32 resize-none placeholder:text-[#6A7282]"
              />
            </div>

            {/* Status Field */}
            <div className="mb-8">
              <label className="block text-[#D1D5DC] text-sm font-normal mb-3">
                Status
              </label>
              <input
                type="text"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-lg h-12 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            {/* Add Button */}
            <button className="px-10 py-2.5 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
              Add
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LanguageAddKeyPage;
