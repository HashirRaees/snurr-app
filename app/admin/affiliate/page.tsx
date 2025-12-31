"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdEye, IoMdTrash } from "react-icons/io";
import {
  FiFilter,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AffiliateRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/affiliates/affiliate-users/requests/"
        );
        let rawData = response.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
          rawData = rawData.results || rawData.data || rawData.requests || [];
        }
        setData(Array.isArray(rawData) ? rawData : []);
      } catch (err: any) {
        console.error("Failed to fetch affiliate requests:", err);
        setError("Failed to load requests from the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const StatusCard = ({
    icon: Icon,
    label,
    value,
    iconBg,
    iconColor,
  }: {
    icon: any;
    label: string;
    value: string | number;
    iconBg: string;
    iconColor: string;
  }) => (
    <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4 flex-1">
      <div
        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor}`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[#98A2B3] text-sm font-medium">{label}</p>
        <p className="text-white text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );

  const StatusBadge = ({
    status,
    type,
  }: {
    status: any;
    type: "approval" | "user";
  }) => {
    const s = String(status || "").toLowerCase();
    const getStyles = () => {
      if (type === "approval") {
        switch (s) {
          case "approved":
            return "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]";
          case "pending":
            return "bg-[#F790091A] text-[#F79009] border-[#F7900933]";
          case "rejected":
            return "bg-[#F044381A] text-[#F04438] border-[#F0443833]";
          default:
            return "bg-white/10 text-white border-white/20";
        }
      } else {
        switch (s) {
          case "active":
          case "true":
          case "1":
            return "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]";
          case "inactive":
          case "false":
          case "0":
            return "bg-[#F790091A] text-[#F79009] border-[#F7900933]";
          default:
            return "bg-white/10 text-white border-white/20";
        }
      }
    };

    const statusText =
      s === "true" || s === "1"
        ? "Active"
        : s === "false" || s === "0"
        ? "Inactive"
        : status;

    return (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-medium border ${getStyles()}`}
      >
        {statusText || "N/A"}
      </span>
    );
  };

  // Filter logic with robustness
  const filteredRequests = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const username = String(row.username || row.user_name || "").toLowerCase();
    const name = String(row.name || row.full_name || "").toLowerCase();
    const email = String(row.email || "").toLowerCase();
    return (
      username.includes(searchStr) ||
      name.includes(searchStr) ||
      email.includes(searchStr)
    );
  });

  // Calculate stats from real data with robustness
  const approvedCount = (data || []).filter((r) => {
    const s = String(r?.approval || r?.approval_status || "").toLowerCase();
    return s === "approved";
  }).length;
  const pendingCount = (data || []).filter((r) => {
    const s = String(r?.approval || r?.approval_status || "").toLowerCase();
    return s === "pending";
  }).length;
  const rejectedCount = (data || []).filter((r) => {
    const s = String(r?.approval || r?.approval_status || "").toLowerCase();
    return s === "rejected";
  }).length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Affiliate
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Requests
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] font-medium">MultiMedia</span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-8 gap-4 px-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FiUsers size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Requests
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage and review affiliate applications
              </p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
            <LuDownload size={18} />
            Show Requests
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatusCard
            icon={FiCheckCircle}
            label="Approved"
            value={loading ? "..." : approvedCount}
            iconBg="bg-[#00C95033]"
            iconColor="text-[#05DF72]"
          />
          <StatusCard
            icon={FiClock}
            label="Pending"
            value={loading ? "..." : pendingCount}
            iconBg="bg-[#FF690033]"
            iconColor="text-[#FF8904]"
          />
          <StatusCard
            icon={FiXCircle}
            label="Rejected"
            value={loading ? "..." : rejectedCount}
            iconBg="bg-[#FB2C3633]"
            iconColor="text-[#FF6467]"
          />
          <StatusCard
            icon={FiUsers}
            label="Total Requests"
            value={loading ? "..." : data.length}
            iconBg="bg-[#AD46FF33]"
            iconColor="text-[#C27AFF]"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Table Actions */}
          <div className="md:p-8 p-5 border-b border-[#C27AFF1A] flex flex-wrap items-center justify-between gap-6">
            <div className="relative flex-1 min-w-[300px] max-w-md">
              <IoMdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiFilter size={18} />
                Filter
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                <LuDownload size={18} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-5">User Name</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">City</th>
                  <th className="px-8 py-5">Register Date</th>
                  <th className="px-8 py-5">Approval Status</th>
                  <th className="px-8 py-5">User Status</th>
                  <th className="px-8 py-5 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td colSpan={8} className="px-8 py-5">
                          <div className="h-4 bg-white/5 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.username || row.user_name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.name || row.first_name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                        {row.email || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.city || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.date || row.created_at || row.joined_at || "N/A"}
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge
                          type="approval"
                          status={row.approval || row.approval_status || "pending"}
                        />
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge
                          type="user"
                          status={
                            row.status || String(row.is_active || row.active || "inactive") 
                          }
                        />
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 bg-[#FB2C3633] text-[#FF6467] rounded-xl hover:bg-[#F0443833] transition-all cursor-pointer">
                            <IoMdTrash size={18} />
                          </button>
                          <button className="p-2.5 bg-[#2B7FFF33] text-[#51A2FF] rounded-xl hover:bg-[#AD46FF33] transition-all cursor-pointer">
                            <IoMdEye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No affiliate requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex flex-col md:flex-row gap-3 items-center justify-between border-t border-[#C27AFF1A]">
            <p className="text-[#98A2B3] text-xs md:text-sm">
              Showing{" "}
              <span className="text-white font-medium">
                1-{Math.min(filteredRequests.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredRequests.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer">
                Previous
                <IoIosArrowBack size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#AD46FF] text-white font-bold text-sm shadow-[0_0_15px_-3px_#AD46FF80] cursor-pointer">
                1
              </button>
              <button className="p-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer">
                Next
                <IoIosArrowForward size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AffiliateRequests;
