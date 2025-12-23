"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiCopy, FiPrinter, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

const BonusesCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const bonuses = [
    {
      id: "PSB001",
      name: "Bonus20",
      token: "500",
      spin: "0",
      wagering: "0",
      type: "code",
      date: "February 23, 2021, 2:31",
      bonusCode: "bonus20",
      status: "Active",
    },
    {
      id: "PSB0012",
      name: "2022free50",
      token: "50",
      spin: "5",
      wagering: "0",
      type: "code",
      date: "February 22, 2022, 12:13",
      bonusCode: "2022free50",
      status: "Active",
    },
    {
      id: "PSB0013",
      name: "Happy500",
      token: "500",
      spin: "0",
      wagering: "0",
      type: "code",
      date: "February 22, 2022, 12:14",
      bonusCode: "Happy500",
      status: "Active",
    },
    {
      id: "PSB0014",
      name: "Testing",
      token: "100",
      spin: "100",
      wagering: "0",
      type: "code",
      date: "February 22, 2022, 12:16",
      bonusCode: "Testing2122",
      status: "Active",
    },
    {
      id: "PSB0015",
      name: "Bonus3000",
      token: "20",
      spin: "0",
      wagering: "0",
      type: "login",
      date: "May 1, 2022, 3:59",
      bonusCode: "-",
      status: "Active",
    },
    {
      id: "PSB0017",
      name: "Peter",
      token: "500",
      spin: "100",
      wagering: "0",
      type: "registration",
      date: "December 26, 2023, 9:41",
      bonusCode: "-",
      status: "Inactive",
    },
    {
      id: "PSB0018",
      name: "Peter1000",
      token: "1000",
      spin: "1000",
      wagering: "0",
      type: "registration",
      date: "December 26, 2023, 9:43",
      bonusCode: "-",
      status: "Active",
    },
    {
      id: "PSB0019",
      name: "Peter10002",
      token: "1000",
      spin: "1000",
      wagering: "1000",
      type: "code",
      date: "December 26, 2023, 9:46",
      bonusCode: "Peter10002",
      status: "Active",
    },
    {
      id: "PSB003",
      name: "Bonus500",
      token: "500",
      spin: "0",
      wagering: "0",
      type: "code",
      date: "March 18, 2021, 11:06",
      bonusCode: "bonus500",
      status: "Active",
    },
    {
      id: "PSB004",
      name: "Bonus1000",
      token: "500",
      spin: "0",
      wagering: "0",
      type: "code",
      date: "March 19, 2021, 2:23",
      bonusCode: "bonus1000",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors ">
            Bonuses
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors ">
            Add Bonus
          </span>
        </div>

        {/* Card Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10">
          <h2 className="text-white text-2xl ">Bonuses And Codes</h2>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Section Title & Add Button */}
          <div className="md:p-8 p-5 pt-10 flex flex-col md:flex-row items-center justify-between relative gap-6">
            <div className="flex-1 text-center">
              <h3 className="text-white text-2xl tracking-tight">
                Bonus Codes List
              </h3>
            </div>
            <div className="absolute right-8 top-10 flex gap-4">
              <Link href="/admin/bonuses">
                <button className="px-8 py-3 rounded-xl bg-[#2D7FFF] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#2D7FFFEE] transition-all cursor-pointer shadow-[0_0_20px_rgba(45,127,255,0.5)]">
                  Add Bonus
                </button>
              </Link>
            </div>
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
                <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[11px]   tracking-widest whitespace-nowrap">
                  <th className="px-6 py-5">
                    ID <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    BONUS NAME <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    FREE TOKEN <span className="ml-1 text-[10px]">⇅</span>
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
                  <th className="px-6 py-5 text-[#C27AFF]">
                    BONUS CODE <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5">
                    STATUS <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">
                    ACTION <span className="ml-1 text-[10px]">⇅</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                {bonuses.map((bonus, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                  >
                    <td className="px-6 py-5 text-xs text-[#DAB2FF]">
                      {bonus.id}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC] ">
                      {bonus.name}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                      {bonus.token}
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
                      {bonus.date}
                    </td>
                    <td className="px-6 py-5 text-xs text-[#C27AFF]">
                      {bonus.bonusCode}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-2 rounded-lg text-[10px]   tracking-wider ${
                          bonus.status === "Active"
                            ? "bg-[#155DFC] text--white shadow-[0_0_10px_rgba(45,127,255,0.3)]"
                            : "bg-[#E7000B] text--white shadow-[0_0_10px_rgba(255,31,31,0.3)]"
                        }`}
                      >
                        {bonus.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-[#364153] text-[#D1D5DC] flex items-center justify-center hover:bg-[#36415360] transition-all cursor-pointer">
                          <MdBlock size={18} />
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-[#E7000B] text-white flex items-center justify-center hover:bg-[#FF1F1FEE] transition-all cursor-pointer shadow-[0_0_10px_rgba(255,31,31,0.4)]">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white ">1</span> to{" "}
                <span className="text-white ">10</span> of{" "}
                <span className="text-white ">13</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm cursor-pointer disabled:opacity-50">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-[#2D7FFF] text-white text-xs  cursor-pointer">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#36415340] text-white text-xs  hover:bg-[#36415360] cursor-pointer transition-all">
                    2
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

export default BonusesCodesPage;
