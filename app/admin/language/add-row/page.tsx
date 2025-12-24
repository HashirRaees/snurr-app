"use client";

import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";

const AddLanguageRowPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Language Rows</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Language Settings
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Language Rows
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Card Header */}
          <div className="md:p-8 p-5 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1E293980]">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Add New Language Row
            </h3>
            <button className="px-6 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
              Add New
            </button>
          </div>

          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Language */}
              <div className="grid md:grid-cols-[150px_1fr] gap-6 items-center">
                <label className="text-[#99A1AF] text-left md:pr-4 text-sm">
                  Language :
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293980] border border-[#364153] rounded-xl px-4 h-12 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>

              {/* Key */}
              <div className="grid md:grid-cols-[150px_1fr] gap-6 items-center">
                <label className="text-[#99A1AF] text-left md:pr-4 text-sm">
                  Key :
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293980] border border-[#364153] rounded-xl px-4 h-12 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>

              {/* Original Text */}
              <div className="grid md:grid-cols-[150px_1fr] gap-6 items-start">
                <label className="text-[#99A1AF] text-left md:pr-4 text-sm pt-3">
                  Original Text :
                </label>
                <textarea className="w-full bg-[#1E293980] border border-[#364153] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all h-32 resize-none" />
              </div>

              {/* Translated Text */}
              <div className="grid md:grid-cols-[150px_1fr] gap-6 items-start">
                <label className="text-[#99A1AF] text-left md:pr-4 text-sm pt-3">
                  Translated Text :
                </label>
                <textarea className="w-full bg-[#1E293980] border border-[#364153] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all h-32 resize-none" />
              </div>

              {/* Status */}
              <div className="grid md:grid-cols-[150px_1fr] gap-6 items-center">
                <label className="text-[#99A1AF] text-left md:pr-4 text-sm">
                  Status :
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293980] border border-[#364153] rounded-xl px-4 h-12 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <button className="px-12 py-3 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddLanguageRowPage;
