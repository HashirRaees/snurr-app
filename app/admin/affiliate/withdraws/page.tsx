"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdEye, IoMdTrash, IoMdClose } from "react-icons/io";
import {
  FiFilter,
  FiUsers,
  FiDollarSign,
  FiXCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AffiliateWithdraws = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWithdraw, setSelectedWithdraw] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    w_bank_name: "",
    ibpn: "",
    swift: "",
    w_currency: "USD",
  });

  const fetchWithdraws = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/affiliates/affiliate-users/withdraws/"
      );
      
      if (response.data) {
        setData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err: any) {
      console.error("Failed to fetch withdrawals:", err);
      setError("Failed to load withdrawals from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdraws();
  }, []);

  const handleShowWithdraw = (withdraw: any) => {
    setSelectedWithdraw(withdraw);
    setShowModal(true);
  };

  const handleCreateClick = () => {
    setFormData({
      amount: "",
      w_bank_name: "",
      ibpn: "",
      swift: "",
      w_currency: "USD",
    });
    setShowCreateModal(true);
  };

  const handleCancelWithdraw = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this withdrawal request?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.post(
        `/api/affiliates/affiliate-users/${id}/cancel-withdraw/`
      );
      alert("Withdrawal cancelled successfully!");
      fetchWithdraws();
    } catch (err: any) {
      console.error("Failed to cancel withdrawal:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to cancel withdrawal.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.amount || !formData.w_bank_name) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      
      // Only include fields that have values
      const payload: any = {};
      
      if (formData.amount?.trim()) payload.amount = parseFloat(formData.amount.trim());
      if (formData.w_bank_name?.trim()) payload.w_bank_name = formData.w_bank_name.trim();
      if (formData.ibpn?.trim()) payload.ibpn = formData.ibpn.trim();
      if (formData.swift?.trim()) payload.swift = formData.swift.trim();
      if (formData.w_currency?.trim()) payload.w_currency = formData.w_currency.trim();

      await axiosInstance.post(
        "/api/affiliates/affiliate-users/withdraw/",
        payload
      );
      alert("Withdrawal request created successfully!");
      setShowCreateModal(false);
      setFormData({
        amount: "",
        w_bank_name: "",
        ibpn: "",
        swift: "",
        w_currency: "USD",
      });
      fetchWithdraws();
    } catch (err: any) {
      console.error("Failed to create withdrawal:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to create withdrawal.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const StatusBadge = ({ status }: { status: any }) => {
    // Handle both boolean and string status values
    const isApproved = status === true || status === "true" || status === "1" || status === 1;
    const isPending = status === false || status === "false" || status === "0" || status === 0;
    
    const getStyles = () => {
      if (isApproved) {
        return "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]";
      } else if (isPending) {
        return "bg-[#F790091A] text-[#F79009] border-[#F7900933]";
      } else {
        return "bg-white/10 text-white border-white/20";
      }
    };

    const statusText = isApproved ? "Approved" : isPending ? "Pending" : "Unknown";

    return (
      <span
        className={`px-3 py-1 rounded-full text-[12px] font-medium border ${getStyles()}`}
      >
        {statusText}
      </span>
    );
  };

  const filteredWithdraws = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const firstName = String(row.first_name || "").toLowerCase();
    const lastName = String(row.last_name || "").toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim().toLowerCase();
    const bankName = String(row.w_bank_name || "").toLowerCase();
    const amount = String(row.amount || "").toLowerCase();
    return (
      fullName.includes(searchStr) ||
      firstName.includes(searchStr) ||
      lastName.includes(searchStr) ||
      bankName.includes(searchStr) ||
      amount.includes(searchStr)
    );
  });

  const totalAmount = filteredWithdraws.reduce((sum, w) => {
    return sum + parseFloat(w.amount || 0);
  }, 0);

  const pendingCount = filteredWithdraws.filter(
    (w) => !w.status || w.status === false || w.status === "0"
  ).length;

  const approvedCount = filteredWithdraws.filter(
    (w) => w.status === true || w.status === "1"
  ).length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1 flex-wrap">
          <Link href="/admin/affiliate">
            <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Affiliate
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/req-list">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Requests
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/users">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Users
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#C27AFF] font-medium">Withdrawals</span>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/bonuses">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Bonuses
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/pro-transactions">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Pro Transactions
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/media-list">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              MultiMedia
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/list-affiliates">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              List Affiliates
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/settings">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Settings
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/api-history">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              API History
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/api-settings">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              API Settings
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/visitor-history">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Visitor History
            </span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-8 gap-4 px-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FiDollarSign size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Withdrawals
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage affiliate withdrawal requests
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateClick}
            className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <FiDollarSign size={18} />
            New Withdrawal
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#AD46FF33] flex items-center justify-center text-[#C27AFF]">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Amount</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : `$${totalAmount.toFixed(2)}`}
              </p>
            </div>
          </div>
          <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#12B76A33] flex items-center justify-center text-[#12B76A]">
              <FiCheckCircle size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Approved</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : approvedCount}
              </p>
            </div>
          </div>
          <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F7900933] flex items-center justify-center text-[#F79009]">
              <FiXCircle size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Pending</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : pendingCount}
              </p>
            </div>
          </div>
          <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2B7FFF33] flex items-center justify-center text-[#51A2FF]">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Requests</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : filteredWithdraws.length}
              </p>
            </div>
          </div>
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
                placeholder="Search by name, bank, or amount..."
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
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Currency</th>
                  <th className="px-8 py-5">Bank Name</th>
                  <th className="px-8 py-5">IBAN</th>
                  <th className="px-8 py-5">SWIFT</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td colSpan={9} className="px-8 py-5">
                          <div className="h-4 bg-white/5 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredWithdraws.length > 0 ? (
                  filteredWithdraws.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.first_name && row.last_name
                          ? `${row.first_name} ${row.last_name}`
                          : row.first_name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.amount ? `$${parseFloat(row.amount).toFixed(2)}` : "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.w_currency || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.w_bank_name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[150px] truncate">
                        {row.IBAN || row.ibpn || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.SWIFT || row.swift || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.created_at
                          ? new Date(row.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-8 py-5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                          {(!row.status || row.status === false) && (
                            <button
                              onClick={() => handleCancelWithdraw(row.id)}
                              disabled={processing}
                              className="p-2.5 bg-[#FB2C3633] text-[#FF6467] rounded-xl hover:bg-[#F0443833] transition-all cursor-pointer disabled:opacity-50"
                              title="Cancel"
                            >
                              <FiXCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleShowWithdraw(row)}
                            className="p-2.5 bg-[#2B7FFF33] text-[#51A2FF] rounded-xl hover:bg-[#AD46FF33] transition-all cursor-pointer"
                            title="View Details"
                          >
                            <IoMdEye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No withdrawal requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* View Withdrawal Details Modal */}
      {showModal && selectedWithdraw && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">
                Withdrawal Details
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedWithdraw(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    User Name
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.first_name} {selectedWithdraw.last_name}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Amount
                  </label>
                  <p className="text-white">
                    ${parseFloat(selectedWithdraw.amount || 0).toFixed(2)} {selectedWithdraw.w_currency}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    USD Equivalent
                  </label>
                  <p className="text-white">
                    ${parseFloat(selectedWithdraw.usd || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Bank Name
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.w_bank_name || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    IBAN
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.IBAN || selectedWithdraw.ibpn || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    SWIFT
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.SWIFT || selectedWithdraw.swift || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Account Number
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.w_account_number || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Wallet Address
                  </label>
                  <p className="text-white break-all">
                    {selectedWithdraw.wallet_address || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Address
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.Address || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    State
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.w_state || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Zipcode
                  </label>
                  <p className="text-white">
                    {selectedWithdraw.zipcode || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Status
                  </label>
                  <StatusBadge status={selectedWithdraw.status} />
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Created At
                  </label>
                  <p className="text-white">
                    {new Date(selectedWithdraw.created_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">
                    Updated At
                  </label>
                  <p className="text-white">
                    {new Date(selectedWithdraw.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedWithdraw(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Withdrawal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">
                Create Withdrawal Request
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Currency *
                </label>
                <select
                  value={formData.w_currency}
                  onChange={(e) =>
                    setFormData({ ...formData, w_currency: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                >
                  <option value="USD">USD</option>
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={formData.w_bank_name}
                  onChange={(e) =>
                    setFormData({ ...formData, w_bank_name: e.target.value })
                  }
                  placeholder="Enter bank name"
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  IBAN
                </label>
                <input
                  type="text"
                  value={formData.ibpn}
                  onChange={(e) =>
                    setFormData({ ...formData, ibpn: e.target.value })
                  }
                  placeholder="Enter IBAN"
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  SWIFT
                </label>
                <input
                  type="text"
                  value={formData.swift}
                  onChange={(e) =>
                    setFormData({ ...formData, swift: e.target.value })
                  }
                  placeholder="Enter SWIFT code"
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={processing}
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Creating..." : "Create Withdrawal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateWithdraws;

