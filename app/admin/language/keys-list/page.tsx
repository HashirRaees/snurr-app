"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiCopy, FiPrinter, FiEdit3 } from "react-icons/fi";

const LanguageKeysListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const keys = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    key:
      i % 2 === 0
        ? `nav_menu_link${Math.floor(i / 2) + 1}`
        : `banner_heading${i}`,
    status: "Active",
    createdAt: "2021-04-14",
  })).map((k, i) => {
    // Manual override to match image strictly if needed, but algorithmic generation is fine for mock
    const mockKeys = [
      "nav_menu_link1",
      "nav_menu_link2",
      "nav_menu_link3",
      "nav_menu_link4",
      "nav_menu_link5",
      "nav_menu_btn1",
      "nav_menu_btn2",
      "banner_heading1",
      "banner_btn1",
      "banner_paragraph1",
    ];
    const mockDates = [
      "2021-04-14",
      "2021-04-14",
      "2021-04-15",
      "2021-04-15",
      "2021-04-15",
      "2021-06-17",
      "2021-06-17",
      "2021-06-17",
      "2021-06-17",
      "2021-06-17",
    ];
    return { ...k, key: mockKeys[i], createdAt: mockDates[i] };
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Language Keys</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Language
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Keys List
            </span>
          </div>
        </div>

        {/* List Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Card Header & Buttons */}
          <div className="md:p-8 p-5 mb-3 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1E293980]">
            <h3 className="text-white text-xl md:text-2xl">Language Keys list</h3>
            <div className="flex gap-3">
              <Link href="/admin/language/language-rows">
                <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#9810FA] text-white text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
                  Language Rows
                </button>
              </Link>
              <Link href="/admin/language/add-key">
                <button className="px-8 py-3 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap">
                  Add New Key
                </button>
              </Link>
            </div>
          </div>

          {/* Controls Row */}
          <div className="px-8 pb-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={16} /> Copy
              </button>
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
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
                  <th className="px-8 py-5 font-normal">ID</th>
                  <th className="px-8 py-5 font-normal w-full">KEY</th>
                  <th className="px-4 py-5 font-normal text-right">STATUS</th>
                  <th className="px-4 py-5 font-normal text-right">
                    CREATED AT
                  </th>
                  <th className="px-4 py-5 font-normal text-right">MANAGE</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {keys.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                  >
                    <td className="px-8 py-5 text-sm text-white font-normal">
                      {item.id}
                    </td>
                    <td className="px-8 py-5 text-sm text-[#D1D5DC] font-normal">
                      {item.key}
                    </td>
                    <td className="px-4 py-5 text-right">
                      <span className="px-4 py-2 rounded-lg text-xs tracking-wider bg-[#155DFC] text-white shadow-[0_0_10px_rgba(45,127,255,0.3)] inline-block  font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-sm text-[#D1D5DC] font-normal text-right">
                      {item.createdAt}
                    </td>
                    <td className="px-4 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                          <FiEdit3 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm font-normal">
                Showing <span className="text-white">1</span> to{" "}
                <span className="text-white">10</span> of{" "}
                <span className="text-white">231</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#C27AFF1A] rounded text-[#98A2B3] text-xs hover:text-white transition-all">
                  Previous
                </button>
                <button className="w-8 h-8 bg-[#2D7FFF] rounded text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                  1
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#98A2B3] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all">
                  2
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#98A2B3] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all">
                  3
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#98A2B3] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all">
                  4
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#98A2B3] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all">
                  5
                </button>
                <span className="text-[#98A2B3] text-xs px-1">...</span>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#98A2B3] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all">
                  30
                </button>
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#C27AFF1A] rounded text-[#98A2B3] text-xs hover:text-white transition-all">
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

export default LanguageKeysListPage;
