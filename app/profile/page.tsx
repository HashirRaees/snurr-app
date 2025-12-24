"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCheckCircle, FaTrophy, FaShare } from "react-icons/fa";
import {
  IoGiftOutline,
  IoSettingsOutline,
  IoTrophyOutline,
  IoMailOutline,
} from "react-icons/io5";
import {
  LuTarget,
  LuShare2,
  LuSpade,
  LuDice1,
  LuHeart,
  LuWallet,
  LuCrown,
  LuStore,
} from "react-icons/lu";
import { IoIosSwap } from "react-icons/io";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { SiEthereum, SiTether } from "react-icons/si";
import { FiEdit2 } from "react-icons/fi";

export default function ProfilePage() {
  const [activeWalletTab, setActiveWalletTab] = useState("deposit");

  // Mock data for statistics
  const stats = [
    { label: "Total Wagered", value: "15,847", unit: "USDT", change: "+12.5%" },
    { label: "Total Won", value: "18,234", unit: "USDT", change: "-8.3%" },
    { label: "Games Played", value: "1,342", unit: "Games", change: "+15%" },
    { label: "Win Rate", value: "54.2", unit: "%", change: "-2.1%" },
  ];

  // Mock wallet data
  const walletBalances = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.2456",
      usdValue: "$12,985",
      icon: BsCurrencyBitcoin,
      color: "#F7931A",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "3.8921",
      usdValue: "$8,234",
      icon: SiEthereum,
      color: "#627EEA",
    },
    {
      name: "USDT",
      symbol: "USDT",
      amount: "5,432.00",
      usdValue: "$5,432",
      icon: SiTether,
      color: "#26A17B",
    },
  ];

  // Mock recent activity
  const recentActivity = [
    {
      game: "Texas Hold'em Poker",
      time: "2 minutes ago",
      amount: "+245.50 USDT",
      result: "Win",
      icon: <LuSpade />,
    },
    {
      game: "Roulette",
      time: "15 minutes ago",
      amount: "+180.00 USDT",
      result: "Win",
      icon: <LuTarget />,
    },
    {
      game: "Dice Game",
      time: "1 hour ago",
      amount: "-60.00 USDT",
      result: "Loss",
      icon: <LuDice1 />,
    },
    {
      game: "Blackjack",
      time: "2 hours ago",
      amount: "+320.00 USDT",
      result: "Win",
      icon: <IoTrophyOutline />,
    },
    {
      game: "Texas Hold'em Poker",
      time: "4 hours ago",
      amount: "+125.00 USDT",
      result: "Win",
      icon: <LuSpade />,
    },
  ];

  // Mock achievements
  const achievements = [
    {
      name: "High Roller",
      description: "Wager over 10,000 USDT",
      progress: 85,
      color: "#F0B100",
      icon: <LuCrown />,
    },
    {
      name: "Winning Streak",
      description: "Win 10 games in a row",
      progress: 100,
      color: "#F0B100",
      icon: <LuCrown />,
    },
    {
      name: "Sharpshooter",
      description: "Achieve 60% win rate",
      progress: 90,
      color: "#AD46FF",
      icon: <LuCrown />,
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#000000_0%,#3C0366_50%,#000000_100%)] font-sans p-4 md:p-8">
      {/* Profile Header Card */}
      <div className="bg-[linear-gradient(90deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] shadow-[0_-1px_33.4px_0_#C27AFF]  border border-[#AD46FF33] rounded-3xl p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-[#AD46FF] overflow-hidden">
                <Image
                  src="/assets/discover-games.jpg"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 -right-1 w-8 h-8 bg-[#AD46FF] rounded-full flex items-center justify-center">
                <FiEdit2 className="text-white text-sm" />
              </div>
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-heading uppercase tracking-wide">
                POKER_KING
              </h2>
              <p className="text-[#E9D4FF] text-sm mt-1">
                Member Since Nov 2024
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center py-1 px-2 gap-1 rounded-lg border border-[#AD46FF80] text-[#E9D4FF] text-xs">
                  <LuTarget className="text-[#00C950]" />
                  <span>Level 24</span>
                </div>
                <div className="flex items-center py-1 px-2 border rounded-lg border-[#AD46FF80] gap-1 text-[#E9D4FF] text-xs">
                  <FaTrophy className="text-[#F0B100]" />
                  <span>Top 100 Player</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg bg-[#59168B80] border border-[#AD46FF80] flex items-center justify-center text-white hover:bg-[#AD46FF33] hover:text-white transition-all cursor-pointer">
              <LuShare2 className="text-lg" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-[#59168B80] border border-[#AD46FF80] flex items-center justify-center text-white hover:bg-[#AD46FF33] hover:text-white transition-all cursor-pointer">
              <IoSettingsOutline className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-6 mt-8 py-5 px-4 md:px-8 rounded-2xl bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)]">
        <h3 className="text-white md:text-2xl font-heading uppercase mb-4">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/missions">
            <div className="bg-[#FF69001A] border border-[#FF69004D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#FF6900_0%,#F0B100_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuTarget className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Missions
              </span>
            </div>
          </Link>

          <Link href="/banking">
            <div className="bg-[#6A72821A] border border-[#6A72824D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#99A1AF_0%,#4A5565_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MdOutlineAccountBalance className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Banking
              </span>
            </div>
          </Link>

          <Link href="/loyalty">
            <div className="bg-[#AD46FF1A] border border-[#AD46FF33] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#C27AFF_0%,#9810FA_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuCrown className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Loyalty
              </span>
            </div>
          </Link>

          <Link href="/bonus">
            <div className="bg-[#00C9501A] border border-[#00C9504D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#00C950_0%,#00C950_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoGiftOutline className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Bonus
              </span>
            </div>
          </Link>

          <Link href="/favorites">
            <div className="bg-[#F6339A1A] border border-[#F6339A4D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#F6339A_0%,#F6339A_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuHeart className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Favorites
              </span>
            </div>
          </Link>

          <Link href="/settings">
            <div className="bg-[#6A72821A] border border-[#6A72824D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#99A1AF_0%,#4A5565_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoSettingsOutline className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Settings
              </span>
            </div>
          </Link>

          <Link href="/support">
            <div className="bg-[#2B7FFF1A] border border-[#2B7FFF4D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#51A2FF_0%,#00B8DB_100%)]  flex items-center justify-center group-hover:scale-110 transition-transform">
                <IoMailOutline className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm tracking-wider uppercase">
                Inbox
              </span>
            </div>
          </Link>

          <Link href="/vip-shop">
            <div className="bg-[#E12AFB1A] border border-[#E12AFB4D] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#AD46FF33] transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-[linear-gradient(135deg,#E12AFB_0%,#C800DE_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuStore className="text-2xl text-white" />
              </div>
              <span className="text-white text-sm  uppercase">VIP Shop</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Statistics and Wallet Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Statistics */}
        <div className="lg:col-span-2 bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6">
          <h3 className="text-white md:text-2xl font-heading uppercase mb-4">
            Statistics
          </h3>
          <div className="">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div className="bg-[#0000004D] rounded-2xl p-4" key={index}>
                  <p className="text-[#DAB2FF] text-xs mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <h4 className="text-white text-2xl font-bold">
                      {stat.value}
                    </h4>
                    <span className="text-[#C27AFF] text-xs">{stat.unit}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 mt-1 text-xs ${
                      stat.change.startsWith("+")
                        ? "text-[#00C950]"
                        : "text-[#FF6467]"
                    }`}
                  >
                    {stat.change.startsWith("+") ? (
                      <BiTrendingUp />
                    ) : (
                      <BiTrendingDown />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 7-Day Performance Chart Placeholder */}
            <div className="bg-[#0000004D] h-60 rounded-2xl p-4">
              <p className="text-white text-sm mb-3">7-Day Performance</p>
              <div className="flex items-end h-[80%] justify-around gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const heights = [60, 80, 45, 90, 70, 85, 95];
                    return (
                      <div
                        key={day}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-full bg-[linear-gradient(180deg,#AD46FF_0%,#9810FA_100%)] rounded-t"
                          style={{ height: `${heights[index]}%` }}
                        />
                        <span className="text-[#C27AFF] text-[10px]">
                          {day}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wallet */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white md:text-2xl font-heading uppercase flex items-center gap-2">
              <LuWallet className="text-[#C27AFF]" />
              Wallet
            </h3>
          </div>
          <div className="">
            {/* Total Balance */}
            <div className="mb-6 p-5 rounded-3xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)]">
              <p className="text-[#F3E8FF] text-base mb-2">Total Balance</p>
              <h2 className="text-white text-4xl font-bold mb-4">$26,511</h2>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 rounded-lg bg-[#FFFFFF33] text-white text-base  hover:opacity-90 transition-all cursor-pointer">
                  + Deposit
                </button>
                <button className="flex-1 py-2 rounded-lg bg-[#FFFFFF33]  text-[#FFFFFF] text-base  hover:text-white transition-all cursor-pointer">
                  - Withdraw
                </button>
                <button className="flex-1 flex items-center gap-2 justify-center py-2 rounded-lg bg-[#FFFFFF33]  text-[#FFFFFF] text-base  hover:text-white transition-all cursor-pointer">
                  <IoIosSwap className="text-[#FFFFFF]" /> Swap
                </button>
              </div>
            </div>

            {/* Wallet Balances */}
            <div className="space-y-3">
              {walletBalances.map((wallet, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#0505114D] rounded-xl border border-[#AD46FF1A]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] rounded-full flex items-center justify-center">
                      <wallet.icon className="text-xl text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm ">{wallet.name}</p>
                      <p className="text-[#C27AFF] text-xs">{wallet.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm ">{wallet.amount}</p>
                    <p className="text-[#C27AFF] text-xs">{wallet.usdValue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Achievements Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6">
          <h3 className="text-white md:text-2xl font-heading uppercase mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#0505114D] rounded-xl border border-[#AD46FF1A] hover:bg-[#AD46FF1A] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg text-[#05DF72] bg-[#00C95033] flex items-center justify-center text-2xl
                        ${
                          activity.result === "Win"
                            ? "text-[#00C950]"
                            : "text-[#FF6467] bg-[#FB2C3633]"
                        }`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm ">{activity.game}</p>
                    <p className="text-[#C27AFF] text-xs">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm  ${
                      activity.result === "Win"
                        ? "text-[#00C950]"
                        : "text-[#FF6467]"
                    }`}
                  >
                    {activity.amount}
                  </p>
                  <p className="text-[#C27AFF] text-xs">{activity.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6">
          <h3 className="text-white text-xl font-bold uppercase mb-4">
            Achievements
          </h3>
          <div className="">
            <div className="space-y-5">
              {achievements.map((achievement, index) => (
                <div className="bg-[#F0B1000D] border border-[#F0B1004D] p-5 rounded-3xl" key={index}>
                  <div className="flex items-start gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${achievement.color}20` }}
                    >
                      <div className={`text-xl`}>
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm ">{achievement.name}</p>
                      <p className="text-[#C27AFF] text-xs">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-[#0505114D] rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all"
                      style={{
                        width: `${achievement.progress}%`,
                        background: `linear-gradient(90deg, ${achievement.color} 0%, ${achievement.color}CC 100%)`,
                      }}
                    />
                  </div>
                  <p className="text-[#C27AFF] text-xs text-right mt-1">
                    {achievement.progress}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
