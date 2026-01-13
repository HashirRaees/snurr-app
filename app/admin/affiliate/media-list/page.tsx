"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import Link from "next/link";
import { FiCopy, FiPrinter, FiPlus, FiEye } from "react-icons/fi";
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
                className={`mt-2 inline-flex px-3 py-1 ml-3 rounded-full text-xs font-medium border ${
                  media.status === true ||
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

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/affiliates/affiliate-media/"
        );
        // Handle various response structures: array, or object with results/data
        let rawData = response.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
          rawData = rawData.results || rawData.data || [];
        }
        setData(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch media.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const COLUMNS = [
    { header: "NAME", key: "name" },
    { header: "TYPE", key: "type" },
    { header: "ADDED AT", key: "added_at", isDate: true },
    { header: "STATUS", key: "status", isStatus: true },
    { header: "VIEW", key: "view", isAction: true },
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
          <div>
            <h2 className="text-white text-3xl font-heading">
              Affiliate MultiMedia
            </h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Manage affiliate media templates and resources
            </p>
          </div>
          <Link href="/admin/affiliate/add-media">
            <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
              <FiPlus size={20} />
              Add New
            </button>
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Controls */}
          <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="px-5 py-2.5 bg-[#1E293966] border border-[#364153] rounded-xl text-[#98A2B3] text-sm font-medium flex items-center gap-2 hover:text-white hover:bg-[#1E2939] transition-all cursor-pointer">
                Copy
              </button>
              <button className="px-5 py-2.5 bg-[#1E293966] border border-[#364153] rounded-xl text-[#98A2B3] text-sm font-medium flex items-center gap-2 hover:text-white hover:bg-[#1E2939] transition-all cursor-pointer">
                Print
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
                              className={`px-3 py-1 rounded-full text-xs border ${
                                row.status === true || row.status === "Active"
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
                            <button
                              onClick={() => setSelectedMedia(row)}
                              className="p-2 bg-[#2B7FFF33] text-[#51A2FF] rounded-lg hover:bg-[#AD46FF33] transition-all"
                            >
                              <FiEye size={16} />
                            </button>
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

        {/* Modal */}
        <MediaDetailsModal
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
        />
      </main>
    </div>
  );
};

export default AffiliateMediaList;
