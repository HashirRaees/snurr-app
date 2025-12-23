import { FaRegClock } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoGift } from "react-icons/go";
import { VscPercentage } from "react-icons/vsc";
import { PiLightning } from "react-icons/pi";

// Mock Data for Bonuses
const BONUSES = [
  {
    id: 1,
    type: "deposit",
    title: "Welcome Bonus",
    description: "100% Match Bonus up to $500",
    icon: GoGift,
    details: {
      "Bonus Amount": "$500",
      "Min Deposit": "$20",
      Requirement: "30x wagering",
      "Expires in": "7 days",
    },
    terms:
      "Wagering requirement must be met before withdrawal. Bonus expires after the specified time period.",
  },
  {
    id: 2,
    type: "deposit",
    title: "Weekend Reload",
    description: "50% Reload Bonus Every Weekend",
    icon: FaArrowTrendUp,
    details: {
      "Bonus Amount": "$300",
      "Min Deposit": "$50",
      Requirement: "25x wagering",
      "Expires in": "3 days",
    },
    terms:
      "Wagering requirement must be met before withdrawal. Bonus expires after the specified time period.",
  },
  {
    id: 3,
    type: "freespin",
    title: "Free Spins",
    description: "50 Free Spins on Starburst",
    icon: PiLightning,
    details: {
      "Bonus Amount": "50 Spins",
      "Min Deposit": "$0",
      Requirement: "40x wagering",
      "Expires in": "24 hours",
    },
    terms:
      "Wagering requirement must be met before withdrawal. Bonus expires after the specified time period.",
  },
  {
    id: 4,
    type: "cashback",
    title: "Cashback Bonus",
    description: "10% Weekly Cashback",
    icon: VscPercentage,
    details: {
      "Bonus Amount": "10%",
      "Min Deposit": "$0",
      Requirement: "No wagering",
      "Expires in": "Ongoing",
    },
    terms:
      "Wagering requirement must be met before withdrawal. Bonus expires after the specified time period.",
  },
];

export default function AvailableBonusesTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {BONUSES.map((bonus) => (
        <div
          key={bonus.id}
          className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 bg-[linear-gradient(135deg,#AD46FF_0%,#E12AFB_100%)] rounded-xl flex items-center justify-center text-white text-3xl shadow-[0_0_15px_rgba(173,70,255,0.4)]">
              <bonus.icon />
            </div>
            <div className="bg-[#AD46FF33] border border-[#AD46FF33] px-3 py-1 rounded-full text-[#DAB2FF] text-xs  tracking-wide">
              <h1>{bonus.type}</h1>
            </div>
          </div>

          <h3 className="text-white text-2xl  mb-1 tracking-wide">
            {bonus.title}
          </h3>
          <p className="text-[#C27AFF] text-sm mb-6">{bonus.description}</p>

          <div className="space-y-3 mb-8">
            {Object.entries(bonus.details).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-[#DAB2FF]">{key}:</span>
                <span
                  className={` ${
                    key === "Expires in"
                      ? "text-yellow-400 flex items-center gap-1"
                      : "text-white items-center flex"
                  }`}
                >
                  {key === "Expires in" && <FaRegClock size={14} />}
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <button className="w-full py-3 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white   tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all mb-4">
              Claim Bonus
            </button>
            <div className="bg-[#AD46FF1A] border border-[#AD46FF33] rounded-xl p-4">
              <p className="text-[#DAB2FF] text-sm leading-relaxed">
                Terms & Conditions: {bonus.terms}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
