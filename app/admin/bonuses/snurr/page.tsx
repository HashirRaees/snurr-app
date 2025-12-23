"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiCopy, FiPrinter } from "react-icons/fi";

const SnurrBonusPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const snurrBonuses = [
    {
      id: "PSB001",
      user: "Sicilietis",
      name: "Bonus20",
      spin: "0",
      wagering: "0",
      type: "code",
      created: "February 23, 2021, 9:55",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB0010",
      user: "notest",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 6, 2021, 5:05",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00100",
      user: "FrankJ",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 11:06",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00101",
      user: "popeys",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 12:37",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00102",
      user: "frankpropersix",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 12:56",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00103",
      user: "Stonya",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 1:16",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00104",
      user: "cecilia",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 1:26",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00105",
      user: "alenad00789",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 2:28",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00106",
      user: "mildred235444",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 2:42",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
    {
      id: "PSB00107",
      user: "lindad29",
      name: "spin wheel bonus 50fs",
      spin: "50",
      wagering: "0",
      type: "registration",
      created: "May 19, 2021, 2:55",
      expiry: "January 1, 1970, 12:00",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors">
            Bonuses
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors">
            Add Bonus
          </span>
        </div>

        {/* Card Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10">
          <h2 className="text-white text-2xl">Bonuses And Codes</h2>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Section Title */}
          <div className="md:p-8 p-5 pt-10 text-center">
            <h3 className="text-white text-2xl tracking-tight">
              Bonus Snurr List
            </h3>
          </div>

          {/* Controls Row */}
          <div className="md:px-8 px-5 pb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={16} /> Copy
              </button>
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiPrinter size={16} /> Print
              </button>
            </div>
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search:"
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-md py-2 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[12px] tracking-widest whitespace-nowrap">
                  <th className="px-6 py-5">
                    ID <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    USER NAME <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    BONUS NAME <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    FREE SPIN <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    WAGERING REQ <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    TYPE <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    CREATED DATE <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    EXPIRY DATE <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">
                    STATUS <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {snurrBonuses.map((bonus, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                  >
                    <td className="px-6 py-5 text-xs text-[#DAB2FF]">
                      {bonus.id}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.user}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.name}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.spin}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.wagering}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.type}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.created}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.expiry}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="px-3 py-2 rounded-lg text-[10px] tracking-wider bg-[#155DFC] text-white shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                        {bonus.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white">1</span> to{" "}
                <span className="text-white">10</span> of{" "}
                <span className="text-white">480</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm cursor-pointer disabled:opacity-50">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white text-xs cursor-pointer">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#1E2939] text-white text-xs hover:bg-[#36415360] cursor-pointer transition-all">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#1E2939] text-white text-xs hover:bg-[#36415360] cursor-pointer transition-all">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#1E2939] text-white text-xs hover:bg-[#36415360] cursor-pointer transition-all">
                    4
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#1E2939] text-white text-xs hover:bg-[#36415360] cursor-pointer transition-all">
                    5
                  </button>
                  <span className="text-[#99A1AF] px-1 text-xs">...</span>
                  <button className="w-8 h-8 rounded-lg bg-[#1E2939] text-white text-xs hover:bg-[#36415360] cursor-pointer transition-all">
                    48
                  </button>
                </div>
                <button className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm cursor-pointer whitespace-nowrap">
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

export default SnurrBonusPage;
