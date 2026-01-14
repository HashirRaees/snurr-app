"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdClose, IoMdTrash, IoMdDownload } from "react-icons/io";
import {
  FiFilter,
  FiFile,
  FiFilePlus,
  FiEdit,
  FiImage,
} from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiDocumentText } from "react-icons/hi";

const AffiliateMediaFiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    parent_media: "",
    name: "",
    type: "image",
    promotional_text: "",
  });

  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    type: "image",
    promotional_text: "",
  });

  const fetchMediaFiles = async (url?: string) => {
    try {
      setLoading(true);
      const endpoint = url || "/api/affiliates/affiliate-media-files/";
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
      setError("Failed to fetch media files.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaList = async () => {
    try {
      const response = await axiosInstance.get("/api/affiliates/affiliate-media/");
      if (response.data) {
        const media = response.data.results || response.data;
        setMediaList(Array.isArray(media) ? media : []);
      }
    } catch (err) {
      console.error("Failed to fetch media list:", err);
    }
  };

  useEffect(() => {
    fetchMediaFiles();
    fetchMediaList();
  }, []);

  const handleCreateClick = () => {
    setFormData({
      parent_media: "",
      name: "",
      type: "image",
      promotional_text: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowCreateModal(true);
  };

  const handleEditClick = (file: any) => {
    setSelectedFile(file);
    setUpdateFormData({
      name: file.name || "",
      type: file.type || "image",
      promotional_text: file.type === "text" ? file.source || "" : "",
    });
    if (updateFileInputRef.current) {
      updateFileInputRef.current.value = "";
    }
    setShowEditModal(true);
  };

  const handleViewClick = (file: any) => {
    setSelectedFile(file);
    setShowViewModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this media file?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-media-files/${id}/`);
      alert("Media file deleted successfully!");
      fetchMediaFiles();
    } catch (err: any) {
      console.error("Failed to delete file:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete file.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      const response = await axiosInstance.get(
        `/api/affiliates/affiliate-media-files/${id}/download/`,
        {
          responseType: "blob",
        }
      );
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `file-${id}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Failed to download file:", err);
      alert("Failed to download file.");
    }
  };

  const handleSave = async () => {
    if (!formData.parent_media || !formData.name || !formData.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const formDataToSend = new FormData();

      formDataToSend.append("parent_media", formData.parent_media);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);

      if (formData.type === "text") {
        if (formData.promotional_text) {
          formDataToSend.append("promotional_text", formData.promotional_text);
        }
      } else {
        if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
          const files = fileInputRef.current.files;
          for (let i = 0; i < files.length; i++) {
            formDataToSend.append("files", files[i]);
          }
        }
      }

      await axiosInstance.post(
        "/api/affiliates/affiliate-media-files/save/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File saved successfully!");
      setShowCreateModal(false);
      setFormData({
        parent_media: "",
        name: "",
        type: "image",
        promotional_text: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchMediaFiles();
    } catch (err: any) {
      console.error("Failed to save file:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to save file.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedFile) return;

    if (!updateFormData.name || !updateFormData.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const formDataToSend = new FormData();

      formDataToSend.append("name", updateFormData.name);
      formDataToSend.append("type", updateFormData.type);

      if (updateFormData.type === "text") {
        if (updateFormData.promotional_text) {
          formDataToSend.append("promotional_text", updateFormData.promotional_text);
        }
      } else {
        if (updateFileInputRef.current?.files && updateFileInputRef.current.files.length > 0) {
          formDataToSend.append("file", updateFileInputRef.current.files[0]);
        }
      }

      await axiosInstance.post(
        `/api/affiliates/affiliate-media-files/${selectedFile.id}/update/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File updated successfully!");
      setShowEditModal(false);
      setSelectedFile(null);
      fetchMediaFiles();
    } catch (err: any) {
      console.error("Failed to update file:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update file.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const filteredFiles = (data || []).filter((row: any) => {
    if (!row) return false;
    const searchStr = searchTerm.toLowerCase();
    const name = String(row.name || "").toLowerCase();
    const type = String(row.type || "").toLowerCase();
    const source = String(row.source || "").toLowerCase();
    return (
      name.includes(searchStr) ||
      type.includes(searchStr) ||
      source.includes(searchStr)
    );
  });

  const totalFiles = pagination.count || data.length;

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
          <span className="text-[#C27AFF] font-medium">Media Files</span>
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
              <FiFile size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate Media Files
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage media files and resources
              </p>
            </div>
          </div>
          <button
            onClick={handleCreateClick}
            className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
          >
            <FiFilePlus size={18} />
            Add New File
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#AD46FF33] flex items-center justify-center text-[#C27AFF]">
              <FiFile size={24} />
            </div>
            <div>
              <p className="text-[#98A2B3] text-sm font-medium">Total Files</p>
              <p className="text-white text-2xl font-bold mt-1">
                {loading ? "..." : totalFiles}
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
                placeholder="Search by name, type, or source..."
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
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Parent Media</th>
                  <th className="px-8 py-5">Type</th>
                  <th className="px-8 py-5">Source</th>
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
                        <td colSpan={6} className="px-8 py-5">
                          <div className="h-4 bg-white/5 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredFiles.length > 0 ? (
                  filteredFiles.map((row: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-5 text-white font-medium text-sm">
                        {row.name || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.parent_media || "N/A"}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs border ${
                            row.type === "image"
                              ? "bg-[#2B7FFF1A] text-[#51A2FF] border-[#2B7FFF33]"
                              : row.type === "text"
                              ? "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                              : "bg-white/10 text-white border-white/20"
                          }`}
                        >
                          {row.type || "N/A"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                        {row.source || "N/A"}
                      </td>
                      <td className="px-8 py-5 text-[#98A2B3] text-sm">
                        {row.created_at
                          ? new Date(row.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDownload(row.id)}
                            className="p-2.5 bg-[#12B76A33] text-[#12B76A] rounded-xl hover:bg-[#12B76A4D] transition-all cursor-pointer"
                            title="Download"
                          >
                            <IoMdDownload size={18} />
                          </button>
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
                            <FiImage size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No media files found.
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
                1-{Math.min(filteredFiles.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredFiles.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (pagination.previous) {
                    fetchMediaFiles(pagination.previous);
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
                    fetchMediaFiles(pagination.next);
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

      {/* View File Modal */}
      {showViewModal && selectedFile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">File Details</h3>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFile(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Name</label>
                  <p className="text-white">{selectedFile.name}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Parent Media ID</label>
                  <p className="text-white">{selectedFile.parent_media}</p>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Type</label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border ${
                      selectedFile.type === "image"
                        ? "bg-[#2B7FFF1A] text-[#51A2FF] border-[#2B7FFF33]"
                        : selectedFile.type === "text"
                        ? "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                        : "bg-white/10 text-white border-white/20"
                    }`}
                  >
                    {selectedFile.type}
                  </span>
                </div>
                <div>
                  <label className="text-[#98A2B3] text-sm mb-2 block">Created At</label>
                  <p className="text-white">
                    {new Date(selectedFile.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[#98A2B3] text-sm mb-2 block">Source</label>
                  {selectedFile.type === "text" ? (
                    <div className="bg-[#0F172A] p-4 rounded-xl">
                      <p className="text-white whitespace-pre-wrap">
                        {selectedFile.source}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#0F172A] p-4 rounded-xl">
                      <p className="text-white break-all">{selectedFile.source}</p>
                      {selectedFile.source && (
                        <img
                          src={selectedFile.source}
                          alt={selectedFile.name}
                          className="mt-4 max-w-full h-auto rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedFile(null);
                }}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create File Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Add Media File</h3>
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
                  Parent Media *
                </label>
                <select
                  value={formData.parent_media}
                  onChange={(e) =>
                    setFormData({ ...formData, parent_media: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                >
                  <option value="">Select Parent Media</option>
                  {mediaList.map((media) => (
                    <option key={media.id} value={media.id}>
                      {media.name} (ID: {media.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                >
                  <option value="image">Image</option>
                  <option value="text">Text</option>
                </select>
              </div>
              {formData.type === "text" ? (
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Promotional Text
                  </label>
                  <textarea
                    value={formData.promotional_text}
                    onChange={(e) =>
                      setFormData({ ...formData, promotional_text: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none resize-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Files *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              )}
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
                onClick={handleSave}
                disabled={processing}
                className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Saving..." : "Save File"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit File Modal */}
      {showEditModal && selectedFile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
              <h3 className="text-white text-2xl font-bold">Edit Media File</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedFile(null);
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">Name *</label>
                <input
                  type="text"
                  value={updateFormData.name}
                  onChange={(e) =>
                    setUpdateFormData({ ...updateFormData, name: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[#D1D5DC] text-sm mb-2 block">Type *</label>
                <select
                  value={updateFormData.type}
                  onChange={(e) =>
                    setUpdateFormData({ ...updateFormData, type: e.target.value })
                  }
                  className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                >
                  <option value="image">Image</option>
                  <option value="text">Text</option>
                </select>
              </div>
              {updateFormData.type === "text" ? (
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    Promotional Text
                  </label>
                  <textarea
                    value={updateFormData.promotional_text}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        promotional_text: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none resize-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">
                    New File (leave empty to keep current)
                  </label>
                  <input
                    ref={updateFileInputRef}
                    type="file"
                    accept="image/*"
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  />
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedFile(null);
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
                {processing ? "Updating..." : "Update File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateMediaFiles;

