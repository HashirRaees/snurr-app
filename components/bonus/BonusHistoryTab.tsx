import { GoGift } from "react-icons/go";

export default function BonusHistoryTab() {
  return (
    <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
      <h2 className="text-white text-2xl font-heading mb-6 tracking-wide">
        Bonus History
      </h2>

      <div className="space-y-4">
        {[
          {
            title: "Welcome Bonus",
            date: "2024-11-01",
            wagered: "$15,000",
            amount: "$500.00",
            status: "completed",
            icon: GoGift,
          },
          {
            title: "Free Spins",
            date: "2024-10-28",
            wagered: "$200",
            amount: "100 Spins",
            status: "completed",
            icon: GoGift,
          },
          {
            title: "Reload Bonus",
            date: "2024-10-15",
            wagered: "$2,100",
            amount: "$150.00",
            status: "expired",
            icon: GoGift,
          },
          {
            title: "Cashback",
            date: "2024-10-10",
            wagered: "$0",
            amount: "$32.50",
            status: "completed",
            icon: GoGift,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#0000004D] border border-[#AD46FF33] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#4ADE80]">
                <item.icon className="text-xl" />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-1">
                  {item.title}
                </h3>
                <div className="text-[#C27AFF] text-xs">
                  {item.date} • Wagered:{" "}
                  <span className="text-white">{item.wagered}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[200px]">
              <div className="text-right">
                <div className="text-white font-bold text-lg">
                  {item.amount}
                </div>
              </div>
              <div
                className={`px-3 py-2 rounded-full text-xs font-medium uppercase tracking-wide border ${
                  item.status === "completed"
                    ? "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20"
                    : "bg-[#6A728233] text-[#6A7282] border-[#6A728233]"
                }`}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-8">
        <button className="px-6 py-2 rounded-lg cursor-pointer bg-[#59168B4D] border border-[#AD46FF33] text-[#DAB2FF] text-sm hover:bg-[#AD46FF33] hover:text-white transition-colors">
          Previous
        </button>
        <button className="px-6 py-2 rounded-lg cursor-pointer bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white text-sm shadow-[0_0_15px_rgba(152,16,250,0.4)]">
          Next
        </button>
      </div>
    </div>
  );
}
