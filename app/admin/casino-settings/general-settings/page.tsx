"use client";

import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";

const CasinoGeneralSetting = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl">Casino Settings</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Casino Settings
            </span>
            <span className="text-white/20">/</span>
            <span className="text-[#99A1AF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Casino General Settings
            </span>
          </div>
        </div>

        {/* Form Container Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 backdrop-blur-md">
          {/* Card Header & List Button */}
          <div className="flex flex-col border-b border-[#1E293980] py-5 md:flex-row items-center justify-between gap-6 mb-4">
            <h3 className="text-white text-2xl">Casino General Settings</h3>
            <Link href="/admin/casino-settings/affiliate-settings">
              <button className="px-8 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide">
                Affiliate Referral Settings
              </button>
            </Link>
          </div>

          <form className="w-full max-w-6xl space-y-10">
            <div className="space-y-4 py-8 border-b border-[#1E293980]">
              {/* Currency */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Currency
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>

              {/* Minimum Deposit */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Minimum Deposit
                </label>
                <input
                  type="text"
                  placeholder="1"
                  className="w-full bg-[#1E293B40] border placeholder:text-white border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
              {/* Minimum Withdraw */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Minimum Withdraw
                </label>
                <input
                  type="text"
                  placeholder="100"
                  className="w-full bg-[#1E293B40] border placeholder:text-white border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
              {/* Affiliate Commission */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Affiliate Commission
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="w-full bg-[#1E293B40] border placeholder:text-white border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
              {/* Account Inactive Day */}
              <div className="flex flex-col md:items-end gap-1">
                <div className="flex md:flex-row flex-col md:w-[95%] gap-5 md:items-center">
                  <label className="text-[#99A1AF] text-nowrap text-sm md:text-right">
                    Account Inactive Day
                  </label>
                  <input
                    type="text"
                    placeholder="365"
                    className="w-full bg-[#1E293B40] placeholder:text-white border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <p className="text-xs text-left text-[#6A7282]">
                    Number of days after which an account is considered inactive{" "}
                    <span className="text-red-400">[1-month]</span>
                  </p>
                </div>
              </div>

              {/* checkboxes */}
              <div className="flex w-full md:px-28 mt-10 gap-4">
                <input
                  className="h-6 w-6 appearance-none bg-[#1E293B40] checked:bg-gray-600 checked:appearance-auto checked:border-transparent focus:outline-none"
                  type="checkbox"
                />
                <label className="text-white text-nowrap text-sm md:text-right">
                  Enable Pay Per Full Games
                </label>
              </div>
              <div className="flex w-full md:px-28 mt-10 gap-4">
                <input
                  className="h-6 w-6 appearance-none bg-[#1E293B40] checked:bg-gray-600 checked:appearance-auto checked:border-transparent focus:outline-none"
                  type="checkbox"
                />
                <label className="text-white text-nowrap text-sm md:text-right">
                  Enable Pay Per Full Games
                </label>
              </div>
            </div>

            <div className="space-y-5 py-8 border-b border-[#1E293980] -mt-5">
              <div>
                <h1 className="md:text-xl">Payment Gateway Apps</h1>
              </div>
              {/* Stripe Secret key */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Stripe Secret key
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>

              {/* Coingate Auth Token */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-6">
                <label className="text-[#99A1AF] text-sm md:text-right">
                  Coingate Auth Token
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl h-12 px-6 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-5 border-b py-8 -mt-5 border-[#1E293B40]">
              <div>
                <h1 className="md:text-xl">KYC Setting</h1>
              </div>
              {/* Enable/Disable KYC Automatic Verification */}
              <div className="flex items-center gap-6">
                <label className="text-[#99A1AF] text-sm ">
                  Enable/Disable KYC <br /> Automatic Verification
                </label>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>

               {/* Enable/Disable Kyc Apis*/}
              <div className="flex items-center gap-6">
                <label className="text-[#99A1AF] text-sm ">
                  Enable/Disable Kyc Apis
                </label>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    ON
                  </button>
              </div>
            </div>
              <div className="space-y-5 border-b py-8 -mt-5 border-[#1E293B40]">
              <div>
                <h1 className="md:text-xl">Email Setting</h1>
              </div>
              {/* Enable/Disable Email Verification*/}
              <div className="flex items-center gap-6">
                <label className="text-[#99A1AF] text-sm ">
                  Enable/Disable Email Verification
                </label>
                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#364153] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
                  >
                    OFF
                  </button>
              </div>
            </div>

              {/* Submit */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                <div>
                  <button
                    type="submit"
                    className="px-8 md:mx-44 py-2 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)] whitespace-nowrap  tracking-wide"
                  >
                    Update
                  </button>
                </div>
              </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CasinoGeneralSetting;
