"use client";

import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiUpload } from "react-icons/fi";

const AddLoyaltyPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">VIP And Loyalty</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              VIP And Loyalty
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Add Loyalty Tier
            </span>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8  backdrop-blur-md">
          {/* Card Header & List Button */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <h3 className="text-white text-2xl">Add Loyalty Tier</h3>
            <Link href="/admin/loyalty/loyalty-list">
              <button className="px-8 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap">
                Loyalty list
              </button>
            </Link>
          </div>

          <form className="w-full max-w-6xl space-y-8">
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
              <label className="text-[#99A1AF] text-sm md:text-right">
                Name
              </label>
              <input
                type="text"
                placeholder="Silver"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            {/* Range */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto_1fr] items-center gap-6">
              <label className="text-[#99A1AF] text-sm md:text-right">
                Range
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
              <span className="text-white/20">-</span>
              <input
                type="text"
                placeholder="2000"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            {/* Loyalty Setting */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
              <label className="text-[#99A1AF] text-sm md:text-right">
                Loyalty Setting
              </label>
              <input
                type="text"
                placeholder="Loyalty Multiplier"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
              <label className="text-[#99A1AF] text-sm md:text-right">
                Status
              </label>
              <input
                type="text"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            {/* Thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-6 pt-4">
              <label className="text-[#99A1AF] text-sm md:text-right pt-4">
                Thumbnail
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-white text-xs hover:bg-[#1E2939DD] transition-all cursor-pointer"
                  >
                    Choose File
                  </button>
                  <span className="text-[#6A7282] text-xs">
                    No file chosen
                  </span>
                </div>
                <p className="text-[#6A7282] text-xs uppercase tracking-wider">
                  upload Thumbnail (250x250)
                </p>
                <div className="w-40 h-40 bg-[#1E293B40] border border-[#364153] rounded-xl flex items-center justify-center cursor-pointer">
                  <FiUpload className="text-[#4A5565]" size={24} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 pt-8">
              <div />
              <div>
                <button
                  type="submit"
                  className="px-12 py-3 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                >
                  Add Loyalty
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddLoyaltyPage;
