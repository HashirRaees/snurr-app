"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiCopy, FiPrinter, FiPlus, FiTrash2 } from "react-icons/fi";
import axiosInstance from "@/lib/axios";

interface Bonus {
  id: number;
  bonus_name: string;
  deposit_method: string | null;
  min_loss: string | number | null;
  bonus_code: string;
  type: string;
  bonus_amount: number | null;
  free_spin: number;
  game: string | null;
  bet_size: number;
  lines: number;
  wagering_req: number;
  from_field: string;
  till: string;
  specific_day: string | null;
  recurring: string | null;
  w_2: string | null;
  ex_country: string | null;
  aff_source: string | null;
  status: boolean;
  percent_amount: number | null;
  max_amount: number | null;
  chained: string | null;
  ex_chain: string | null;
  users: string | null;
  vip_level: string | null;
  created_at: string;
  updated_at: string;
}

const BonusesCodesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/bonuses/propersix-bonuses/"
        );
        // Ensure we handle array or wrapped responses
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];
        setBonuses(data);
      } catch (error) {
        console.error("Error fetching bonuses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBonuses();
  }, []);

  const filteredBonuses = bonuses.filter(
    (bonus) =>
      bonus.bonus_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bonus.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-48 text-white">
                Loading Bonuses...
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border bg-[#1E29394D] border-[#1E293980] text-[#99A1AF] text-[11px]   tracking-widest whitespace-nowrap">
                    <th className="px-6 py-5">
                      ID <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      NAME <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      DEPOSIT METHOD <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      MIN LOSS <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5 text-[#C27AFF]">
                      BONUS CODE <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      TYPE <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      BONUS AMT <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      FREE SPIN <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      GAME <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      BET SIZE <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      LINES <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      WAGERING <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      VALID FROM <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      VALID TILL <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      DAY <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      RECURRING <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      W2 <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      EX COUNTRY <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      AFF SOURCE <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      STATUS <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      PERCENT AMT <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      MAX AMT <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      CHAINED <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      EX CHAIN <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      USERS <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      VIP LEVEL <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      CREATED AT <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5">
                      UPDATED AT <span className="ml-1 text-xs">⇅</span>
                    </th>
                    <th className="px-6 py-5 text-right whitespace-nowrap">
                      ACTION <span className="ml-1 text-xs">⇅</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {filteredBonuses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={28}
                        className="text-center py-10 text-white/50"
                      >
                        No bonuses found
                      </td>
                    </tr>
                  ) : (
                    filteredBonuses.map((bonus, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                      >
                        <td className="px-6 py-5 text-xs text-[#DAB2FF]">
                          {bonus.id}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC] ">
                          {bonus.bonus_name}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.deposit_method || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.min_loss || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#C27AFF]">
                          {bonus.bonus_code || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.type}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.bonus_amount}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.free_spin}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.game || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.bet_size}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.lines}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.wagering_req}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.from_field
                            ? new Date(bonus.from_field).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.till
                            ? new Date(bonus.till).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.specific_day || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.recurring || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.w_2 || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.ex_country || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.aff_source || "-"}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-2 rounded-lg text-xs   tracking-wider ${
                              bonus.status
                                ? "bg-[#155DFC] text--white shadow-[0_0_10px_rgba(45,127,255,0.3)]"
                                : "bg-[#E7000B] text--white shadow-[0_0_10px_rgba(255,31,31,0.3)]"
                            }`}
                          >
                            {bonus.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.percent_amount || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.max_amount || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.chained || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.ex_chain || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.users || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.vip_level || "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.created_at
                            ? new Date(bonus.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-5 text-xs text-[#D1D5DC]">
                          {bonus.updated_at
                            ? new Date(bonus.updated_at).toLocaleDateString()
                            : "-"}
                        </td>

                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 rounded-lg bg-[#E7000B] text-white flex items-center justify-center hover:bg-[#FF1F1FEE] transition-all cursor-pointer shadow-[0_0_10px_rgba(255,31,31,0.4)]">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing{" "}
                <span className="text-white ">
                  {filteredBonuses.length > 0 ? 1 : 0}
                </span>{" "}
                to <span className="text-white ">{filteredBonuses.length}</span>{" "}
                of <span className="text-white ">{filteredBonuses.length}</span>{" "}
                entries
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
