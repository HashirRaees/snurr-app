"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import Navbar from "../../../../components/admin/Navbar";
import axiosInstance from "@/lib/axios";

const AddFAQPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
    order_no: "1",
    status: "1", // Default to Active (1)
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/support/help-categories/"
        );
        let data = response.data;
        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = data.results || data.data || [];
        }
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // 1. Fetch current FAQs to find the max ID
      const faqRes = await axiosInstance.get("/api/support/faqs/");
      let faqs = faqRes.data;
      if (faqs && typeof faqs === "object" && !Array.isArray(faqs)) {
        faqs = faqs.results || faqs.data || [];
      }

      const faqList = Array.isArray(faqs) ? faqs : [];
      const maxId =
        faqList.length > 0
          ? Math.max(...faqList.map((f: any) => parseInt(f.id) || 0))
          : 0;
      const nextId = maxId + 1;

      // 2. Prepare payload
      const payload = {
        id: nextId,
        category: parseInt(formData.category),
        question: formData.question,
        answer: formData.answer,
        order_no: parseInt(formData.order_no) || 1,
        status: parseInt(formData.status),
      };

      await axiosInstance.post("/api/support/faqs/", payload);
      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/faq/list");
      }, 1500);
    } catch (err: any) {
      console.error("Failed to add FAQ:", err);
      let errorMsg = "Failed to add FAQ. Please check all required fields.";
      if (err.response?.data) {
        const details = err.response.data;
        if (typeof details === "object") {
          errorMsg = Object.entries(details)
            .map(([key, val]) => `${key}: ${val}`)
            .join(" | ");
        }
      }
      setError(errorMsg);
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
          <span className="text-[#C27AFF] font-medium">Help & Support</span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] font-medium">Add FAQ</span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div>
            <h2 className="text-white text-3xl tracking-tight">Add FAQ</h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Create new Faq question
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/faq/list">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <IoIosArrowBack size={18} />
                Back to List
              </button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-500 text-sm">
            FAQ added successfully! Redirecting...
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md p-8 md:p-12 mx-auto"
        >
          <h3 className="text-white text-xl font-bold mb-10">Add New FAQ</h3>

          <div className="space-y-8">
            {/* Category */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Category * :</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className={`${inputClasses} appearance-none cursor-pointer`}
              >
                <option value="">Select a category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Question */}
            <div className="flex flex-col md:flex-row gap-4">
              <label className={`${labelClasses} mt-3`}>Question * :</label>
              <textarea
                name="question"
                required
                value={formData.question}
                onChange={handleChange}
                className={`${inputClasses} min-h-[120px] resize-none`}
                placeholder="enter question text"
              />
            </div>

            {/* Answer */}
            <div className="flex flex-col md:flex-row gap-4">
              <label className={`${labelClasses} mt-3`}>Answer * :</label>
              <textarea
                name="answer"
                required
                value={formData.answer}
                onChange={handleChange}
                className={`${inputClasses} min-h-[120px] resize-none`}
                placeholder="enter answer against your question"
              />
            </div>

            {/* Attachments (Placeholder as requested) */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 opacity-50">
              <label className={labelClasses}>Attachments :</label>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-white text-xs font-bold cursor-not-allowed transition-all">
                    Choose Files
                    <input type="file" className="hidden" disabled multiple />
                  </label>
                  <span className="text-[#98A2B3] text-sm">No file chosen</span>
                </div>
                <p className="text-[#98A2B3] text-xs">
                  Attach images/files (placeholder)
                </p>
              </div>
            </div>

            {/* Order No */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Order No * :</label>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="number"
                  name="order_no"
                  required
                  value={formData.order_no}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="e.g. 1"
                />
                <p className="text-[#98A2B3] text-xs">Enter order sequence</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Status :</label>
              <div className="flex flex-col gap-2 w-full">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                <p className="text-[#98A2B3] text-xs">Select FAQ status</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start md:ml-[136px] pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(45,127,255,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Adding..."
                ) : (
                  <>
                    <FiSave size={18} />
                    Add FAQ
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddFAQPage;
