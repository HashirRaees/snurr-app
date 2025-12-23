"use client";

import { useState } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { CRYPTO_OPTIONS } from "./data";

export default function WithdrawalTab() {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [amount, setAmount] = useState("0.00");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Withdraw Funds */}
      <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
        <h2 className="text-white text-2xl font-bold mb-6">Withdraw Funds</h2>

        <p className="text-[#E9D4FF] text-sm mb-3">Select Cryptocurrency</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {CRYPTO_OPTIONS.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto)}
              className={`flex items-center cursor-pointer gap-3 p-4 rounded-xl border transition-all ${
                selectedCrypto.id === crypto.id
                  ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] border-[#9810FA] shadow-[0_0_15px_rgba(152,16,250,0.3)]"
                  : "bg-[#0000004D] border-[#AD46FF33] hover:border-[#AD46FF33]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,#AD46FF_0%,#E12AFB_100%)] text-white`}
              >
                <crypto.icon size={20} />
              </div>
              <div className="text-left">
                <span className="block text-white text-sm">{crypto.name}</span>
                <span
                  className={`block text-xs ${
                    selectedCrypto.id === crypto.id
                      ? "text-white/80"
                      : "text-gray-500"
                  }`}
                >
                  0.2456
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[#E9D4FF] text-sm mb-3">Withdrawal Address</p>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Bitcoin address"
            className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#AD46FF33] transition-colors text-sm"
          />
        </div>

        <div className="flex justify-between mb-3 text-sm">
          <span className="text-[#E9D4FF]">Amount to Withdraw</span>
          <span className="text-[#DAB2FF]">Available: 0.2456 BTC</span>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl p-4 text-white font-mono focus:outline-none focus:border-[#AD46FF33] transition-colors pr-20"
          />
          <button className="absolute right-2 top-2 bottom-2 px-4 bg-[#7a20c9] hover:bg-[#9810FA] text-white text-base rounded-lg transition-colors">
            MAX
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          {["0.01 BTC", "0.05 BTC", "0.1 BTC"].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val.replace(" BTC", ""))}
              className="px-4 py-2 rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-gray-300 text-sm hover:bg-[#AD46FF33]/20 hover:text-white transition-colors"
            >
              {val}
            </button>
          ))}
        </div>

        <button className="w-full py-4 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white d uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all mb-8">
          Request Withdrawal
        </button>

        <div className="bg-[#FF0055]/10 border border-[#FF0055]/30 rounded-xl p-6">
          <div className="text-[#FF0055] text-sm d mb-2 flex items-center gap-2">
            <PiWarningCircle size={20} />
            Security Notice
          </div>
          <p className="text-[#DAB2FF] text-xs leading-relaxed">
            Double-check the withdrawal address. Cryptocurrency transactions
            cannot be reversed.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Withdrawal Summary */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white font-bold text-xl mb-6">
            Withdrawal Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#E9D4FF]">Amount</span>
              <div className="text-right">
                <div className="text-white">0.00</div>
                <div className="text-gray-500 text-xs text-right">BTC</div>
              </div>
            </div>
            <div className="h-px bg-white/5 my-2"></div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#E9D4FF]">Network Fee</span>
              <div className="text-right">
                <div className="text-white">0.0005</div>
                <div className="text-gray-500 text-xs text-right">BTC</div>
              </div>
            </div>
            <div className="h-px bg-white/5 my-2"></div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#E9D4FF]">Processing Fee</span>
              <span className="text-white">Free</span>
            </div>
            <div className="h-px bg-white/5 my-2"></div>
            <div className="flex justify-between items-center text-lg d mt-4">
              <span className="text-white">You Will Receive</span>
              <div className="text-right">
                <div className="text-white">0.00</div>
                <div className="text-gray-500 text-sm text-right font-normal">
                  BTC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Limits */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white text-xl font-bold mb-6">
            Withdrawal Limits
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-[#E9D4FF]">Minimum Withdrawal</span>
              <span className="text-white">0.001 BTC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#E9D4FF]">Maximum per Transaction</span>
              <span className="text-white">10.0 BTC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#E9D4FF]">Daily Limit</span>
              <span className="text-white">50.0 BTC</span>
            </div>
          </div>
          <div className="bg-[#0000004D] border border-white/5 rounded-xl p-4">
            <div className="text-white text-sm mb-1">Processing Time</div>
            <p className="text-[#DAB2FF] text-sm">
              Most withdrawals are processed within 15-30 minutes after 3
              network confirmations. During high network traffic times,
              processing may take longer.
            </p>
          </div>
        </div>

        {/* Pending Withdrawals */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white font-bold text-xl d mb-6">
            Pending Withdrawals
          </h2>
          <div className="bg-[#0000004D] border border-white/5 rounded-xl p-4 mb-4 flex justify-between items-center">
            <div>
              <div className="text-white d text-sm">0.0234 BTC</div>
              <div className="text-[#9810FA] text-xs mt-1">
                Requested 15 minutes ago
              </div>
            </div>
            <span className="text-yellow-500 text-xs d uppercase tracking-wide">
              Processing
            </span>
          </div>
          <div className="text-center text-gray-500 text-xs mt-4">
            No other pending withdrawals
          </div>
        </div>
      </div>
    </div>
  );
}
