import { IoSearchOutline } from "react-icons/io5";
import { GoArrowDownLeft } from "react-icons/go";
import { MdArrowOutward } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";

export default function TransactionHistoryTab() {
  return (
    <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-white text-2xl">Transaction History</h2>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-white hover:bg-[#AD46FF33] transition-colors">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Search by transaction ID..."
            className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9810FA] transition-colors"
          />
          <IoSearchOutline className="absolute left-3 top-3.5 text-[#C27AFF] text-lg" />
        </div>
        <div className="relative">
          <select className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
            <option>All Types</option>
            <option>Deposit</option>
            <option>Withdrawal</option>
          </select>
          <div className="absolute right-4 top-4 pointer-events-none text-[#C27AFF]">
            <svg
              stroke="currentColor"
              fill="fill"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </div>
        </div>
        <div className="relative">
          <select className="w-full bg-[#0000004D] border border-[#AD46FF33] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Processing</option>
          </select>
          <div className="absolute right-4 top-4 pointer-events-none text-[#C27AFF]">
            <svg
              stroke="currentColor"
              fill="fill"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {[
          {
            id: "TXN-001234",
            date: "2024-11-11 14:32",
            type: "Deposit",
            amount: "0.0145 BTC",
            amountUsd: "$1,250",
            status: "Completed",
            hash: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
          },
          {
            id: "TXN-001233",
            date: "2024-11-11 12:15",
            type: "Withdrawal",
            amount: "0.5234 ETH",
            amountUsd: "$1,400",
            status: "Completed",
            hash: "0x9f3b2c1a5e8d7f6c4b3a2e1d0c9b8a7f6e5d4c3b",
          },
          {
            id: "TXN-001232",
            date: "2024-11-11 10:45",
            type: "Deposit",
            amount: "500.00 USDT",
            amountUsd: "$500",
            status: "Pending",
            hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
          },
          {
            id: "TXN-001231",
            date: "2024-11-10 18:22",
            type: "Withdrawal",
            amount: "0.0234 BTC",
            amountUsd: "$1,840",
            status: "Processing",
            hash: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
          },
        ].map((txn, index) => (
          <div
            key={index}
            className="bg-[#0000004D] border border-[#AD46FF33] rounded-2xl p-6 transition-colors hover:border-[#9810FA]/50"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    txn.type === "Deposit"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-[#9810FA]/10 text-[#9810FA]"
                  }`}
                >
                  {txn.type === "Deposit" ? (
                    <GoArrowDownLeft className="text-xl" />
                  ) : (
                    <MdArrowOutward className="text-xl" />
                  )}
                </div>
                <div>
                  <div className="text-[#C27AFF] text-xs mb-1">
                    Transaction ID
                  </div>
                  <div className="text-white font-bold text-lg">{txn.id}</div>
                  <div className="text-[#C27AFF] text-xs mt-1">{txn.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 lg:ml-12">
                <div>
                  <div className="text-[#C27AFF] text-xs mb-1">Type</div>
                  <div className="text-white text-sm">{txn.type}</div>
                </div>
                <div>
                  <div className="text-[#C27AFF] text-xs mb-1">Amount</div>
                  <div className="text-white font-bold text-sm">
                    {txn.amount}
                  </div>
                  <div className="text-[#C27AFF] text-xs">{txn.amountUsd}</div>
                </div>
                <div>
                  <div className="text-[#C27AFF] text-xs mb-1">Status</div>
                  <div
                    className={`flex items-center gap-2 text-sm font-bold ${
                      txn.status === "Completed"
                        ? "text-green-500"
                        : txn.status === "Pending"
                        ? "text-yellow-500"
                        : "text-orange-500"
                    }`}
                  >
                    {txn.status === "Completed" ? (
                      <IoMdCheckmarkCircleOutline />
                    ) : (
                      <FaRegClock />
                    )}
                    {txn.status}
                  </div>
                </div>{" "}
                <div className="flex items-center justify-end">
                  <button className="px-4 py-2 rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-[#E9D4FF] text-xs hover:bg-[#AD46FF33] hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <div className="text-[#C27AFF] text-xs mb-1">
                Transaction Hash:
              </div>
              <div className="font-mono text-[#DAB2FF] text-xs break-all">
                {txn.hash}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#AD46FF33]">
        <div className="text-[#C27AFF] text-sm">
          Showing <span className="text-white">1-7</span> of{" "}
          <span className="text-white">47</span> transactions
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-[#C27AFF] text-sm hover:bg-[#AD46FF33] hover:text-white transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-[#C27AFF] text-sm hover:bg-[#AD46FF33] hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
