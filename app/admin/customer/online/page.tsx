"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiUsers, FiSearch } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

const CustomerOnlinePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    "ID",
    "USERNAME",
    "NAME",
    "EMAIL",
    "DOCUMENTS VERIFIED",
    "PENDING WITHDRAW",
    "ELIGIBLE FOR BONUSES",
    "FAVORITE GAME",
    "STATUS",
    "ACTION",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Customer Online
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            List Customers
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#00C95033] rounded-2xl flex items-center justify-center text-[#05DF72]">
              <LuUsers size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl tracking-tight">
                Customer Online
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                View customers currently online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/customer/list">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer whitespace-nowrap">
                Customer List
              </button>
            </Link>
            <Link href="/admin/customer/search">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
                Customer Search
              </button>
            </Link>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Search Bar Row */}
          <div className="md:p-8 p-5 flex justify-end items-center">
            <div className="relative w-full max-w-md">
              <IoMdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Empty State Table */}
          <div className="overflow-x-auto min-h-[400px] flex flex-col justify-between">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#99A1AF] text-[11px] font-medium uppercase tracking-widest whitespace-nowrap">
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`px-8 py-5 ${
                        idx === columns.length - 1 ? "text-right" : ""
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Single Row for Empty State Content */}
                <tr>
                  <td colSpan={columns.length} className="py-32">
                    <div className="flex flex-col items-center justify-center text-center opacity-40">
                      <div className="mb-5">
                        <FiUsers size={50} className="text-[#98A2B3]" />
                      </div>
                      <p className="text-[#98A2B3] text-sm font-medium">
                        No data available in table
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white font-medium">0</span> to{" "}
                <span className="text-white font-medium">0</span> of{" "}
                <span className="text-white font-medium">0</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-6 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-6 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
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

export default CustomerOnlinePage;
