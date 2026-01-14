"use client";

import { useState } from "react";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiCopy, FiPrinter, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";

const LoyaltyGeneralSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const settings = [{ id: "1", game: "Lab Slots", rate: "5/10" }];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="mb-10 px-1">
          <h2 className="text-white text-3xl mb-4">Loyalty General Settings</h2>

          {/* Breadcrumb */}
          <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-4 flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Loyalty General Settings
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              General Settings
            </span>
          </div>
        </div>

        {/* Add New Setting Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 mb-10 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] items-end gap-6">
            <div className="space-y-3">
              <label className="text-[#D1D5DC] text-sm block">Game</label>
              <input
                type="text"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[#D1D5DC] text-sm block">rate</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-4 pr-12 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
                <FiSearch
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
              </div>
            </div>

            <button className="px-10 h-12 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
              Add
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          <div className="md:p-8 p-5">
            <h3 className="text-white text-xl font-medium">General Settings</h3>
          </div>

          {/* Controls Row */}
          <div className="px-8 pb-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={16} /> Copy
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiPrinter size={16} /> Print
              </button>
            </div>
            <div className="relative w-full max-w-sm flex items-center gap-3">
              <span className="text-[#99A1AF] text-sm whitespace-nowrap">
                Search:
              </span>
              <input
                type="text"
                className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[12px] tracking-widest whitespace-nowrap">
                  <th className="px-8 py-5 font-normal uppercase">ID</th>
                  <th className="px-8 py-5 font-normal uppercase">GAME</th>
                  <th className="px-8 py-5 font-normal uppercase">RATE</th>
                  <th className="px-8 py-5 font-normal uppercase text-right">
                    MANAGE
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {settings.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                  >
                    <td className="px-8 py-5 text-sm text-[#DAB2FF]">
                      {item.id}
                    </td>
                    <td className="px-8 py-5 text-sm text-[#D1D5DC]">
                      {item.game}
                    </td>
                    <td className="px-8 py-5 text-sm text-[#D1D5DC]">
                      {item.rate}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white flex items-center justify-center hover:bg-[#2D7FFFDD] transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                          <FiEdit3 size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#E7000B] text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white">1</span> to{" "}
                <span className="text-white">1</span> of{" "}
                <span className="text-white">1</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 border border-[#C27AFF1A] rounded-md text-[#98A2B3] hover:text-white hover:border-[#1E2939] bg-[#1E2939] text-sm cursor-pointer disabled:opacity-50">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white text-xs cursor-pointer">
                    1
                  </button>
                </div>
                <button className="px-4 py-1.5 border border-[#C27AFF1A] rounded-md text-[#98A2B3] hover:text-white hover:border-[#1E2939] bg-[#1E2939] text-sm cursor-pointer sm:whitespace-nowrap">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoyaltyGeneralSettings;
