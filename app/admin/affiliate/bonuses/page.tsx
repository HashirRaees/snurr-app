"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdClose, IoMdTrash } from "react-icons/io";
import { FiFilter, FiGift, FiPlus, FiEye, FiEdit } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AffiliateBonuses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const [formData, setFormData] = useState({
    deposit_id: "",
    user_id: "",
    aff_id: "",
    amount: "",
    tokens: "",
  });

  const fetchBonuses = async (url?: string) => {
    try {
      setLoading(true);
      const endpoint = url || "/api/affiliates/affiliate-bonuses/";
      const response = await axiosInstance.get(endpoint);

      if (response.data) {
        if (response.data.results) {
          setData(response.data.results);
          setPagination({
            count: response.data.count || 0,
            next: response.data.next,
            previous: response.data.previous,
          });
        } else if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bonuses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, []);

  const handleCreateClick = () => {
    setFormData({
      deposit_id: "",
      user_id: "",
      aff_id: "",
      amount: "",
      tokens: "",
    });
    setShowCreateModal(true);
  };

  const handleEditClick = (bonus: any) => {
    setSelectedBonus(bonus);
    setFormData({
      deposit_id: bonus.deposit_id?.toString() || "",
      user_id: bonus.user_id?.toString() || "",
      aff_id: bonus.aff_id?.toString() || "",
      amount: bonus.amount?.toString() || "",
      tokens: bonus.tokens?.toString() || "",
    });
    setShowEditModal(true);
  };

  const handleViewClick = async (id: number) => {
    try {
      const response = await axiosInstance.get(
        `/api/affiliates/affiliate-bonuses/${id}/`
      );
      setSelectedBonus(response.data);
      setShowViewModal(true);
    } catch (err: any) {
      console.error("Failed to fetch bonus details:", err);
      alert("Failed to load bonus details.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this bonus?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-bonuses/${id}/`);
      alert("Bonus deleted successfully!");
      fetchBonuses();
    } catch (err: any) {
      console.error("Failed to delete bonus:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete bonus.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleCreate = async () => {
    if (
      !formData.deposit_id ||
      !formData.user_id ||
      !formData.aff_id ||
      !formData.amount ||
      !formData.tokens
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const payload = {
        deposit_id: parseInt(formData.deposit_id),
        user_id: parseInt(formData.user_id),
        aff_id: parseInt(formData.aff_id),
        amount: parseFloat(formData.amount),
        tokens: parseFloat(formData.tokens),
      };

      await axiosInstance.post("/api/affiliates/affiliate-bonuses/", payload);
      alert("Bonus created successfully!");
      setShowCreateModal(false);
      setFormData({
        deposit_id: "",
        user_id: "",
        aff_id: "",
        amount: "",
        tokens: "",
      });
      fetchBonuses();
    } catch (err: any) {
      console.error("Failed to create bonus:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to create bonus.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedBonus) return;

    try {
      setProcessing(true);
      const payload: any = {};
      
      if (formData.deposit_id) payload.deposit_id = parseInt(formData.deposit_id);
      if (formData.user_id) payload.user_id = parseInt(formData.user_id);
      if (formData.aff_id) payload.aff_id = parseInt(formData.aff_id);
      if (formData.amount) payload.amount = parseFloat(formData.amount);
      if (formData.tokens) payload.tokens = parseFloat(formData.tokens);

      await axiosInstance.patch(
        `/api/affiliates/affiliate-bonuses/${selectedBonus.id}/`,
        payload
      );
      alert("Bonus updated successfully!");
      setShowEditModal(false);
      setSelectedBonus(null);
      fetchBonuses();
    } catch (err: any) {
      console.error("Failed to update bonus:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update bonus.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const filteredBonuses = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const depositId = String(row.deposit_id || "").toLowerCase();
    const userId = String(row.user_id || "").toLowerCase();
    const affId = String(row.aff_id || "").toLowerCase();
    const amount = String(row.amount || "").toLowerCase();
    return (
      depositId.includes(searchStr) ||
      userId.includes(searchStr) ||
      affId.includes(searchStr) ||
      amount.includes(searchStr)
    );
  });

  const totalBonuses = pagination.count || data.length;

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
          <Link href="/admin/affiliate/withdraws">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Withdrawals
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#C27AFF] font-medium">Bonuses</span>
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
              <FiGift size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Bonuses
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage affiliate bonus records
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateClick}
            className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <FiPlus size={20} />
            Add New
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#AD46FF33] flex items-center justify-center text-[#C27AFF]">
              <FiGift size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Bonuses</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : totalBonuses}
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
                placeholder="Search by deposit ID, user ID, aff ID, or amount..."
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
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-5">Deposit ID</th>
                  <th className="px-8 py-5">User ID</th>
                  <th className="px-8 py-5">Affiliate ID</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Tokens</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Created At</th>
                  <th className="px-8 py-5 text-right">Actions</th>
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
                ) : filteredBonuses.length > 0 ? (
                  filteredBonuses.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.deposit_id || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.user_id || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.aff_id || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        ${row.amount || "0.00"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.tokens || "0.00"}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs border ${
                            row.status === true || row.status === "true" || row.status === "1" || row.status === 1
                              ? "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]"
                              : row.status === false || row.status === "false" || row.status === "0" || row.status === 0
                              ? "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                              : "bg-white/10 text-white border-white/20"
                          }`}
                        >
                          {row.status === true || row.status === "true" || row.status === "1" || row.status === 1
                            ? "Active"
                            : row.status === false || row.status === "false" || row.status === "0" || row.status === 0
                            ? "Inactive"
                            : row.status !== null && row.status !== undefined
                            ? String(row.status)
                            : "N/A"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.created_at
                          ? new Date(row.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDelete(row.id)}
                            disabled={processing}
                            className="p-2.5 bg-[#FB2C3633] text-[#FF6467] rounded-xl hover:bg-[#F0443833] transition-all cursor-pointer disabled:opacity-50"
                            title="Delete"
                          >
                            <IoMdTrash size={18} />
                          </button>
                          <button
                            onClick={() => handleEditClick(row)}
                            className="p-2.5 bg-[#F7900933] text-[#F79009] rounded-xl hover:bg-[#F790094D] transition-all cursor-pointer"
                            title="Edit"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleViewClick(row.id)}
                            className="p-2.5 bg-[#2B7FFF33] text-[#51A2FF] rounded-xl hover:bg-[#AD46FF33] transition-all cursor-pointer"
                            title="View"
                          >
                            <FiEye size={18} />
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
                      No bonuses found.
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
                1-{Math.min(filteredBonuses.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredBonuses.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (pagination.previous) {
                    fetchBonuses(pagination.previous);
                  }
                }}
                disabled={!pagination.previous}
                className="p-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
                <IoIosArrowBack size={18} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#AD46FF] text-white font-bold text-sm shadow-[0_0_15px_-3px_#AD46FF80] cursor-pointer">
                1
              </button>
              <button
                onClick={() => {
                  if (pagination.next) {
                    fetchBonuses(pagination.next);
                  }
                }}
                disabled={!pagination.next}
                className="p-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <IoIosArrowForward size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* View Modal */}
      {showViewModal && selectedBonus && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Bonus Details</h3>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedBonus(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">ID</label>
                  <p className="text-white">{selectedBonus.id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Deposit ID</label>
                  <p className="text-white">{selectedBonus.deposit_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">User ID</label>
                  <p className="text-white">{selectedBonus.user_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Affiliate ID</label>
                  <p className="text-white">{selectedBonus.aff_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Amount</label>
                  <p className="text-white">${selectedBonus.amount || "0.00"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Tokens</label>
                  <p className="text-white">{selectedBonus.tokens || "0.00"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Status</label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border ${
                      selectedBonus.status === true || selectedBonus.status === "true" || selectedBonus.status === "1" || selectedBonus.status === 1
                        ? "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]"
                        : selectedBonus.status === false || selectedBonus.status === "false" || selectedBonus.status === "0" || selectedBonus.status === 0
                        ? "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                        : "bg-white/10 text-white border-white/20"
                    }`}
                  >
                    {selectedBonus.status === true || selectedBonus.status === "true" || selectedBonus.status === "1" || selectedBonus.status === 1
                      ? "Active"
                      : selectedBonus.status === false || selectedBonus.status === "false" || selectedBonus.status === "0" || selectedBonus.status === 0
                      ? "Inactive"
                      : selectedBonus.status !== null && selectedBonus.status !== undefined
                      ? String(selectedBonus.status)
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Created At</label>
                  <p className="text-white">
                    {selectedBonus.created_at
                      ? new Date(selectedBonus.created_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Updated At</label>
                  <p className="text-white">
                    {selectedBonus.updated_at
                      ? new Date(selectedBonus.updated_at).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedBonus(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Create Bonus</h3>
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
                  Deposit ID *
                </label>
                <input
                  type="number"
                  value={formData.deposit_id}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  User ID *
                </label>
                <input
                  type="number"
                  value={formData.user_id}
                  onChange={(e) =>
                    setFormData({ ...formData, user_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Affiliate ID *
                </label>
                <input
                  type="number"
                  value={formData.aff_id}
                  onChange={(e) =>
                    setFormData({ ...formData, aff_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Amount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Tokens *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.tokens}
                  onChange={(e) =>
                    setFormData({ ...formData, tokens: e.target.value })
                  }
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
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Creating..." : "Create Bonus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBonus && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Edit Bonus</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBonus(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Deposit ID
                </label>
                <input
                  type="number"
                  value={formData.deposit_id}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  User ID
                </label>
                <input
                  type="number"
                  value={formData.user_id}
                  onChange={(e) =>
                    setFormData({ ...formData, user_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Affiliate ID
                </label>
                <input
                  type="number"
                  value={formData.aff_id}
                  onChange={(e) =>
                    setFormData({ ...formData, aff_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Tokens
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.tokens}
                  onChange={(e) =>
                    setFormData({ ...formData, tokens: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBonus(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={processing}
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Updating..." : "Update Bonus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBonus && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Edit Bonus</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBonus(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Deposit ID
                </label>
                <input
                  type="number"
                  value={formData.deposit_id}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  User ID
                </label>
                <input
                  type="number"
                  value={formData.user_id}
                  onChange={(e) =>
                    setFormData({ ...formData, user_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Affiliate ID
                </label>
                <input
                  type="number"
                  value={formData.aff_id}
                  onChange={(e) =>
                    setFormData({ ...formData, aff_id: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Tokens
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.tokens}
                  onChange={(e) =>
                    setFormData({ ...formData, tokens: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedBonus(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={processing}
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Updating..." : "Update Bonus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateBonuses;

