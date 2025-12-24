"use client";

import { useState } from "react";
import Navbar from "../../../components/admin/Navbar";
// import { FiSearch } from "react-icons/fi";

const FinancesPage = () => {
  const [activeTab, setActiveTab] = useState("deposits");
  const [activeSubTab, setActiveSubTab] = useState("completed");
  const [searchTerm, setSearchTerm] = useState("");

  const completedDeposits = [
    {
      id: "DEP051",
      username: "zaplukas",
      currency: "USD",
      amount: "$ 200000",
      type: "Admin",
      email: "zaplukas0@gmail.com",
      date: "2024-06-05 16:10:05",
    },
    {
      id: "DEP050",
      username: "zaplukas",
      currency: "USD",
      amount: "$ 200",
      type: "Admin",
      email: "zaplukas0@gmail.com",
      date: "2024-06-05 14:54:45",
    },
    {
      id: "DEP013",
      username: "Lament",
      currency: "ETH",
      amount: "10 ETH",
      type: "Crypto",
      email: "warmup.appoline@gmail.com",
      date: "2021-10-27 07:25:31",
    },
    {
      id: "DEP018",
      username: "incidentmbays",
      currency: "BTC",
      amount: "33 BTC",
      type: "Crypto",
      email: "incidentmbays@gmail.com",
      date: "2021-07-06 06:30:00",
    },
    {
      id: "DEP016",
      username: "mickie",
      currency: "USD",
      amount: "$ 1",
      type: "Admin",
      email: "lomas@propersix.com",
      date: "2021-06-09 19:19:27",
    },
    {
      id: "DEP015",
      username: "mickie",
      currency: "USD",
      amount: "$ 0",
      type: "Admin",
      email: "lomas@propersix.com",
      date: "2021-06-09 18:14:20",
    },
    {
      id: "DEP011",
      username: "mickie",
      currency: "USD",
      amount: "$ 100",
      type: "Admin",
      email: "lomas@Snurr.com",
      date: "2021-05-24 07:40:57",
    },
    {
      id: "DEP003",
      username: "mickie",
      currency: "USD",
      amount: "$ 30",
      type: "Admin",
      email: "lomas@snurr.com",
      date: "2021-03-04 15:14:26",
    },
    {
      id: "DEP089",
      username: "Balle",
      currency: "USD",
      amount: "$ 200",
      type: "Admin",
      email: "tifm@gmail.com",
      date: "2023-08-09 13:54:44",
    },
    {
      id: "DEP056",
      username: "Blund94",
      currency: "USD",
      amount: "$ 100000",
      type: "Admin",
      email: "HBlund@gmail.com",
    },
  ];

  const pendingDeposits = [
    {
      id: "DEP122",
      username: "johndoe",
      currency: "USD",
      amount: "$ 500",
      type: "Admin",
      email: "johndoe@gmail.com",
      date: "2024-12-18 10:30:00",
    },
    {
      id: "DEP123",
      username: "janedoe",
      currency: "ETH",
      amount: "2 ETH",
      type: "Crypto",
      email: "janedoe@gmail.com",
      date: "2024-12-18 11:45:00",
    },
  ];

  const withdrawals = [
    {
      id: "WDR101",
      username: "zaplukas",
      currency: "USD",
      amount: "$ 5000",
      type: "Admin",
      email: "zaplukas0@gmail.com",
      status: "Approved",
      date: "2024-06-10 14:20:15",
    },
    {
      id: "WDR102",
      username: "Lament",
      currency: "ETH",
      amount: "5 ETH",
      type: "Crypto",
      email: "warmup.appoline@gmail.com",
      status: "Pending",
      date: "2024-06-11 09:15:30",
    },
    {
      id: "WDR103",
      username: "mickie",
      currency: "USD",
      amount: "$ 250",
      type: "Admin",
      email: "lomas@propersix.com",
      status: "Approved",
      date: "2024-06-12 16:45:00",
    },
    {
      id: "WDR104",
      username: "Balle",
      currency: "USD",
      amount: "$ 1000",
      type: "Admin",
      email: "tifm@gmail.com",
      status: "Rejected",
      date: "2024-06-13 11:30:22",
    },
    {
      id: "WDR105",
      username: "incidentmbays",
      currency: "BTC",
      amount: "2 BTC",
      type: "Crypto",
      email: "incidentmbays@gmail.com",
      status: "Pending",
      date: "2024-06-14 08:12:45",
    },
    {
      id: "WDR106",
      username: "johndoe",
      currency: "USD",
      amount: "$ 750",
      type: "Admin",
      email: "johndoe@gmail.com",
      status: "Approved",
      date: "2024-06-15 13:25:10",
    },
    {
      id: "WDR107",
      username: "Blund94",
      currency: "USD",
      amount: "$ 15000",
      type: "Admin",
      email: "HBlund@gmail.com",
      status: "Pending",
      date: "2024-06-16 10:05:33",
    },
    {
      id: "WDR108",
      username: "janedoe",
      currency: "ETH",
      amount: "1.5 ETH",
      type: "Crypto",
      email: "janedoe@gmail.com",
      status: "Approved",
      date: "2024-06-17 15:50:21",
    },
  ];

  const currentData =
    activeSubTab === "completed" ? completedDeposits : pendingDeposits;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#00A63E] shadow-[0_0_10px_rgba(0,166,62,0.3)]";
      case "Pending":
        return "bg-[#D08700] shadow-[0_0_10px_rgba(208,135,0,0.3)]";
      case "Rejected":
        return "bg-[#E7000B] shadow-[0_0_10px_rgba(231,0,11,0.3)]";
      default:
        return "bg-[#1E2939]";
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Finances</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Finances
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors capitalize">
              {activeTab.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Level 1 Tabs Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-xl p-4 mb-8 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab("deposits")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "deposits"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Deposits
            </button>
            <button
              onClick={() => setActiveTab("withdrawals")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "withdrawals"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Withdrawals
            </button>
            <button
              onClick={() => setActiveTab("affiliate_withdrawals")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "affiliate_withdrawals"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Affiliate Withdrawals
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "deposits" && (
          <div className="space-y-8">
            {/* List Container Card */}
            <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
              {/* Level 2 Tabs (Inside Card) */}
              <div className="px-8 pt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveSubTab("completed")}
                  className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeSubTab === "completed"
                      ? "bg-[#D08700] text-white shadow-[0_4px_15px_rgba(208,135,0,0.4)]"
                      : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
                  }`}
                >
                  Completed Deposits
                </button>
                <button
                  onClick={() => setActiveSubTab("pending")}
                  className={`px-8 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeSubTab === "pending"
                      ? "bg-[#D08700] text-white shadow-[0_4px_15px_rgba(208,135,0,0.4)]"
                      : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
                  }`}
                >
                  Pending Deposits
                </button>
              </div>

              <h3 className="text-white text-xl text-center py-8 font-semibold tracking-wide capitalize">
                {activeSubTab} Deposits
              </h3>

              {/* Controls Row */}
              <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-[#99A1AF] text-sm">
                  Show
                  <div className="relative">
                    <select className="appearance-none bg-[#1E2939] border border-[#364153] rounded px-3 py-1 pr-8 text-white focus:outline-none focus:border-[#AD46FF] cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  entries
                </div>

                <div className="relative w-full max-w-xs flex items-center gap-3">
                  <span className="text-[#99A1AF] text-sm whitespace-nowrap">
                    Search:
                  </span>
                  <input
                    type="text"
                    className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-9 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto min-h-[150px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">USERNAME</th>
                      <th className="px-6 py-4">CURRENCY</th>
                      <th className="px-6 py-4">AMOUNT</th>
                      <th className="px-6 py-4">TYPE</th>
                      <th className="px-6 py-4">EMAIL</th>
                      <th className="px-6 py-4">DATE</th>
                      <th className="px-6 py-4 text-right">MANAGE</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {currentData.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-white font-normal uppercase">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                          {item.username}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2D7FFF]">
                          {item.currency}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                          {item.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2D7FFF]">
                          {item.type}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end">
                            <button className="px-4 py-1.5 rounded-md bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-xs font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                              View
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
                <p className="text-[#99A1AF] text-xs">
                  Showing 1 to {currentData.length} of 55 entries
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                    Previous
                  </button>
                  <button className="w-8 h-8 bg-[#2D7FFF] rounded text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)] cursor-pointer">
                    1
                  </button>
                  <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                    2
                  </button>
                  <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                    3
                  </button>
                  <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                    4
                  </button>
                  <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                    5
                  </button>
                  <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                    6
                  </button>
                  <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawals Content */}
        {activeTab === "withdrawals" && (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <h3 className="text-white text-xl text-center py-8 font-semibold tracking-wide capitalize">
              Withdrawals
            </h3>

            {/* Controls Row */}
            <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[#99A1AF] text-sm">
                Show
                <div className="relative">
                  <select className="appearance-none bg-[#1E2939] border border-[#364153] rounded px-3 py-1 pr-8 text-white focus:outline-none focus:border-[#AD46FF] cursor-pointer">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
                entries
              </div>

              <div className="relative w-full max-w-xs flex items-center gap-3">
                <span className="text-[#99A1AF] text-sm whitespace-nowrap">
                  Search:
                </span>
                <input
                  type="text"
                  className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-9 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">USERNAME</th>
                    <th className="px-6 py-4">CURRENCY</th>
                    <th className="px-6 py-4">AMOUNT</th>
                    <th className="px-6 py-4">TYPE</th>
                    <th className="px-6 py-4">EMAIL</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">DATE</th>
                    <th className="px-6 py-4 text-right">MANAGE</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {withdrawals.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white font-normal uppercase">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                        {item.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2D7FFF]">
                        {item.currency}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2D7FFF]">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                        {item.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1.5 rounded-lg text-xs tracking-wider text-white inline-block font-medium ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#D1D5DC]">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end">
                          <button className="px-4 py-1.5 rounded-md bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-xs font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                            View
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
              <p className="text-[#99A1AF] text-xs">
                Showing 1 to 8 of 46 entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                  Previous
                </button>
                <button className="w-8 h-8 bg-[#2D7FFF] rounded text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)] cursor-pointer">
                  1
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                  2
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                  3
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                  4
                </button>
                <button className="w-8 h-8 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                  5
                </button>
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate Withdrawals Content */}
        {activeTab === "affiliate_withdrawals" && (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <h3 className="text-white text-xl text-center py-8 font-semibold tracking-wide">
              Affiliate Withdrawals
            </h3>

            {/* Controls Row */}
            <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <button className="px-4 py-1.5 bg-[#1E2939] border border-[#364153] rounded-lg text-white text-xs font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                  Copy
                </button>
                <button className="px-4 py-1.5 bg-[#1E2939] border border-[#364153] rounded-lg text-white text-xs font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                  Print
                </button>
              </div>

              <div className="relative w-full max-w-xs flex items-center gap-3">
                <span className="text-[#99A1AF] text-sm whitespace-nowrap">
                  Search:
                </span>
                <input
                  type="text"
                  className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-9 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">USERNAME</th>
                    <th className="px-6 py-4">AMOUNT $</th>
                    <th className="px-6 py-4">TOKENS</th>
                    <th className="px-6 py-4 font-normal">EMAIL</th>
                    <th className="px-6 py-4 font-normal">STATUS</th>
                    <th className="px-6 py-4 text-right">MANAGE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-[#99A1AF] text-sm"
                    >
                      No data available in table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#99A1AF] text-xs uppercase font-medium">
                Showing 0 to 0 of 0 entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FinancesPage;
