import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield, LuKey } from "react-icons/lu";
import { CiMobile2 } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";

interface SecurityTabProps {
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

export default function SecurityTab({
  toggles,
  handleToggle,
}: SecurityTabProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Change Password */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-[linear-gradient(135deg,_#AD46FF_0%,_#E12AFB_100%)] flex items-center justify-center text-white">
              <IoLockClosedOutline className="text-3xl" />
            </div>
            <h2 className="text-white text-2xl ">Change Password</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[#DAB2FF] text-sm mb-2 block">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#9810FA] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#DAB2FF] text-sm mb-2 block">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#9810FA] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#DAB2FF] text-sm mb-2 block">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-[#05051180] border border-[#AD46FF33] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#9810FA] transition-colors"
              />
            </div>
          </div>

          <div className="bg-[#0505114D] rounded-xl p-4 mb-6 border border-[#AD46FF1A]">
            <p className="text-[#DAB2FF] text-sm mb-2">
              Password must contain:
            </p>
            <ul className="space-y-1 text-sm text-[#DAB2FF]">
              <li className="flex items-center gap-2">
                • At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                • One uppercase letter
              </li>
              <li className="flex items-center gap-2">
                • One lowercase letter
              </li>
              <li className="flex items-center gap-2">• One number</li>
              <li className="flex items-center gap-2">
                • One special character
              </li>
            </ul>
          </div>

          <button className="w-full cursor-pointer py-3 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white  uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all">
            Update Password
          </button>
        </div>

        {/* 2FA */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-[linear-gradient(135deg,_#00C950_0%,_#00BC7D_100%)] flex items-center justify-center text-white">
              <LuShield className="text-3xl" />
            </div>
            <h2 className="text-white text-2xl  uppercase tracking-wide">
              Two-Factor Authentication
            </h2>
          </div>

          <div className="bg-[#05051180] border border-[#AD46FF33] rounded-xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <CiMobile2 className="text-[#C27AFF] text-3xl" />
              <div>
                <div className="text-white font-medium">Authenticator App</div>
                <div className="text-[#C27AFF] text-sm">Enabled</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("2fa")}
              className={`w-12 h-6 cursor-pointer rounded-full p-1 transition-colors ${
                toggles["2fa"]
                  ? "bg-[#030213] border border-[#00000000]"
                  : "bg-[#CBCED4]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform ${
                  toggles["2fa"]
                    ? "bg-white translate-x-6"
                    : "bg-white translate-x-0"
                }`}
              ></div>
            </button>
          </div>

          <div className="bg-[#00C9501A] border border-[#00C9504D] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-[#00C950] mb-1">
              <FaRegCheckCircle /> 2FA is Active
            </div>
            <p className="text-gray-300 text-sm">
              Your account is protected with two-factor authentication using
              Google Authenticator.
            </p>
          </div>

          <button className="w-full py-3 cursor-pointer rounded-xl bg-[#59168B4D] border border-[#AD46FF33] text-[#DAB2FF] font-medium hover:bg-[#AD46FF33] hover:text-white transition-all mb-auto">
            Reconfigure 2FA
          </button>

          <div className="mt-8 pt-6 border-t border-[#FFFFFF1A]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-300 text-base">
                <LuKey className="text-[#C27AFF]" /> Backup Codes
              </div>
              <button className="px-4 py-2 cursor-pointer rounded-lg bg-[#59168B4D] border border-[#AD46FF33] text-[#DAB2FF] text-sm hover:text-white transition-colors">
                Generate
              </button>
            </div>
            <div className="text-[#C27AFF] text-sm mt-2">
              Generate backup codes in case you lose access to your
              authenticator app.
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
        <h2 className="text-white text-2xl  mb-6">Active Sessions</h2>

        <div className="space-y-4">
          {[
            {
              device: "Chrome on Windows",
              status: "Current",
              location: "New York, USA",
              ip: "192.168.1.1",
              active: "Active now",
              icon: CiMobile2,
            },
            {
              device: "Safari on iPhone",
              status: null,
              location: "New York, USA",
              ip: "192.168.1.2",
              active: "2 hours ago",
              icon: CiMobile2,
            },
            {
              device: "Firefox on MacOS",
              status: null,
              location: "Los Angeles, USA",
              ip: "192.168.1.3",
              active: "1 day ago",
              icon: CiMobile2,
            },
          ].map((session, index) => (
            <div
              key={index}
              className="bg-[#0000004D] border border-[#AD46FF33] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[linear-gradient(135deg,_#AD46FF_0%,_#E12AFB_100%)] flex items-center justify-center text-white mt-1 md:mt-0">
                  <session.icon className="text-3xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white ">{session.device}</h3>
                    {session.status && (
                      <span className="bg-[#4ADE80]/20 text-[#4ADE80] text-sm uppercase px-2 py-0.5 rounded ">
                        {session.status}
                      </span>
                    )}
                  </div>
                  <div className="text-[#AD46FF] text-sm">
                    {session.location}
                  </div>
                  <div className="text-[#AD46FF] text-sm mt-1">
                    IP: {session.ip} • Last active: {session.active}
                  </div>
                </div>
              </div>

              {session.status !== "Current" && (
                <button className="px-4 py-2 cursor-pointer rounded-lg bg-[#82181A4D] border border-[#FB2C364D] text-[#FF6467] text-sm hover:bg-[#FF6467]/30 transition-colors self-end md:self-center">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 cursor-pointer rounded-xl bg-[#ef444410] border border-[#FB2C364D] text-[#FF6467] hover:bg-[#FF6467]/30 transition-all text-sm font-medium">
          Revoke All Other Sessions
        </button>
      </div>
    </div>
  );
}
