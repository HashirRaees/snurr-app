"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import Navbar from "../../../../components/admin/Navbar";
import axiosInstance from "@/lib/axios";

const AddFAQCategory = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    order_no: "",
    status: "1", // Default to active
    icon: "fa-question", // Default icon as seen in Postman
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1. Fetch current categories to find the max ID
      const response = await axiosInstance.get("/api/support/help-categories/");
      let categories = response.data;

      // Handle paged response structure (DRF)
      if (
        categories &&
        typeof categories === "object" &&
        !Array.isArray(categories)
      ) {
        categories =
          categories.results || categories.data || categories.categories || [];
      }

      const categoryList = Array.isArray(categories) ? categories : [];
      const maxId =
        categoryList.length > 0
          ? Math.max(...categoryList.map((c: any) => parseInt(c.id) || 0))
          : 0;
      const nextId = maxId + 1;

      // 2. Submit with the calculated nextId
      const payload = {
        id: nextId,
        name: formData.name,
        order_no: parseInt(formData.order_no) || 0,
        status: parseInt(formData.status),
        icon: formData.icon || "fa-question",
      };

      await axiosInstance.post("/api/support/help-categories/", payload);
      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/faq");
      }, 1500);
    } catch (err: any) {
      console.error("Failed to add FAQ category:", err);
      // Better error display for API validation errors
      let errorMessage = "Failed to add category.";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errorMessage = err.response.data;
        } else if (typeof err.response.data === "object") {
          errorMessage = Object.entries(err.response.data)
            .map(([key, value]) => {
              const val = Array.isArray(value) ? value.join(", ") : value;
              return `${key}: ${val}`;
            })
            .join(" | ");
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#1E293980] border border-[#364153] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all";
  const labelClasses = "text-[#D1D5DC] text-sm font-medium min-w-[120px]";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Help & Support
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Add FAQ Category
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div>
            <h2 className="text-white text-3xl tracking-tight">
              Add FAQ Category
            </h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Create new FAQ category
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/faq/categories">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <IoIosArrowBack size={18} />
                Back to Categories
              </button>
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md p-8 md:p-12 mx-auto">
          <h3 className="text-white text-xl font-bold mb-10">
            Add New FAQ Category
          </h3>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-sm">
              Category added successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Name * :</label>
              <input
                type="text"
                className={inputClasses}
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Icon */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Icon :</label>
              <input
                type="text"
                className={inputClasses}
                placeholder="e.g. fa-question"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
              />
            </div>

            {/* Order No */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Order No :</label>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="number"
                  className={inputClasses}
                  placeholder="e.g. 1"
                  value={formData.order_no}
                  onChange={(e) =>
                    setFormData({ ...formData, order_no: e.target.value })
                  }
                />
                <p className="text-[#98A2B3] text-xs">
                  Enter order number for listing
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Status :</label>
              <div className="flex flex-col gap-2 w-full">
                <select
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                <p className="text-[#98A2B3] text-xs">
                  Select visibility status
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start md:ml-[136px] pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(45,127,255,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FiSave size={18} />
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddFAQCategory;
