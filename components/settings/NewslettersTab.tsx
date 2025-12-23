import {
  LuGift,
  LuSparkles,
  LuMail,
  LuTrendingUp,
  LuBell,
  LuMessageSquare,
} from "react-icons/lu";

interface NewslettersTabProps {
  toggles: {
    sound: boolean;
    notifications: boolean;
    onlineStatus: boolean;
    statistics: boolean;
    messages: boolean;
    shareActivity: boolean;
    "2fa": boolean;
    promotions: boolean;
    newGames: boolean;
    weeklyDigest: boolean;
    personalizedOffers: boolean;
    tournamentAlerts: boolean;
    systemUpdates: boolean;
  };
  handleToggle: (key: any) => void;
}

export default function NewslettersTab({
  toggles,
  handleToggle,
}: NewslettersTabProps) {
  return (
    <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-white text-xl font-bold text-center mb-8">
        Newsletter Preferences
      </h2>

      <div className="space-y-4 mb-8">
        {[
          {
            key: "promotions",
            title: "Promotions & Bonuses",
            desc: "Get notified about exclusive bonuses, free spins, and special promotions",
            icon: LuGift,
            color: "#00C950",
            bg: "bg-[#00C950]/20",
          },
          {
            key: "newGames",
            title: "New Games & Features",
            desc: "Be the first to know about new games and exciting platform features",
            icon: LuSparkles,
            color: "#AD46FF",
            bg: "bg-[#AD46FF]/20",
          },
          {
            key: "weeklyDigest",
            title: "Weekly Digest",
            desc: "Weekly summary of your activity, wins, and personalized recommendations",
            icon: LuMail,
            color: "#00D3F2",
            bg: "bg-[#00D3F2]/20",
          },
          {
            key: "personalizedOffers",
            title: "Personalized Offers",
            desc: "Tailored bonuses and offers based on your gaming preferences",
            icon: LuTrendingUp,
            color: "#F0B100",
            bg: "bg-[#F0B100]/20",
          },
          {
            key: "tournamentAlerts",
            title: "Tournament Alerts",
            desc: "Notifications about upcoming tournaments and competitions",
            icon: LuBell,
            color: "#FF6467",
            bg: "bg-[#FF6467]/20",
          },
          {
            key: "systemUpdates",
            title: "System Updates",
            desc: "Important announcements about maintenance, updates, and policy changes",
            icon: LuMessageSquare,
            color: "#9CA3AF",
            bg: "bg-[#9CA3AF]/20",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="bg-[#0000004D] border border-[#AD46FF1A] rounded-xl p-4 flex items-center justify-between gap-4 hover:border-[#AD46FF33] transition-colors"
          >
            <div className="flex md:flex-row flex-col md:items-center gap-4">
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] ${
                  item.key === "promotions"
                    ? "bg-[linear-gradient(135deg,#00C950_0%,#008f39_100%)]"
                    : item.key === "newGames"
                    ? "bg-[linear-gradient(135deg,#AD46FF_0%,#7a20c9_100%)]"
                    : item.key === "weeklyDigest"
                    ? "bg-[linear-gradient(135deg,#00D3F2_0%,#009bb3_100%)]"
                    : item.key === "personalizedOffers"
                    ? "bg-[linear-gradient(135deg,#F0B100_0%,#b38300_100%)]"
                    : item.key === "tournamentAlerts"
                    ? "bg-[linear-gradient(135deg,#FF6467_0%,#cc4d50_100%)]"
                    : "bg-[linear-gradient(135deg,#9CA3AF_0%,#6b7280_100%)]"
                }`}
              >
                <item.icon className="text-3xl text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg mb-1">
                  {item.title}
                </div>
                <div className="text-[#DAB2FF] text-xs">{item.desc}</div>
              </div>
            </div>

            <button
              onClick={() => handleToggle(item.key as keyof typeof toggles)}
              className={`w-14 h-7 cursor-pointer rounded-full p-1 transition-colors flex-shrink-0 ${
                toggles[item.key as keyof typeof toggles]
                  ? "bg-black"
                  : "bg-[#CBCED4]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                  toggles[item.key as keyof typeof toggles]
                    ? "translate-x-7"
                    : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-4 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white font-bold uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all">
        Save Preferences
      </button>
    </div>
  );
}
