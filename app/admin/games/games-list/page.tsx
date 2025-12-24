"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import { FiEye, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";

// Mock data for games
const gamesData = [
  {
    id: 85,
    name: "BlackJack321",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 84,
    name: "Pyramid Infinity Slots",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 83,
    name: "Caribbean Stud Poker",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 82,
    name: "bingo",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 81,
    name: "Dubai Dreams",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 80,
    name: "Gems Blitz",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 79,
    name: "Billionaire Puerto Blanco",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 78,
    name: "Baccarat",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
  {
    id: 77,
    name: "Laki slots",
    category: "Black Jack",
    mode: "Both",
    status: "Enable",
  },
];

export const GamesList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-white text-2xl">Games Management</h2>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
          <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
            Games Management
          </span>
          <span className="text-white/20">/</span>
          <span className="capitalize">All Games List</span>
        </div>
      </div>

      {/* List Container Card */}
      <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
        <div className="px-8 pt-10 pb-3 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E293980]">
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            All games list
          </h3>
          <Link
            href="/admin/games/add"
            className="px-6 py-2.5 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
          >
            Add new game
          </Link>
        </div>

        <div className="overflow-x-auto min-h-[150px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                <th className="px-6 py-4">ORDER NO.</th>
                <th className="px-6 py-4">THUMBNAIL</th>
                <th className="px-6 py-4">GAME NAME</th>
                <th className="px-6 py-4">CATEGORY</th>
                <th className="px-6 py-4">MODE</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right">MANAGE</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {gamesData.map((game, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                    {game.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-20 h-12 rounded bg-[linear-gradient(135deg,#F54900_0%,#E7000B_50%,#D08700_100%)] shadow-sm"></div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                    {game.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                    {game.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                    {game.mode}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                    {game.status}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-[#1E2939] border border-[#364153] text-[#99A1AF] hover:text-white transition-all cursor-pointer">
                        <FiEye size={14} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2D7FFF] border border-[#2D7FFF20] text-white hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                        <FiEdit3 size={14} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded bg-[#E7000B] border border-[#E7000B20] text-white hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                        <FiTrash2 size={14} />
                      </button>
                      <button className="px-3 py-1.5 rounded bg-[#2D7FFF] text-white text-[10px] font-medium hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                        Order
                      </button>
                      <button className="px-3 py-1.5 rounded bg-[#00A63E] text-white text-[10px] font-medium hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,166,62,0.3)]">
                        Play
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
          <p className="text-[#99A1AF] text-xs">Showing 1 to 9 of 9 entries</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
              Previous
            </button>
            <button className="w-8 h-8 bg-[#2D7FFF] rounded text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)] cursor-pointer">
              1
            </button>
            <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GamesListPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />
      <main className="mx-auto px-5 md:px-20 py-8">
        <GamesList />
      </main>
    </div>
  );
};

export default GamesListPage;
