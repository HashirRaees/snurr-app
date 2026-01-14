"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiCopy, FiPrinter, FiEdit3, FiTrash2 } from "react-icons/fi";

const LanguageRowsListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const rows = [
    {
      id: 3,
      langCode: "id",
      key: "nav_menu_link1",
      original: "Home",
      translated: "Home",
      status: "Active",
    },
    {
      id: 4,
      langCode: "id",
      key: "nav_menu_link2",
      original: "Games",
      translated: "OYUNLARI",
      status: "Active",
    },
    {
      id: 6,
      langCode: "id",
      key: "nav_menu_link3",
      original: "SUPPORT",
      translated: "DESTEK",
      status: "Active",
    },
    {
      id: 7,
      langCode: "id",
      key: "nav_menu_link4",
      original: "PROMOTIONS",
      translated: "TANIMLAR",
      status: "Active",
    },
    {
      id: 8,
      langCode: "id",
      key: "nav_menu_link5",
      original: "INFO",
      translated: "INFO",
      status: "Active",
    },
    {
      id: 9,
      langCode: "id",
      key: "nav_menu_btn1",
      original: "Login",
      translated: "LOGIN",
      status: "Active",
    },
    {
      id: 10,
      langCode: "id",
      key: "nav_menu_btn2",
      original: "SIGN UP",
      translated: "YAZILIM",
      status: "Active",
    },
    {
      id: 11,
      langCode: "id",
      key: "banner_paragraph1",
      original: "PROPERSIX CASINO HAS...",
      translated: "PROPERSIX CASINO-da...",
      status: "Active",
    },
    {
      id: 12,
      langCode: "id",
      key: "banner_heading2",
      original: "SIGN UP NOW AND BECO...",
      translated: "İNDİ OLUN və PROPERS...",
      status: "Active",
    },
    {
      id: 13,
      langCode: "id",
      key: "game_heading",
      original: "OUR GAMES",
      translated: "OYUNLARIMIZ",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Languages</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Languages
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              List
            </span>
          </div>
        </div>

        {/* List Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Card Header & Button */}
          <div className="md:p-8 p-5 mb-3 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#1E293980]">
            <h3 className="text-white text-2xl">Language rows list</h3>
            <div>
              <Link href="/admin/language/add-row">
                <button className="px-8 py-3 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap">
                  Add New
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
                <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[12px] tracking-widest whitespace-nowrap uppercase">
                  <th className="px-6 py-5 font-normal">ID</th>
                  <th className="px-6 py-5 font-normal">
                    LANG
                    <br />
                    CODE
                  </th>
                  <th className="px-6 py-5 font-normal">KEY</th>
                  <th className="px-6 py-5 font-normal">ORIGINAL TEXT</th>
                  <th className="px-6 py-5 font-normal">TRANSLATED TEXT</th>
                  <th className="px-4 py-5 font-normal w-24 text-center">
                    STATUS
                  </th>
                  <th className="px-4 py-5 font-normal w-32 text-right">
                    MANAGE
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {rows.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                  >
                    <td className="px-6 py-5 text-sm text-white font-normal">
                      {item.id}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#D1D5DC] font-normal">
                      {item.langCode}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#D1D5DC] font-normal">
                      {item.key}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#D1D5DC] font-normal">
                      {item.original}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#D1D5DC] font-normal">
                      {item.translated}
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="px-4 py-2 rounded-lg text-xs tracking-wider bg-[#155DFC] text-white shadow-[0_0_10px_rgba(45,127,255,0.3)] inline-block font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
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
              <p className="text-[#98A2B3] text-sm font-normal">
                Showing <span className="text-white">1</span> to{" "}
                <span className="text-white">10</span> of{" "}
                <span className="text-white">237</span> entries
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

export default LanguageRowsListPage;
