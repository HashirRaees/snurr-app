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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

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

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const MonthlyTrendsChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/dashboard/monthly-deposits-withdraws/"
        );
        // Robustly extract an array from common response patterns
        let rawData = response.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
          rawData =
            rawData.results ||
            rawData.data ||
            rawData.Stats ||
            rawData.stats ||
            [];
        }

        const finalData = Array.isArray(rawData) ? rawData : [];
        setData(finalData);
      } catch (err) {
        console.error("Failed to fetch monthly trends:", err);
        setData([]); // Ensure it's an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#10182833] rounded-2xl animate-pulse">
        <p className="text-[#99A1AF]">Loading chart data...</p>
      </div>
    );
  }

  // Prevents Recharts from trying to slice a non-array or empty data
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border border-dashed border-[#1E2939] rounded-2xl">
        <p className="text-[#99A1AF]">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#1E2939"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#99A1AF", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#99A1AF", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#1E2939" }}
            contentStyle={{
              backgroundColor: "#101828",
              border: "1px solid #1E2939",
              borderRadius: "8px",
            }}
            itemStyle={{ fontSize: "12px" }}
          />
          <Bar
            dataKey="deposit"
            fill="#9810FA"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="withdraw"
            fill="#C800DE"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const WeeklyActivityChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/dashboard/weekly-deposits-withdraws/"
        );
        let rawData = response.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
          rawData = rawData.results || rawData.data || [];
        }
        setData(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error("Failed to fetch weekly activity:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-[#10182833] rounded-2xl animate-pulse">
        <p className="text-[#99A1AF]">Loading data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center border border-dashed border-[#1E2939] rounded-2xl">
        <p className="text-[#99A1AF]">No activity data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorDeposits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9810FA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9810FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#1E2939"
          />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#99A1AF", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#99A1AF", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#101828",
              border: "1px solid #1E2939",
              borderRadius: "8px",
            }}
          />
          <Area
            type="monotone"
            dataKey="deposit"
            stroke="#9810FA"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorDeposits)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/dashboard/statistics/");
        // Try to handle different common formats (object with keys or nested 'Stats'/'stats')
        const data =
          response.data?.Stats || response.data?.stats || response.data;
        setStatsData(data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load statistics from the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getStatsArray = () => {
    if (!statsData) return STATS;

    // Helper to format values nicely if needed
    const formatValue = (val: any) =>
      val !== undefined && val !== null ? val.toLocaleString() : "0";

    return [
      {
        ...STATS[0],
        value: formatValue(
          statsData.total_deposited_amount || statsData.deposited_amount
        ),
        trend: statsData.deposited_trend || STATS[0].trend,
      },
      {
        ...STATS[1],
        value: formatValue(statsData.total_games || statsData.games_count),
        trend: statsData.games_trend || STATS[1].trend,
      },
      {
        ...STATS[2],
        value: formatValue(statsData.total_players || statsData.players_count),
        trend: statsData.players_trend || STATS[2].trend,
      },
      {
        ...STATS[3],
        value: formatValue(
          statsData.total_sessions || statsData.sessions_count
        ),
        trend: statsData.sessions_trend || STATS[3].trend,
      },
      {
        ...STATS[4],
        value: formatValue(
          statsData.deposit_requests || statsData.deposits_pending
        ),
        trend: statsData.deposit_requests_trend || STATS[4].trend,
      },
      {
        ...STATS[5],
        value: formatValue(
          statsData.withdrawal_requests || statsData.withdraws_pending
        ),
        trend: statsData.withdrawal_requests_trend || STATS[5].trend,
      },
      {
        ...STATS[6],
        value: formatValue(
          statsData.withdrawal_amount || statsData.total_withdrawn
        ),
        trend: statsData.withdrawal_amount_trend || STATS[6].trend,
      },
      {
        ...STATS[7],
        value: formatValue(
          statsData.total_investment || statsData.investment_amount
        ),
        trend: statsData.investment_trend || STATS[7].trend,
      },
    ];
  };

  const displayStats = getStatsArray();

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

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* 8 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {displayStats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-[#10182899] border border-[#1E293980] rounded-2xl p-6 relative group hover:border-[#AD46FF33] transition-all ${
                loading ? "animate-pulse" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#C800DE] shadow-[0_8px_24px_0_#10B98140] flex items-center justify-center text-white">
                  <stat.icon size={22} />
                </div>
                {stat.trend && !loading && (
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
                {loading ? "..." : stat.value}
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
              <MonthlyTrendsChart />
            </div>
            <div className="flex gap-6 justify-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9810FA]"></div>
                <span className="text-[#9CA3AF] text-sm md:text-base">
                  Deposits
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C800DE]"></div>
                <span className="text-[#9CA3AF] text-sm md:text-base">
                  Withdrawals
                </span>
              </div>
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
              <WeeklyActivityChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
