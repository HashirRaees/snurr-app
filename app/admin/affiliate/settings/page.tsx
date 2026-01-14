"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdClose, IoMdTrash, IoMdCreate } from "react-icons/io";
import { FiFilter, FiSettings, FiPlus, FiEdit, FiEye } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AffiliateSettings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  const [formData, setFormData] = useState({
    mrp_players: "",
    mrp_month: "",
    mrp_deposit: "",
    affiliate_revenue: "",
    affiliate_player_bonus: "",
    affiliate_player_bonus_rollover: "",
  });

  const fetchSettings = async (url?: string) => {
    try {
      setLoading(true);
      const endpoint = url || "/api/affiliates/affiliate-settings/";
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
      setError("Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleCreateClick = () => {
    setFormData({
      mrp_players: "",
      mrp_month: "",
      mrp_deposit: "",
      affiliate_revenue: "",
      affiliate_player_bonus: "",
      affiliate_player_bonus_rollover: "",
    });
    setShowCreateModal(true);
  };

  const handleEditClick = (setting: any) => {
    setSelectedSetting(setting);
    setFormData({
      mrp_players: setting.mrp_players || "",
      mrp_month: setting.mrp_month || "",
      mrp_deposit: setting.mrp_deposit || "",
      affiliate_revenue: setting.affiliate_revenue || "",
      affiliate_player_bonus: setting.affiliate_player_bonus || "",
      affiliate_player_bonus_rollover: setting.affiliate_player_bonus_rollover || "",
    });
    setShowEditModal(true);
  };

  const handleViewClick = (setting: any) => {
    setSelectedSetting(setting);
    setShowViewModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this setting?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-settings/${id}/`);
      alert("Setting deleted successfully!");
      fetchSettings();
    } catch (err: any) {
      console.error("Failed to delete setting:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete setting.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleCreate = async () => {
    if (
      !formData.mrp_players ||
      !formData.mrp_month ||
      !formData.mrp_deposit ||
      !formData.affiliate_revenue ||
      !formData.affiliate_player_bonus ||
      !formData.affiliate_player_bonus_rollover
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const payload = {
        mrp_players: formData.mrp_players,
        mrp_month: parseInt(formData.mrp_month),
        mrp_deposit: parseInt(formData.mrp_deposit),
        affiliate_revenue: parseInt(formData.affiliate_revenue),
        affiliate_player_bonus: parseInt(formData.affiliate_player_bonus),
        affiliate_player_bonus_rollover: formData.affiliate_player_bonus_rollover,
      };

      await axiosInstance.post("/api/affiliates/affiliate-settings/", payload);
      alert("Setting created successfully!");
      setShowCreateModal(false);
      setFormData({
        mrp_players: "",
        mrp_month: "",
        mrp_deposit: "",
        affiliate_revenue: "",
        affiliate_player_bonus: "",
        affiliate_player_bonus_rollover: "",
      });
      fetchSettings();
    } catch (err: any) {
      console.error("Failed to create setting:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to create setting.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedSetting) return;

    try {
      setProcessing(true);
      const payload: any = {};
      
      if (formData.mrp_players) payload.mrp_players = formData.mrp_players;
      if (formData.mrp_month) payload.mrp_month = parseInt(formData.mrp_month);
      if (formData.mrp_deposit) payload.mrp_deposit = parseInt(formData.mrp_deposit);
      if (formData.affiliate_revenue) payload.affiliate_revenue = parseInt(formData.affiliate_revenue);
      if (formData.affiliate_player_bonus) payload.affiliate_player_bonus = parseInt(formData.affiliate_player_bonus);
      if (formData.affiliate_player_bonus_rollover) payload.affiliate_player_bonus_rollover = formData.affiliate_player_bonus_rollover;

      await axiosInstance.patch(
        `/api/affiliates/affiliate-settings/${selectedSetting.id}/`,
        payload
      );
      alert("Setting updated successfully!");
      setShowEditModal(false);
      setSelectedSetting(null);
      fetchSettings();
    } catch (err: any) {
      console.error("Failed to update setting:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update setting.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const filteredSettings = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const mrpPlayers = String(row.mrp_players || "").toLowerCase();
    const mrpMonth = String(row.mrp_month || "").toLowerCase();
    return mrpPlayers.includes(searchStr) || mrpMonth.includes(searchStr);
  });

  const totalSettings = pagination.count || data.length;

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
          <span className="text-[#C27AFF] font-medium">Settings</span>
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
              <FiSettings size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Settings
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage affiliate program settings
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
              <FiSettings size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Settings</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : totalSettings}
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
                placeholder="Search settings..."
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
                  <th className="px-8 py-5">MRP Players</th>
                  <th className="px-8 py-5">MRP Month</th>
                  <th className="px-8 py-5">MRP Deposit</th>
                  <th className="px-8 py-5">Affiliate Revenue</th>
                  <th className="px-8 py-5">Player Bonus</th>
                  <th className="px-8 py-5">Bonus Rollover</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td colSpan={7} className="px-8 py-5">
                          <div className="h-4 bg-white/5 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredSettings.length > 0 ? (
                  filteredSettings.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.mrp_players || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.mrp_month || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.mrp_deposit || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.affiliate_revenue || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.affiliate_player_bonus || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.affiliate_player_bonus_rollover || "N/A"}
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
                            onClick={() => handleViewClick(row)}
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
                      colSpan={7}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No settings found.
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
                1-{Math.min(filteredSettings.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredSettings.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (pagination.previous) {
                    fetchSettings(pagination.previous);
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
                    fetchSettings(pagination.next);
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
      {showViewModal && selectedSetting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Setting Details</h3>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedSetting(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">MRP Players</label>
                  <p className="text-white">{selectedSetting.mrp_players || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">MRP Month</label>
                  <p className="text-white">{selectedSetting.mrp_month || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">MRP Deposit</label>
                  <p className="text-white">{selectedSetting.mrp_deposit || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Affiliate Revenue</label>
                  <p className="text-white">{selectedSetting.affiliate_revenue || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Player Bonus</label>
                  <p className="text-white">{selectedSetting.affiliate_player_bonus || "N/A"}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Bonus Rollover</label>
                  <p className="text-white">{selectedSetting.affiliate_player_bonus_rollover || "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedSetting(null);
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
              <h3 className="text-white text-2xl font-bold">Create Setting</h3>
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
                  MRP Players *
                </label>
                <input
                  type="text"
                  value={formData.mrp_players}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_players: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  MRP Month *
                </label>
                <input
                  type="number"
                  value={formData.mrp_month}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_month: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  MRP Deposit *
                </label>
                <input
                  type="number"
                  value={formData.mrp_deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_deposit: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Affiliate Revenue *
                </label>
                <input
                  type="number"
                  value={formData.affiliate_revenue}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_revenue: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Player Bonus *
                </label>
                <input
                  type="number"
                  value={formData.affiliate_player_bonus}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_player_bonus: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Bonus Rollover *
                </label>
                <input
                  type="text"
                  value={formData.affiliate_player_bonus_rollover}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_player_bonus_rollover: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  placeholder="e.g., 3x"
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
                {processing ? "Creating..." : "Create Setting"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSetting && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Edit Setting</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedSetting(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  MRP Players
                </label>
                <input
                  type="text"
                  value={formData.mrp_players}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_players: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  MRP Month
                </label>
                <input
                  type="number"
                  value={formData.mrp_month}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_month: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  MRP Deposit
                </label>
                <input
                  type="number"
                  value={formData.mrp_deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, mrp_deposit: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Affiliate Revenue
                </label>
                <input
                  type="number"
                  value={formData.affiliate_revenue}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_revenue: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Player Bonus
                </label>
                <input
                  type="number"
                  value={formData.affiliate_player_bonus}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_player_bonus: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">
                  Bonus Rollover
                </label>
                <input
                  type="text"
                  value={formData.affiliate_player_bonus_rollover}
                  onChange={(e) =>
                    setFormData({ ...formData, affiliate_player_bonus_rollover: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  placeholder="e.g., 3x"
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedSetting(null);
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
                {processing ? "Updating..." : "Update Setting"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateSettings;

