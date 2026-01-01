"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdSearch, IoMdTrash } from "react-icons/io";
import { FiPrinter, FiCopy } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

const FAQCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/support/help-categories/");
      let rawData = response.data;
      if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
        rawData = rawData.results || rawData.data || rawData.categories || [];
      }
      setData(Array.isArray(rawData) ? rawData : []);
    } catch (err: any) {
      console.error("Failed to fetch FAQ categories:", err);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/support/help-categories/${id}/`);
      // Refresh the list after successful deletion
      fetchCategories();
    } catch (err: any) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category. Please try again.");
    }
  };

  const filteredCategories = data.filter((cat) => {
    const name = String(cat.name || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            FAQ
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Categories
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FaRegFolderOpen size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl  tracking-tight">
                FAQ Categories
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage FAQ categories and organization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/faq/list">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                View FAQs
              </button>
            </Link>
            <Link href="/admin/faq/add-category">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
                <LuPlus size={20} className="stroke-[3px]" />
                Add New Category
              </button>
            </Link>
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
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={18} />
                Copy
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiPrinter size={18} />
                Print
              </button>
            </div>
            <div className="relative flex-1 min-w-[300px] max-w-md ml-auto">
              <IoMdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-xs tracking-widest">
                  <th className="px-8 py-5">ID</th>
                  <th className="px-8 py-5">Order No</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5">Created At</th>
                  <th className="px-8 py-5">Updated At</th>
                  <th className="px-8 py-5 w-[150px] text-center">Action</th>
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
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((row: any, idx: number) => {
                    const isActive = String(row.status) === "1";
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="px-8 py-5 text-white font-medium text-sm w-[100px]">
                          {row.id || 0}
                        </td>
                        <td className="px-8 py-5 text-white font-medium text-sm w-[100px]">
                          {row.order_no || 0}
                        </td>
                        <td className="px-8 py-5 text-[#98A2B3] text-sm">
                          {row.name || "N/A"}
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span
                            className={`px-4 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                              isActive
                                ? "bg-[#00C95033] text-[#05DF72] border-[#00C9504D]"
                                : "bg-[#F044381A] text-[#F04438] border-[#F0443833]"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-[#98A2B3] text-sm">
                          {formatDate(row.created_at)}
                        </td>
                        <td className="px-8 py-5 text-[#98A2B3] text-sm">
                          {formatDate(row.updated_at)}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="p-2.5 bg-[#FB2C3633] text-[#FF6467] rounded-xl hover:bg-[#F0443833] transition-all cursor-pointer"
                            >
                              <IoMdTrash size={18} />
                            </button>
                            <button onClick={() => console.log(row.id)} className="p-2.5 bg-[#2B7FFF33] text-[#51A2FF] rounded-xl hover:bg-[#AD46FF33] transition-all cursor-pointer">
                              <MdModeEditOutline size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-8 py-20 text-center text-[#98A2B3]"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex gap-3 flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A]">
            <p className="text-[#98A2B3] text-xs md:text-sm">
              Showing{" "}
              <span className="text-white font-medium">
                1-{Math.min(filteredCategories.length, 10)}
              </span>{" "}
              of{" "}
              <span className="text-white font-medium">
                {filteredCategories.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button className="md:px-4 px-3 py-1 md:py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-xs md:text-sm flex items-center gap-2 cursor-pointer">
                <IoIosArrowBack size={15} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#AD46FF] text-white font-bold text-sm shadow-[0_0_15px_-3px_#AD46FF80] cursor-pointer">
                  1
                </button>
              </div>
              <button className="md:px-4 px-3 py-1 md:py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-xs md:text-sm flex items-center gap-2 cursor-pointer">
                Next
                <IoIosArrowForward size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQCategoriesPage;
