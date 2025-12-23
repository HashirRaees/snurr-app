"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CRYPTO_OPTIONS, RECENT_DEPOSITS } from "./data";

export default function DepositTab() {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [amount, setAmount] = useState("0.00");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Make a Deposit */}
      <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
        <h2 className="text-white text-2xl  mb-6">Make a Deposit</h2>

        <p className="text-[#E9D4FF] text-sm mb-3">Select Cryptocurrency</p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {CRYPTO_OPTIONS.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto)}
              className={`flex items-center cursor-pointer gap-3 p-4 rounded-xl border transition-all ${
                selectedCrypto.id === crypto.id
                  ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] cursor-pointer border-[#9810FA] shadow-[0_0_15px_rgba(152,16,250,0.3)]"
                  : "bg-[#0000004D] cursor-pointer border-[#AD46FF33] hover:border-[#AD46FF33]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,#AD46FF_0%,#E12AFB_100%)] text-white`}
              >
                <crypto.icon size={20} />
              </div>
              <div className="text-left">
                <span className="block text-white  text-sm">{crypto.name}</span>
                <span
                  className={`block text-sm ${
                    selectedCrypto.id === crypto.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  {crypto.fullName}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[#E9D4FF] text-sm mb-3">Amount to Deposit</p>
        <div className="mb-4">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl p-4 text-white font-mono focus:outline-none focus:border-[#AD46FF33] transition-colors"
          />
        </div>
        <div className="flex gap-2 mb-8">
          {["$100", "$500", "$1000"].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.replace("$", ""))}
              className="px-4 py-2 rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-gray-300 text-sm hover:bg-[#AD46FF33]/20 hover:text-white transition-colors"
            >
              {val}
            </button>
          ))}
        </div>

        <div className="bg-[#FF69001A] border border-[#FF69004D] rounded-xl p-6">
          <h4 className="text-[#FDC700] text-sm  mb-3">Important Notes</h4>
          <ul className="space-y-2 text-sm text-[#E9D4FF] list-disc list-inside">
            <li>Minimum deposit: 0.001 BTC</li>
            <li>Requires 3 network confirmations</li>
            <li>Funds will be credited automatically</li>
            <li>Only send Bitcoin to this address</li>
          </ul>
        </div>
      </div>

      {/* Right Column: Deposit Address */}
      <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
        <h2 className="text-white text-xl  mb-6">Deposit Address</h2>

        {/* QR Code Placeholder */}
        <div className="bg-white rounded-3xl p-8 mb-8 flex items-center justify-center h-64 w-full">
          <div className="bg-[linear-gradient(135deg,#F3E8FF_0%,#FAE8FF_100%)] p-4 rounded-xl">
            <Image
              src="/assets/qrcode.png"
              alt="QR Code"
              width={200}
              height={200}
            />
            {/* In real implementation, this would be a real QR code image */}
          </div>
        </div>

        <p className="text-[#E9D4FF] text-sm mb-3">
          {selectedCrypto.fullName} Address
        </p>
        <div className="flex items-center gap-2 mb-8">
          <div className="flex-1 bg-[#0000004D] border border-[#AD46FF33] rounded-xl p-4 text-gray-300 text-sm font-mono truncate">
            sadliaucnaisudraoiucaoiurasiudfhcaoiurehfhttps/
          </div>
          <button className="p-4 bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] rounded-xl text-white">
            <FaCopy />
          </button>
        </div>

        <div className="bg-[#0000004D] rounded-xl p-6 space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-[#E9D4FF]">Network</span>
            <span className="text-white">{selectedCrypto.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#E9D4FF]">Minimum Deposit</span>
            <span className="text-white">0.001 {selectedCrypto.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#E9D4FF]">Expected Arrival</span>
            <span className="text-white">3-10 minutes</span>
          </div>
        </div>

        <h3 className="text-[#E9D4FF] text-sm mb-4">Recent Deposits</h3>
        <div className="space-y-2">
          {RECENT_DEPOSITS.map((deposit, idx) => (
            <div
              key={idx}
              className="bg-[#0000004D] border border-[#AD46FF33] rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-white  text-sm">{deposit.amount}</div>
                <div className="text-gray-500 text-sm">{deposit.time}</div>
              </div>
              <div
                className={`text-sm  ${deposit.color} flex items-center gap-1`}
              >
                {deposit.status === "Completed" && (
                  <IoMdCheckmarkCircleOutline />
                )}
                {deposit.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
