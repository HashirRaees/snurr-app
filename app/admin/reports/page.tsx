"use client";

import React from "react";
import Navbar from "@/components/admin/Navbar";
import { FiDownload } from "react-icons/fi";

const reportsData = [
  { user: "hanawhitman", to: "casino", type: "BTC", amount: "27" },
  { user: "Casino", to: "Roulette", type: "admin", amount: "30" },
  { user: "Casino", to: "mickie", type: "admin", amount: "30" },
  { user: "Casino", to: "Sergio Zanko", type: "admin", amount: "100" },
  { user: "gamerturtle", to: "casino", type: "BTC", amount: "10" },
  { user: "MUHAMMAD HAROON", to: "casino", type: "access", amount: "12" },
  { user: "MUHAMMAD HAROON", to: "casino", type: "access", amount: "34" },
  { user: "MUHAMMAD HAROON", to: "casino", type: "access", amount: "15" },
  { user: "Reginne", to: "casino", type: "access", amount: "10" },
  { user: "Therese Johansson", to: "casino", type: "access", amount: "10" },
];

const ReportsPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl font-normal">Reports</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Reports
            </span>
            <span className="text-white/20">/</span>
            <span className="capitalize">Deposits Report</span>
          </div>
        </div>

        {/* Report Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          <div className="px-8 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              Deposits Report
            </h3>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[linear-gradient(90deg,#00A63E_0%,#008030_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]">
              <FiDownload size={18} />
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                  <th className="px-8 py-4">USER</th>
                  <th className="px-8 py-4">TO</th>
                  <th className="px-8 py-4">TYPE</th>
                  <th className="px-8 py-4">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {reportsData.map((report, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                  >
                    <td className="px-8 py-4 text-sm text-[#2D7FFF] cursor-pointer hover:underline">
                      {report.user}
                    </td>
                    <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                      {report.to}
                    </td>
                    <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                      {report.type}
                    </td>
                    <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                      {report.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Stats */}
          <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
            <div className="text-[#99A1AF] text-xs space-y-1">
              <p>Total Records:</p>
              <p className="text-white text-sm">10</p>
            </div>
            <div className="text-right">
              <p className="text-[#99A1AF] text-xs">Total Amount: 278</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
