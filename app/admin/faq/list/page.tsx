"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiPrinter, FiCopy } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";

const FAQListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      orderNo: 1,
      question: "How Can I Deposit Money?",
      answer: "To make a deposit, log in...",
      status: "Active",
    },
    {
      orderNo: 2,
      question: "Can I try out the games w...",
      answer: "On game selection you can...",
      status: "Active",
    },
    {
      orderNo: 3,
      question: "How do I request a withdr...",
      answer: "To request a withdrawal...",
      status: "Active",
    },
    {
      orderNo: 4,
      question: "Does Propersix offer free...",
      answer: "There are multiple offe...",
      status: "Active",
    },
    {
      orderNo: 5,
      question: "Are casino games fair?",
      answer: "Casino results are proved...",
      status: "Active",
    },
    {
      orderNo: 6,
      question: "Do I need to be a client...",
      answer: "You can try demo versions...",
      status: "Active",
    },
    {
      orderNo: 7,
      question: "What happens if I lose lo...",
      answer: "Lorem ipsum dolor sit ame...",
      status: "Inactive",
    },
    {
      orderNo: 8,
      question: "I run into a technical pr...",
      answer: "We've thoroughly tested a...",
      status: "Active",
    },
    {
      orderNo: 9,
      question: "Fort Testing",
      answer: "For Testing",
      status: "Active",
    },
    {
      orderNo: 10,
      question: "Where can I see my transa...",
      answer: "To view your transaction...",
      status: "Active",
    },
  ];

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
            FAQs
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FaRegQuestionCircle size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl tracking-tight">FAQ List</h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage frequently asked questions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/faq/categories">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                Categories
              </button>
            </Link>
            <Link href="/admin/faq/add">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer">
                <LuPlus size={20} className="stroke-[3px]" />
                Add New
              </button>
            </Link>
          </div>
        </div>

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
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-5 w-[100px]">Order No</th>
                  <th className="px-8 py-5">Question</th>
                  <th className="px-8 py-5">Answer</th>
                  <th className="px-8 py-5 w-[120px] text-center">Status</th>
                  <th className="px-8 py-5 w-[120px] text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {faqs.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-8 py-5 text-white font-medium text-sm w-[100px]">
                      {row.orderNo}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                      {row.question}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[300px] truncate">
                      {row.answer}
                    </td>
                    <td className="px-8 py-5 w-[120px] text-center">
                      <span
                        className={`px-4 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                          row.status === "Active"
                            ? "bg-[#00C95033] text-[#05DF72] border-[#00C9504D]"
                            : "bg-[#FF690033] text-[#FF8904] border-[#FF69004D]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 w-[120px]">
                      <div className="flex items-center justify-end">
                        <button className="px-5 py-2 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(45,127,255,0.4)] hover:scale-105 transition-all cursor-pointer">
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex gap-3 flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A]">
            <p className="text-[#98A2B3] text-xs md:text-sm">
              Showing <span className="text-white font-medium">1</span> to{" "}
              <span className="text-white font-medium">10</span> of{" "}
              <span className="text-white font-medium">27</span> entries
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
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#1E293B40] border border-[#C27AFF1A] text-[#98A2B3] hover:text-white transition-all text-xs md:text-sm cursor-pointer">
                  2
                </button>
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#1E293B40] border border-[#C27AFF1A] text-[#98A2B3] hover:text-white transition-all text-xs md:text-sm cursor-pointer">
                  3
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

export default FAQListPage;
