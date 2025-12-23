"use client";

import { useState } from "react";
import Link from "next/link";
import { IoIosArrowBack, IoMdSave } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { FiSave } from "react-icons/fi";
import Navbar from "../../../../components/admin/Navbar";

const AddFAQPage = () => {
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    answer: "",
    orderNo: "",
    status: "",
  });

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
            Add FAQ
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div>
            <h2 className="text-white text-3xl tracking-tight">Add FAQ</h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Create new FAQ category or question
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/faq/list">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <IoIosArrowBack size={18} />
                Back to List
              </button>
            </Link>
            <Link href="/admin/faq/list">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
                FAQ List
              </button>
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md p-8 md:p-12 mx-auto">
          <h3 className="text-white text-xl font-bold mb-10">Add New FAQ</h3>

          <div className="space-y-8">
            {/* Category */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Category * :</label>
              <input type="text" className={inputClasses} placeholder="" />
            </div>

            {/* Question */}
            <div className="flex flex-col md:flex-row gap-4">
              <label className={`${labelClasses} mt-3`}>Question * :</label>
              <textarea
                className={`${inputClasses} min-h-[120px] resize-none`}
                placeholder="enter question text"
              />
            </div>

            {/* Answer */}
            <div className="flex flex-col md:flex-row gap-4">
              <label className={`${labelClasses} mt-3`}>Answer * :</label>
              <textarea
                className={`${inputClasses} min-h-[120px] resize-none`}
                placeholder="enter answer against your question"
              />
            </div>

            {/* Attachments */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Attachments :</label>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-[#1E293B] transition-all">
                    Choose Files
                    <input type="file" className="hidden" multiple />
                  </label>
                  <span className="text-[#98A2B3] text-sm">No file chosen</span>
                </div>
                <p className="text-[#98A2B3] text-xs">
                  Attach images/files (if any)
                </p>
              </div>
            </div>

            {/* Order No */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Order No * :</label>
              <div className="flex flex-col gap-2 w-full">
                <input type="text" className={inputClasses} placeholder="" />
                <p className="text-[#98A2B3] text-xs text-right md:text-left">
                  Enter number of order to show in list
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className={labelClasses}>Status :</label>
              <div className="flex flex-col gap-2 w-full">
                <select
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="">Select this status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <p className="text-[#98A2B3] text-xs text-right md:text-left">
                  Select this status
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start md:ml-[136px] pt-4">
              <button className="px-8 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(45,127,255,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                <FiSave size={18} />
                Add
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddFAQPage;
