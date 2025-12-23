import { IoIosArrowDown } from "react-icons/io";

interface GeneralTabProps {
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

export default function GeneralTab({ toggles, handleToggle }: GeneralTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Column 1: Account & Region */}
      <div className="space-y-8">
        {/* Account Information */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white text-2xl  mb-6">Account Information</h2>

          <div className="space-y-4">
            <div>
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Username
              </label>
              <input
                type="text"
                defaultValue="CryptoKing_777"
                className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="cryptoking@example.com"
                className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Member Since
              </label>
              <input
                type="text"
                defaultValue="November 11, 2024"
                disabled
                className="w-full bg-[#0505114D] border border-[#AD46FF1A] rounded-xl px-4 py-3 text-[#C27AFF] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Account ID
              </label>
              <input
                type="text"
                defaultValue="USER-7845923"
                disabled
                className="w-full bg-[#0505114D] border border-[#AD46FF1A] rounded-xl px-4 py-3 text-[#C27AFF] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Region & Time */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white text-2xl  mb-6">Region & Time</h2>

          <div className="space-y-4">
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Time Zone
              </label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Date Format
              </label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Time Format
              </label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option>12-hour (AM/PM)</option>
                <option>24-hour</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Preferences & Privacy */}
      <div className="space-y-8">
        {/* Preferences */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white text-2xl  mb-6">Preferences</h2>

          <div className="space-y-4 mb-6">
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Language
              </label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option className="bg-[#05051180] text-white">English</option>
                <option className="bg-[#05051180] text-white">Spanish</option>
                <option className="bg-[#05051180] text-white">French</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">
                Default Currency
              </label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>BTC - Bitcoin</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
            <div className="relative">
              <label className="text-[#E9D4FF] text-sm mb-2 block">Theme</label>
              <select className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
                <option>Dark Mode</option>
                <option>Light Mode</option>
              </select>
              <IoIosArrowDown className="absolute right-4 top-[42px] text-[#E9D4FF] pointer-events-none" />
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Sound Effects</div>
                <div className="text-[#C27AFF] text-sm">
                  Enable game sound effects
                </div>
              </div>
              <button
                onClick={() => handleToggle("sound")}
                className={`w-12 h-6 cursor-pointer rounded-full p-1 transition-colors ${
                  toggles.sound
                    ? "bg-[#030213] border border-[#00000000]"
                    : "bg-[#CBCED4]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform ${
                    toggles.sound
                      ? "bg-white translate-x-6"
                      : "bg-white translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Push Notifications</div>
                <div className="text-[#C27AFF] text-sm">
                  Receive notifications
                </div>
              </div>
              <button
                onClick={() => handleToggle("notifications")}
                className={`w-12 h-6 cursor-pointer rounded-full p-1 transition-colors ${
                  toggles.notifications
                    ? "bg-[#030213] border border-[#00000000]"
                    : "bg-[#CBCED4]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform ${
                    toggles.notifications
                      ? "bg-white translate-x-6"
                      : "bg-white translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <h2 className="text-white text-2xl  mb-6">Privacy</h2>

          <div className="space-y-6">
            {[
              {
                key: "onlineStatus",
                label: "Show Online Status",
                desc: "Let others see when you're online",
              },
              {
                key: "statistics",
                label: "Show Statistics",
                desc: "Display your stats publicly",
              },
              {
                key: "messages",
                label: "Allow Messages",
                desc: "Receive messages from other users",
              },
              {
                key: "shareActivity",
                label: "Share Activity",
                desc: "Share your gaming activity",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-[#C27AFF] text-sm">{item.desc}</div>
                </div>
                <button
                  onClick={() => handleToggle(item.key as keyof typeof toggles)}
                  className={`w-12 h-6 cursor-pointer rounded-full p-1 transition-colors ${
                    toggles[item.key as keyof typeof toggles]
                      ? "bg-[#030213] border border-[#00000000]"
                      : "bg-[#CBCED4]"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-transform ${
                      toggles[item.key as keyof typeof toggles]
                        ? "bg-white translate-x-6"
                        : "bg-white translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="w-full col-span-1 lg:col-span-2 mt-4">
        <button className="w-full py-4 cursor-pointer rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white  uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
