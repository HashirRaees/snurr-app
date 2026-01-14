"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdEye, IoMdTrash, IoMdClose, IoMdCreate } from "react-icons/io";
import {
  FiFilter,
  FiUsers,
  FiUserPlus,
  FiEdit,
} from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AffiliateUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [codeCheckStatus, setCodeCheckStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: "" });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    country: "",
    phone: "",
    dob: "",
    address: "",
    city: "",
    country_code: "",
    pro_parent: "",
    password: "",
  });

  const fetchUsers = async (url?: string) => {
    try {
      setLoading(true);
      const endpoint = url || "/api/affiliates/affiliate-users/users/";
      const response = await axiosInstance.get(endpoint);
      
      if (response.data) {
        if (response.data.results) {
          // Paginated response
          setData(response.data.results);
          setPagination({
            count: response.data.count || 0,
            next: response.data.next,
            previous: response.data.previous,
          });
        } else if (Array.isArray(response.data)) {
          // Array response
          setData(response.data);
        } else {
          setData([]);
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch affiliate users:", err);
      setError("Failed to load users from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShowUser = async (id: number) => {
    try {
      setLoadingDetail(true);
      setShowModal(true);
      const response = await axiosInstance.get(
        `/api/affiliates/affiliate-users/${id}/`
      );
      setSelectedUser(response.data);
    } catch (err: any) {
      console.error("Failed to fetch user details:", err);
      alert("Failed to load user details.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCreateClick = () => {
    setFormData({
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      country: "",
      phone: "",
      dob: "",
      address: "",
      city: "",
      country_code: "",
      pro_parent: "",
      password: "",
    });
    setCodeCheckStatus({ checking: false, available: null, message: "" });
    setShowCreateModal(true);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      user_name: user.user_name || "",
      email: user.email || "",
      country: user.country || "",
      phone: user.phone || "",
      dob: user.dob || "",
      address: user.address || "",
      city: user.city || "",
      country_code: user.country_code || "",
      pro_parent: user.pro_parent || "",
      password: "",
    });
    setCodeCheckStatus({ checking: false, available: null, message: "" });
    setShowEditModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this affiliate user?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-users/${id}/`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete user.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const checkAffiliateCode = async (code: string) => {
    if (!code.trim()) {
      setCodeCheckStatus({ checking: false, available: null, message: "" });
      return;
    }

    try {
      setCodeCheckStatus({ checking: true, available: null, message: "" });
      const response = await axiosInstance.post(
        "/api/affiliates/affiliate-users/check-code/",
        { pro_parent: code }
      );
      setCodeCheckStatus({
        checking: false,
        available: response.data.available,
        message: response.data.message || "",
      });
    } catch (err: any) {
      console.error("Failed to check code:", err);
      setCodeCheckStatus({
        checking: false,
        available: false,
        message: err.response?.data?.message || "Error checking code",
      });
    }
  };

  const handleCreate = async () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.user_name ||
      !formData.email ||
      !formData.country
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      
      // Only include fields that have non-empty values
      const payload: any = {};
      
      // Required fields
      if (formData.first_name?.trim()) payload.first_name = formData.first_name.trim();
      if (formData.last_name?.trim()) payload.last_name = formData.last_name.trim();
      if (formData.user_name?.trim()) payload.user_name = formData.user_name.trim();
      if (formData.email?.trim()) payload.email = formData.email.trim();
      if (formData.country?.trim()) payload.country = formData.country.trim();
      
      // Optional fields - only include if they have values
      if (formData.phone?.trim()) payload.phone = formData.phone.trim();
      if (formData.dob?.trim()) payload.dob = formData.dob.trim();
      if (formData.address?.trim()) payload.address = formData.address.trim();
      if (formData.city?.trim()) payload.city = formData.city.trim();
      if (formData.country_code?.trim()) payload.country_code = formData.country_code.trim();
      if (formData.password?.trim()) payload.password = formData.password.trim();
      
      // Handle pro_parent - only include if it's a valid integer
      // The API requires pro_parent to be an integer (user ID), not a string code
      if (formData.pro_parent && formData.pro_parent.trim()) {
        const proParentValue = formData.pro_parent.trim();
        const proParentInt = parseInt(proParentValue, 10);
        if (!isNaN(proParentInt) && proParentInt > 0) {
          payload.pro_parent = proParentInt;
        }
        // If it's not a valid integer, omit it from the payload
      }

      await axiosInstance.post("/api/affiliates/affiliate-users/", payload);
      alert("User created successfully!");
      setShowCreateModal(false);
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to create user:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to create user.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.user_name ||
      !formData.email
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      // Only send fields that have non-empty values
      const updateData: any = {};
      
      // Only include fields that have actual values (not empty strings)
      if (formData.first_name?.trim()) updateData.first_name = formData.first_name.trim();
      if (formData.last_name?.trim()) updateData.last_name = formData.last_name.trim();
      if (formData.user_name?.trim()) updateData.user_name = formData.user_name.trim();
      if (formData.email?.trim()) updateData.email = formData.email.trim();
      if (formData.country?.trim()) updateData.country = formData.country.trim();
      if (formData.phone?.trim()) updateData.phone = formData.phone.trim();
      if (formData.dob?.trim()) updateData.dob = formData.dob.trim();
      if (formData.address?.trim()) updateData.address = formData.address.trim();
      if (formData.city?.trim()) updateData.city = formData.city.trim();
      if (formData.country_code?.trim()) updateData.country_code = formData.country_code.trim();
      if (formData.password?.trim()) updateData.password = formData.password.trim();
      
      // Handle pro_parent - only include if it's a valid integer
      // The API requires pro_parent to be an integer (user ID), not a string code
      if (formData.pro_parent && formData.pro_parent.trim()) {
        const proParentValue = formData.pro_parent.trim();
        const proParentInt = parseInt(proParentValue, 10);
        if (!isNaN(proParentInt) && proParentInt > 0) {
          updateData.pro_parent = proParentInt;
        }
        // If it's not a valid integer, omit it from the payload
      }

      await axiosInstance.patch(
        `/api/affiliates/affiliate-users/${selectedUser.id}/`,
        updateData
      );
      alert("User updated successfully!");
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to update user:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update user.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const StatusBadge = ({ status }: { status: any }) => {
    const s = String(status || "").toLowerCase();
    const getStyles = () => {
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

  const filteredUsers = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const username = String(row.username || row.user_name || "").toLowerCase();
    const firstName = String(row.first_name || "").toLowerCase();
    const lastName = String(row.last_name || "").toLowerCase();
    const fullName = `${firstName} ${lastName}`.trim().toLowerCase();
    const email = String(row.email || "").toLowerCase();
    return (
      username.includes(searchStr) ||
      fullName.includes(searchStr) ||
      firstName.includes(searchStr) ||
      lastName.includes(searchStr) ||
      email.includes(searchStr)
    );
  });

  const totalUsers = pagination.count || data.length;

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
          <span className="text-[#C27AFF] font-medium">Users</span>
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
              <FiUsers size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Users
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage affiliate users and their accounts
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateClick}
            className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <FiUserPlus size={18} />
            Add New User
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#AD46FF33] flex items-center justify-center text-[#C27AFF]">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Users</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : totalUsers}
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
                  <th className="px-8 py-5">Affiliate Code</th>
                  <th className="px-8 py-5">Register Date</th>
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
                        <td colSpan={8} className="px-8 py-5">
                          <div className="h-4 bg-white/5 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.username || row.user_name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.name ||
                          (row.first_name && row.last_name
                            ? `${row.first_name} ${row.last_name}`
                            : row.first_name || "N/A")}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                        {row.email || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.city || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.pro_parent || "N/A"}
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
                            onClick={() => handleShowUser(row.id)}
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
                      colSpan={8}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No affiliate users found.
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
                1-{Math.min(filteredUsers.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredUsers.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (pagination.previous) {
                    fetchUsers(pagination.previous);
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
                    fetchUsers(pagination.next);
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

      {/* View User Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">User Details</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              {loadingDetail ? (
                <div className="text-white text-center py-10">Loading...</div>
              ) : selectedUser ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      First Name
                    </label>
                    <p className="text-white">{selectedUser.first_name}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Last Name
                    </label>
                    <p className="text-white">{selectedUser.last_name}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Username
                    </label>
                    <p className="text-white">{selectedUser.user_name}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Email
                    </label>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Phone
                    </label>
                    <p className="text-white">
                      {selectedUser.country_code} {selectedUser.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Date of Birth
                    </label>
                    <p className="text-white">{selectedUser.dob}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Address
                    </label>
                    <p className="text-white">
                      {selectedUser.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      City
                    </label>
                    <p className="text-white">{selectedUser.city}</p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Affiliate Code
                    </label>
                    <p className="text-white">
                      {selectedUser.pro_parent || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Payout Percentage
                    </label>
                    <p className="text-white">
                      {selectedUser.pro_payout_percentage || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      IP Address
                    </label>
                    <p className="text-white">
                      {selectedUser.ip_address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Status
                    </label>
                    <StatusBadge status={selectedUser.status} />
                  </div>
                  <div>
                    <label className="text-[#98A2B3] text-sm mb-2 block">
                      Created At
                    </label>
                    <p className="text-white">
                      {new Date(selectedUser.created_at).toLocaleString()}
                    </p>
                  </div>
                  {selectedUser.comments && (
                    <div className="md:col-span-2">
                      <label className="text-[#98A2B3] text-sm mb-2 block">
                        Comments
                      </label>
                      <p className="text-white bg-[#0F172A] p-4 rounded-xl">
                        {selectedUser.comments}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white text-center py-10">
                  No data available
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Create New User</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.user_name}
                    onChange={(e) =>
                      setFormData({ ...formData, user_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Country Code
                  </label>
                  <input
                    type="text"
                    value={formData.country_code}
                    onChange={(e) =>
                      setFormData({ ...formData, country_code: e.target.value })
                    }
                    placeholder="e.g., 880"
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Affiliate Code (Pro Parent)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.pro_parent}
                      onChange={(e) => {
                        setFormData({ ...formData, pro_parent: e.target.value });
                        if (e.target.value) {
                          checkAffiliateCode(e.target.value);
                        }
                      }}
                      placeholder="e.g., AFF001"
                      className="flex-1 bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                    />
                    {codeCheckStatus.checking && (
                      <span className="text-white/60 text-sm self-center">
                        Checking...
                      </span>
                    )}
                    {!codeCheckStatus.checking &&
                      codeCheckStatus.available !== null && (
                        <span
                          className={`text-sm self-center px-3 py-1 rounded ${
                            codeCheckStatus.available
                              ? "text-green-400 bg-green-400/20"
                              : "text-red-400 bg-red-400/20"
                          }`}
                        >
                          {codeCheckStatus.available ? "Available" : "Taken"}
                        </span>
                      )}
                  </div>
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
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
                {processing ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Edit User</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.user_name}
                    onChange={(e) =>
                      setFormData({ ...formData, user_name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Country Code
                  </label>
                  <input
                    type="text"
                    value={formData.country_code}
                    onChange={(e) =>
                      setFormData({ ...formData, country_code: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Affiliate Code (Pro Parent)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.pro_parent}
                      onChange={(e) => {
                        setFormData({ ...formData, pro_parent: e.target.value });
                        if (e.target.value) {
                          checkAffiliateCode(e.target.value);
                        }
                      }}
                      className="flex-1 bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                    />
                    {codeCheckStatus.checking && (
                      <span className="text-white/60 text-sm self-center">
                        Checking...
                      </span>
                    )}
                    {!codeCheckStatus.checking &&
                      codeCheckStatus.available !== null && (
                        <span
                          className={`text-sm self-center px-3 py-1 rounded ${
                            codeCheckStatus.available
                              ? "text-green-400 bg-green-400/20"
                              : "text-red-400 bg-red-400/20"
                          }`}
                        >
                          {codeCheckStatus.available ? "Available" : "Taken"}
                        </span>
                      )}
                  </div>
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={processing}
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Updating..." : "Update User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateUsers;

