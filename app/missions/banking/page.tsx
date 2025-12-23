"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import DepositTab from "../../../components/banking/DepositTab";
import WithdrawalTab from "../../../components/banking/WithdrawalTab";
import TransactionHistoryTab from "../../../components/banking/TransactionHistoryTab";

export default function BankingPage() {
  const [activeTab, setActiveTab] = useState("Deposit");

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#3C0366_50%,#000000_100%)] font-sans p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="w-10 h-10 rounded-lg bg-[#59168B80] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <FaArrowLeft />
        </Link>
        <h1 className="font-heading text-4xl text-white tracking-wide uppercase">
          Banking
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#59168B66] w-fit px-2 py-1 rounded-3xl gap-3 mb-8">
        {["Deposit", "Withdrawal", "Transaction History"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 cursor-pointer py-2 rounded-full text-xs md:text-base transition-all ${
              activeTab === tab
                ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white shadow-[0_0_15px_rgba(152,16,250,0.4)]"
                : "text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === "Deposit" && <DepositTab />}
      {activeTab === "Withdrawal" && <WithdrawalTab />}
      {activeTab === "Transaction History" && <TransactionHistoryTab />}
    </div>
  );
}
