"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch, IoMdClose, IoMdTrash, IoMdCreate } from "react-icons/io";
import Link from "next/link";
import { FiCopy, FiPrinter, FiPlus, FiEye, FiEdit, FiXCircle, FiCheckCircle, FiFile } from "react-icons/fi";
import { HiDocumentText } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axiosInstance from "@/lib/axios";

interface MediaItem {
  id: number;
  name: string;
  type: string;
  template_type?: string;
  added_at: string;
  created_at?: string; // Fallback
  status: boolean | string;
  file?: string;
  text_content?: string;
}

const MediaDetailsModal = ({
  isOpen,
  onClose,
  media,
}: {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem | null;
}) => {
  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-2xl bg-[#101828] border border-[#1E2939] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#ffffff10]">
          <div>
            <h3 className="text-xl font-bold text-white">{media.name}</h3>
            <p className="text-sm text-[#98A2B3] mt-1">
              {media.type} • {media.template_type || "No Template Type"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#98A2B3] hover:text-white hover:bg-[#ffffff10] rounded-full transition-colors cursor-pointer"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#1E293B40] p-4 rounded-xl border border-[#ffffff05]">
              <span className="text-xs text-[#98A2B3] uppercase tracking-wider font-semibold">
                Status
              </span>
              <div
                className={`mt-2 inline-flex px-3 py-1 ml-3 rounded-full text-xs font-medium border ${media.status === true ||
                    String(media.status) === "true" ||
                    media.status === "Active"
                    ? "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]"
                    : "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                  }`}
              >
                {media.status === true || String(media.status) === "true"
                  ? "Active"
                  : "Inactive"}
              </div>
            </div>
            <div className="bg-[#1E293B40] p-4 rounded-xl border border-[#ffffff05]">
              <span className="text-xs text-[#98A2B3] uppercase tracking-wider font-semibold">
                Added On
              </span>
              <p className="text-white mt-2 font-medium">
                {media.added_at
                  ? new Date(media.added_at).toLocaleString()
                  : media.created_at
                    ? new Date(media.created_at).toLocaleString()
                    : "-"}
              </p>
            </div>
          </div>

          {/* Media Content Area */}
          <div className="space-y-4">
            <h4 className="text-sm text-[#98A2B3] uppercase tracking-wider font-semibold">
              Content Preview
            </h4>

            {/* Text Content */}
            {media.text_content && (
              <div className="bg-[#1E293B] p-4 rounded-xl border border-[#ffffff10] text-[#D1D5DC] whitespace-pre-wrap leading-relaxed">
                {media.text_content}
              </div>
            )}

            {/* File Content (Image) */}
            {media.file &&
              (media.type?.toLowerCase() === "image" ||
                media.file.match(/\.(jpeg|jpg|gif|png|webp)$/i)) && (
                <div className="rounded-xl overflow-hidden border border-[#ffffff10]">
                  <img
                    src={media.file}
                    alt={media.name}
                    className="w-full h-auto object-contain max-h-[400px] bg-black/40"
                  />
                </div>
              )}

            {/* File Content (Video/Other) - generic link for now */}
            {media.file &&
              media.type?.toLowerCase() !== "image" &&
              !media.file.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (
                <div className="flex items-center gap-3 bg-[#1E293B] p-4 rounded-xl border border-[#ffffff10]">
                  <HiDocumentText className="text-[#AD46FF]" size={24} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm truncate">
                      {media.file.split("/").pop()}
                    </p>
                  </div>
                  <a
                    href={media.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#AD46FF] hover:bg-[#9726FF] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Download
                  </a>
                </div>
              )}

            {!media.text_content && !media.file && (
              <div className="text-center py-10 text-[#667085]">
                No preview content available.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#ffffff10] bg-[#101828]">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#1E293B] hover:bg-[#2C3B55] text-white font-bold rounded-xl transition-all border border-[#ffffff10]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AffiliateMediaList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMediaData, setViewMediaData] = useState<any>(null);
  const [loadingView, setLoadingView] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "image",
    status: 1,
  });

  const [templateFormData, setTemplateFormData] = useState({
    name: "",
    template_type: "image",
    file_type: "image",
    promotional_text: "",
    status: 1,
  });

  const fetchMedia = async (url?: string) => {
    try {
      setLoading(true);
      const endpoint = url || "/api/affiliates/affiliate-media/";
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
    } catch (err) {
      console.error(err);
      setError("Failed to fetch media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleViewMedia = async (id: number) => {
    try {
      setLoadingView(true);
      setShowViewModal(true);
      const response = await axiosInstance.get(
        `/api/affiliates/affiliate-media/${id}/view/`
      );
      setViewMediaData(response.data);
    } catch (err: any) {
      console.error("Failed to fetch media details:", err);
      alert("Failed to load media details.");
    } finally {
      setLoadingView(false);
    }
  };

  const handleCreateClick = () => {
    setFormData({
      name: "",
      type: "image",
      status: 1,
    });
    setShowCreateModal(true);
  };

  const handleEditClick = (media: MediaItem) => {
    const statusValue = typeof media.status === "boolean"
      ? (media.status ? 1 : 0)
      : typeof media.status === "string"
        ? (media.status === "1" || media.status === "true" ? 1 : 0)
        : (media.status === 1 ? 1 : 0);

    setFormData({
      name: media.name || "",
      type: media.type || "image",
      status: statusValue,
    });
    setSelectedMedia(media);
    setShowEditModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this media?")) {
      return;
    }

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-media/${id}/`);
      alert("Media deleted successfully!");
      fetchMedia();
    } catch (err: any) {
      console.error("Failed to delete media:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete media.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const payload: any = {};
      if (formData.name?.trim()) payload.name = formData.name.trim();
      if (formData.type?.trim()) payload.type = formData.type.trim();
      if (formData.status !== undefined) payload.status = formData.status;

      await axiosInstance.post("/api/affiliates/affiliate-media/", payload);
      alert("Media created successfully!");
      setShowCreateModal(false);
      fetchMedia();
    } catch (err: any) {
      console.error("Failed to create media:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to create media.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedMedia) return;

    if (!formData.name || !formData.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const payload: any = {};
      if (formData.name?.trim()) payload.name = formData.name.trim();
      if (formData.type?.trim()) payload.type = formData.type.trim();
      if (formData.status !== undefined) payload.status = formData.status;

      await axiosInstance.patch(
        `/api/affiliates/affiliate-media/${selectedMedia.id}/`,
        payload
      );
      alert("Media updated successfully!");
      setShowEditModal(false);
      setSelectedMedia(null);
      fetchMedia();
    } catch (err: any) {
      console.error("Failed to update media:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to update media.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateFormData.name || !templateFormData.template_type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setProcessing(true);
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("name", templateFormData.name);
      formDataToSend.append("template_type", templateFormData.template_type);
      formDataToSend.append("file_type", templateFormData.file_type);
      if (templateFormData.status !== undefined) {
        formDataToSend.append("status", String(templateFormData.status));
      }

      // Add promotional text if file_type is text
      if (templateFormData.file_type === "text" && templateFormData.promotional_text) {
        formDataToSend.append("promotional_text", templateFormData.promotional_text);
      }

      // Add files if file_type is not text
      if (templateFormData.file_type !== "text" && fileInputRef.current?.files) {
        const files = fileInputRef.current.files;
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append("files", files[i]);
        }
      }

      await axiosInstance.post(
        "/api/affiliates/affiliate-media/save-template/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Template saved successfully!");
      setShowTemplateModal(false);
      setTemplateFormData({
        name: "",
        template_type: "image",
        file_type: "image",
        promotional_text: "",
        status: 1,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchMedia();
    } catch (err: any) {
      console.error("Failed to save template:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to save template.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: any) => {
    try {
      const isCurrentlyActive =
        currentStatus === true ||
        currentStatus === "true" ||
        currentStatus === "1" ||
        currentStatus === 1;
      const newStatus = isCurrentlyActive ? 0 : 1;
      await axiosInstance.patch(`/api/affiliates/affiliate-media/${id}/`, {
        status: newStatus,
      });
      fetchMedia();
    } catch (err: any) {
      console.error("Failed to toggle status:", err);
      alert("Failed to update status.");
    }
  };

  const StatusBadge = ({ status }: { status: any }) => {
    const isActive =
      status === true ||
      status === "true" ||
      status === "1" ||
      status === 1;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs border ${isActive
            ? "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]"
            : "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
          }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const COLUMNS = [
    { header: "NAME", key: "name" },
    { header: "TYPE", key: "type" },
    { header: "ADDED AT", key: "added_at", isDate: true },
    { header: "STATUS", key: "status", isStatus: true },
    { header: "ACTIONS", key: "actions", isAction: true },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <span className="text-[#C27AFF] font-medium">MultiMedia</span>
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
          <div>
            <h2 className="text-white text-3xl font-heading">
              Affiliate MultiMedia
            </h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Manage affiliate media templates and resources
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/affiliate/media-files">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#2B7FFF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
                <FiFile size={20} />
                Media Files
              </button>
            </Link>
            <button
              onClick={() => {
                setTemplateFormData({
                  name: "",
                  template_type: "image",
                  file_type: "image",
                  promotional_text: "",
                  status: 1,
                });
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
                setShowTemplateModal(true);
              }}
              className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#F79009] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <FiPlus size={20} />
              Save Template
            </button>
            <button
              onClick={handleCreateClick}
              className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <FiPlus size={20} />
              Add New
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Controls */}
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-5 py-2.5 bg-[#1E293966] border border-[#364153] rounded-xl text-[#98A2B3] text-sm font-medium flex items-center gap-2 hover:text-white hover:bg-[#1E2939] transition-all cursor-pointer">
                Copy
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#1E293966] border border-[#364153] rounded-xl text-[#98A2B3] text-sm font-medium flex items-center gap-2 hover:text-white hover:bg-[#1E2939] transition-all cursor-pointer">
                <FiPrinter size={16} /> Print
              </button>
            </div>
            <div className="relative w-full max-w-xs">
              <IoMdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl py-2.5 pl-12 pr-4 text-white text-sm placeholder:text-[#98A2B3] focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest">
                  {COLUMNS.map((col) => (
                    <th key={col.key} className="px-8 py-5">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={COLUMNS.length}
                      className="text-center py-20 text-white"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="text-white hover:bg-white/5 transition-colors"
                    >
                      {COLUMNS.map((col) => (
                        <td key={col.key} className="px-8 py-5 text-sm">
                          {col.isStatus ? (
                            <span
                              className={`px-3 py-1 rounded-full text-xs border ${row.status === true || row.status === "Active"
                                  ? "bg-[#12B76A1A] text-[#12B76A] border-[#12B76A33]"
                                  : "bg-[#F790091A] text-[#F79009] border-[#F7900933]"
                                }`}
                            >
                              {row.status === true
                                ? "Active"
                                : row.status === false
                                  ? "Inactive"
                                  : row.status}
                            </span>
                          ) : col.isDate ? (
                            <span>
                              {row.added_at
                                ? new Date(row.added_at).toLocaleString()
                                : row.created_at
                                  ? new Date(row.created_at).toLocaleString()
                                  : "-"}
                            </span>
                          ) : col.isAction ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewMedia(row.id)}
                                className="p-2 bg-[#2B7FFF33] text-[#51A2FF] rounded-lg hover:bg-[#AD46FF33] transition-all"
                                title="View"
                              >
                                <FiEye size={16} />
                              </button>
                              <button
                                onClick={() => handleEditClick(row)}
                                className="p-2 bg-[#F7900933] text-[#F79009] rounded-lg hover:bg-[#F790094D] transition-all"
                                title="Edit"
                              >
                                <FiEdit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(row.id)}
                                disabled={processing}
                                className="p-2 bg-[#FB2C3633] text-[#FF6467] rounded-lg hover:bg-[#F0443833] transition-all disabled:opacity-50"
                                title="Delete"
                              >
                                <IoMdTrash size={16} />
                              </button>
                              <button
                                onClick={() => handleToggleStatus(row.id, row.status)}
                                className={`p-2 rounded-lg transition-all ${row.status === true || row.status === "true" || row.status === "1" || (typeof row.status === "number" && row.status === 1)
                                    ? "bg-[#12B76A33] text-[#12B76A] hover:bg-[#12B76A4D]"
                                    : "bg-[#F7900933] text-[#F79009] hover:bg-[#F790094D]"
                                  }`}
                                title="Toggle Status"
                              >
                                {row.status === true || row.status === "true" || row.status === "1" || (typeof row.status === "number" && row.status === 1) ? (
                                  <FiCheckCircle size={16} />
                                ) : (
                                  <FiXCircle size={16} />
                                )}
                              </button>
                            </div>
                          ) : (
                            (row[col.key as keyof MediaItem] as string) || "-"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={COLUMNS.length}>
                      <div className="flex flex-col items-center justify-center py-32 text-[#98A2B3]">
                        <HiDocumentText size={64} className="opacity-20 mb-4" />
                        <p className="text-[#98A2B3] text-lg">
                          No data available in table
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex flex-col md:flex-row gap-3 items-center justify-between border-t border-[#C27AFF1A]">
            <p className="text-[#98A2B3] text-xs md:text-sm">
              Showing {filteredData.length > 0 ? "1" : "0"} to{" "}
              {Math.min(filteredData.length, 10)} of {filteredData.length}{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer text-sm font-medium">
                <IoIosArrowBack size={16} />
                Previous
              </button>
              <button className="px-4 py-2 border flex gap-2 items-center border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] cursor-pointer text-sm font-medium">
                Next
                <IoIosArrowForward size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* View Media Modal */}
        {showViewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">
                  Media Details
                </h3>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewMediaData(null);
                  }}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              <div className="p-6">
                {loadingView ? (
                  <div className="text-white text-center py-10">Loading...</div>
                ) : viewMediaData ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[#98A2B3] text-sm mb-2 block">Name</label>
                        <p className="text-white">{viewMediaData.name}</p>
                      </div>
                      <div>
                        <label className="text-[#98A2B3] text-sm mb-2 block">Type</label>
                        <p className="text-white">{viewMediaData.type}</p>
                      </div>
                      <div>
                        <label className="text-[#98A2B3] text-sm mb-2 block">Status</label>
                        <StatusBadge status={viewMediaData.status} />
                      </div>
                      <div>
                        <label className="text-[#98A2B3] text-sm mb-2 block">Created At</label>
                        <p className="text-white">
                          {new Date(viewMediaData.created_at).toLocaleString()}
                        </p>
                      </div>
                      {viewMediaData.instruction && (
                        <div className="md:col-span-2">
                          <label className="text-[#98A2B3] text-sm mb-2 block">Instruction</label>
                          <p className="text-white bg-[#0F172A] p-4 rounded-xl">
                            {viewMediaData.instruction}
                          </p>
                        </div>
                      )}
                    </div>
                    {viewMediaData.files && viewMediaData.files.length > 0 && (
                      <div>
                        <label className="text-[#98A2B3] text-sm mb-4 block">Files</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {viewMediaData.files.map((file: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-[#0F172A] p-4 rounded-xl border border-[#C27AFF21]"
                            >
                              <p className="text-white text-sm mb-2">{file.name || "File"}</p>
                              <p className="text-[#98A2B3] text-xs mb-2">Type: {file.type}</p>
                              {file.source && (
                                <div className="mt-2">
                                  {file.type === "text" ? (
                                    <p className="text-white text-sm">{file.source}</p>
                                  ) : (
                                    <img
                                      src={file.source}
                                      alt={file.name}
                                      className="max-w-full h-auto rounded-lg"
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-white text-center py-10">No data available</div>
                )}
              </div>
              <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewMediaData(null);
                  }}
                  className="w-full px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Media Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">Create Media</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
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
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: parseInt(e.target.value) })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
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
                  {processing ? "Creating..." : "Create Media"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Media Modal */}
        {showEditModal && selectedMedia && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">Edit Media</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMedia(null);
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
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: parseInt(e.target.value) })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="sticky bottom-0 bg-[#1E293B] border-t border-[#C27AFF21] p-6 flex items-center justify-end gap-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMedia(null);
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
                  {processing ? "Updating..." : "Update Media"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Template Modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#1E293B] border-b border-[#C27AFF21] p-6 flex items-center justify-between">
                <h3 className="text-white text-2xl font-bold">Save Template</h3>
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setTemplateFormData({
                      name: "",
                      template_type: "image",
                      file_type: "image",
                      promotional_text: "",
                      status: 1,
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Template Name *</label>
                  <input
                    type="text"
                    value={templateFormData.name}
                    onChange={(e) =>
                      setTemplateFormData({ ...templateFormData, name: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Template Type *</label>
                  <select
                    value={templateFormData.template_type}
                    onChange={(e) =>
                      setTemplateFormData({ ...templateFormData, template_type: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">File Type *</label>
                  <select
                    value={templateFormData.file_type}
                    onChange={(e) =>
                      setTemplateFormData({ ...templateFormData, file_type: e.target.value })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="text">Text</option>
                  </select>
                </div>
                {templateFormData.file_type === "text" && (
                  <div>
                    <label className="text-[#D1D5DC] text-sm mb-2 block">Promotional Text</label>
                    <textarea
                      value={templateFormData.promotional_text}
                      onChange={(e) =>
                        setTemplateFormData({ ...templateFormData, promotional_text: e.target.value })
                      }
                      rows={4}
                      className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none resize-none"
                    />
                  </div>
                )}
                {templateFormData.file_type !== "text" && (
                  <div>
                    <label className="text-[#D1D5DC] text-sm mb-2 block">Files</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="text-[#D1D5DC] text-sm mb-2 block">Status</label>
                  <select
                    value={templateFormData.status}
                    onChange={(e) =>
                      setTemplateFormData({ ...templateFormData, status: parseInt(e.target.value) })
                    }
                    className="w-full bg-[#C27AFF21] border border-[#C27AFF] rounded-xl px-4 py-3 text-white focus:outline-none"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
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
                  onClick={handleSaveTemplate}
                  disabled={processing}
                  className="px-6 py-2.5 bg-[#12B76A] rounded-xl text-white text-sm hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? "Saving..." : "Save Template"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        <MediaDetailsModal
          isOpen={!!selectedMedia && !showViewModal}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
        />
      </main>
    </div>
  );
};

export default AffiliateMediaList;
