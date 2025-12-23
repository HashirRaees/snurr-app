"use client";

import Navbar from "../../../components/admin/Navbar";
import Image from "next/image";
import {
  FiTrendingUp,
  FiUsers,
  FiActivity,
  FiGrid,
  FiDollarSign,
} from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";
import { HiDownload, HiUpload } from "react-icons/hi";
import { IoMdMore } from "react-icons/io";

const STATS = [
  {
    icon: FiDollarSign,
    label: "Total Deposited Amount",
    value: "6,442,868,195",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    icon: IoPlayOutline,
    label: "Total Games",
    value: "85",
    trend: "+5",
    trendUp: true,
  },
  {
    icon: FiUsers,
    label: "Total Players",
    value: "31",
    trend: "+8",
    trendUp: true,
  },
  {
    icon: IoPlayOutline,
    label: "Total Sessions",
    value: "2,506",
    trend: "+15%",
    trendUp: true,
  },
  {
    icon: HiDownload,
    label: "Deposit Requests",
    value: "55",
    trend: "+12",
    trendUp: true,
  },
  {
    icon: HiUpload,
    label: "Withdrawal Requests",
    value: "4",
    trend: "0",
    trendUp: false,
  },
  {
    icon: FiDollarSign,
    label: "Withdrawal Amount",
    value: "100",
    trend: "",
    trendUp: false,
  },
  {
    icon: FiDollarSign,
    label: "Total Investment",
    value: "$0.00",
    trend: "",
    trendUp: false,
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:px-0 px-2 gap-4 md:gap-0 md:items-center justify-between mb-10">
          <div>
            <h2 className="text-white text-3xl font-heading tracking-wide flex items-center gap-3">
              OVERVIEW
            </h2>
            <p className="text-[#99A1AF] text-sm mt-1">
              Real-time statistics and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-lg bg-[#1E2939] text-white text-sm cursor-pointer">
              Last 7 days
            </button>
            <button className="px-6 py-2.5 rounded-lg shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#9810FA] text-white text-sm cursor-pointer">
              Export Report
            </button>
          </div>
        </div>

        {/* 8 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#10182899] border border-[#1E293980] rounded-2xl p-6 relative group hover:border-[#AD46FF33] transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C800DE] shadow-[0_8px_24px_0_#10B98140] flex items-center justify-center text-white">
                  <stat.icon size={22} />
                </div>
                {stat.trend && (
                  <div className="bg-[#00C950]/10 border border-[#00C95033] px-2 py-1 rounded-xl flex items-center gap-1">
                    <FiTrendingUp className="text-[#05DF72] text-xs" />
                    <span className="text-[#05DF72] text-[10px]">
                      {stat.trend}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[#99A1AF] text-sm mb-1">{stat.label}</p>
              <h3 className="text-white text-3xl font-bold tracking-tight">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend Chart Card */}
          <div className="lg:col-span-2 bg-[#10182899] border border-[#1E293980] rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FiTrendingUp className="text-[#C27AFF] text-2xl" />
                <div>
                  <h4 className="text-white font-bold text-base md:text-2xl">
                    Deposit & Withdraw Trends
                  </h4>
                  <p className="text-[#6A7282] text-xs md:text-sm">
                    Monthly overview
                  </p>
                </div>
              </div>
              <button className="text-white/20 hover:text-white transition-all cursor-pointer">
                <IoMdMore size={24} />
              </button>
            </div>
            <div className="relative">
              <Image
                src="/assets/BarChart.png"
                alt="Deposit and Withdraw Trends"
                width={400}
                height={400}
                className="w-full md:h-[400px] object-contain"
              />
            </div>
            <div className="flex gap-6 justify-center">
              <h2 className="text-[#9CA3AF] text-sm md:text-base">Deposits</h2>
              <h2 className="text-[#9CA3AF] text-sm md:text-base">
                Withdrawals
              </h2>
            </div>
          </div>

          {/* Activity Chart Card */}
          <div className="bg-[#10182899] border border-[#1E293980] rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FiActivity className="text-[#C27AFF] text-2xl" />
                <div>
                  <h4 className="text-white font-bold text-base md:text-2xl">
                    Weekly Activity
                  </h4>
                  <p className="text-[#6A7282] text-xs md:text-sm">
                    Last 5 weeks
                  </p>
                </div>
              </div>
              <button className="text-[#99A1AF] hover:text-white transition-all cursor-pointer">
                <IoMdMore size={24} />
              </button>
            </div>
            <div className="relative">
              <Image
                src="/assets/LineChart.png"
                alt="Weekly Activity"
                width={400}
                height={400}
                className="w-full md:h-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
