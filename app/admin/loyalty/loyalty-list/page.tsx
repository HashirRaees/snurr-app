"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiCopy, FiPrinter, FiEdit3, FiTrash2, FiEye } from "react-icons/fi";

const LoyaltyListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tiers = [
    {
      id: "LY001",
      name: "Gold",
      range: "10000 - 200000000",
      status: "Active",
      type: "gold",
    },
    {
      id: "LY002",
      name: "Silver",
      range: "2000 - 9999",
      status: "Active",
      type: "silver",
    },
  ];

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
              Loyalty List
            </span>
          </div>
        </div>

        {/* List Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Card Header & Add Button */}
          <div className="md:p-8 p-5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-white text-2xl">All Loyalty list</h3>
            <Link href="/admin/loyalty/add-loyalty">
              <button className="px-8 py-3 rounded-xl w-full bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap">
                Add New Loyalty Tier
              </button>
            </Link>
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
                  <th className="px-8 py-5 font-normal uppercase">ID</th>
                  <th className="px-8 py-5 font-normal uppercase">NAME</th>
                  <th className="px-8 py-5 font-normal uppercase">RANGE</th>
                  <th className="px-4 py-5 font-normal uppercase text-center w-24">
                    THUMBNAIL
                  </th>
                  <th className="px-4 py-5 font-normal uppercase text-center w-24">
                    STATUS
                  </th>
                  <th className="px-4 py-5 font-normal uppercase text-right w-40">
                    MANAGE
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {tiers.map((tier, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                  >
                    <td className="px-8 py-5 text-sm text-white">{tier.id}</td>
                    <td className="px-8 py-5 text-sm text-[#C27AFF]">
                      {tier.name}
                    </td>
                    <td className="px-8 py-5 text-sm text-[#D1D5DC]">
                      {tier.range}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-lg bg-[#1E2939] flex items-center justify-center overflow-hidden">
                          <Image
                            src={
                              tier.type === "gold"
                                ? "/assets/cup2.png"
                                : "/assets/medal2.png"
                            }
                            width={10}
                            height={10}
                            alt={tier.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className="px-4 py-2 rounded-lg text-xs tracking-wider bg-[#155DFC] text-white shadow-[0_0_10px_rgba(45,127,255,0.3)] inline-block">
                        {tier.status}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-[#155DFC] text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(21,93,252,0.3)]">
                          <FiEye size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#00A63E] text-white flex items-center justify-center hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(40,199,111,0.3)]">
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
                <span className="text-white">2</span> of{" "}
                <span className="text-white">2</span> entries
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

export default LoyaltyListPage;
