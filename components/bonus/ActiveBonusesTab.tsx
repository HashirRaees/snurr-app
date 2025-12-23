import { FaRegClock, FaRegCheckCircle } from "react-icons/fa";

export default function ActiveBonusesTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        {
          title: "Welcome Bonus",
          amount: "$250.00",
          progress: 60,
          wagered: "$4,500",
          required: "$7,500",
          status: "pending",
          timeRemaining: "5 days remaining",
        },
        {
          title: "Weekly Cashback",
          amount: "$45.50",
          progress: 100,
          wagered: "$45.50",
          required: "$45.50",
          status: "completed",
          timeRemaining: "Ready to claim",
        },
      ].map((bonus, index) => (
        <div
          key={index}
          className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 flex flex-col relative"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-2xl tracking-wide">{bonus.title}</h3>
            {bonus.status === "completed" ? (
              <div className="text-green-500">
                <FaRegCheckCircle size={24} />
              </div>
            ) : (
              <div className="text-yellow-500">
                <FaRegClock size={24} />
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="text-[#DAB2FF] text-sm mb-1">Bonus Amount:</div>
            <div className="text-white font-bold text-lg">{bonus.amount}</div>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[#DAB2FF]">Wagering Progress</span>
            <span className="text-white font-bold">{bonus.progress}%</span>
          </div>

          <div className="w-full bg-[#0000004D] rounded-full h-3 mb-4">
            <div
              className="bg-[#9810FA] h-3 rounded-full transition-all duration-500"
              style={{ width: `${bonus.progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs mb-6">
            <div>
              <div className="text-[#DAB2FF] mb-1">Wagered:</div>
              <div className="text-white">{bonus.wagered}</div>
            </div>
            <div className="text-right">
              <div className="text-[#DAB2FF] mb-1">Required:</div>
              <div className="text-white">{bonus.required}</div>
            </div>
          </div>

          {bonus.status !== "completed" && (
            <div className="flex items-center gap-2 text-yellow-400 text-sm mb-6">
              <FaRegClock size={14} />
              <span>{bonus.timeRemaining}</span>
            </div>
          )}

          {bonus.status === "completed" && (
            <div className="flex items-center gap-2 text-green-400 text-sm mb-6">
              <FaRegClock size={14} />
              <span>{bonus.timeRemaining}</span>
            </div>
          )}

          <button
            className={`w-full py-3 rounded-xl transition-all font-medium tracking-wide ${
              bonus.status === "completed"
                ? "bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)]"
                : "bg-[#59168B4D] border border-[#AD46FF33] text-[#DAB2FF] hover:bg-[#AD46FF33] hover:text-white"
            }`}
          >
            {bonus.status === "completed" ? "Claim Reward" : "View Details"}
          </button>
        </div>
      ))}
    </div>
  );
}
