"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiCopy, FiPrinter, FiEdit3, FiTrash2, FiEye } from "react-icons/fi";

const UserMissionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Missions</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Missions
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              User Mission List
            </span>
          </div>
        </div>

        {/* List Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Card Header & Add Button */}
          <div className="md:p-8 p-5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-white text-2xl">User Mission List</h3>
            <div className="flex gap-3">
              <Link href="/admin/missions">
                <button className="px-8 py-3 rounded-xl w-full bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap">
                  Mission List
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
                <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[12px] tracking-widest whitespace-nowrap">
                  <th className="px-8 py-5 font-normal uppercase">ID</th>
                  <th className="px-8 py-5 font-normal uppercase">User Name</th>
                  <th className="px-8 py-5 font-normal uppercase">Mission Name</th>
                  <th className="px-4 py-5 font-normal uppercase">
                    Spending
                  </th>
                  <th className="px-4 py-5 font-normal uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-5 font-normal uppercase">
                    Wagering Reward
                  </th>
                  <th className="px-4 py-5 font-normal uppercase ">
                    Total Spin
                  </th>
                  <th className="px-4 py-5 font-normal uppercase ">
                    Prize
                  </th>
                  <th className="px-4 py-5 font-normal uppercase ">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Single Row for Empty State Content */}
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-12 text-center text-[#99A1AF] text-sm"
                  >
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white">0</span> to{" "}
                <span className="text-white">0</span> of{" "}
                <span className="text-white">0</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 border border-[#C27AFF1A] rounded-md text-[#98A2B3] hover:text-white hover:border-[#1E2939] bg-[#1E2939] text-sm cursor-pointer disabled:opacity-50">
                  Previous
                </button>
                <button className="px-4 py-1.5 border border-[#C27AFF1A] rounded-md text-[#98A2B3] hover:text-white hover:border-[#1E2939] bg-[#1E2939] text-sm cursor-pointer whitespace-nowrap">
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

export default UserMissionPage;
