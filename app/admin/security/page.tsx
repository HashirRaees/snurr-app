"use client";

import React, { useState } from "react";
import Navbar from "@/components/admin/Navbar";
import { FiEye } from "react-icons/fi";

const countryListData = [
  { id: 1, country: "Afghanistan", status: "Active" },
  { id: 2, country: "Aland Islands", status: "Active" },
  { id: 3, country: "Albania", status: "Active" },
  { id: 4, country: "Algeria", status: "Active" },
  { id: 5, country: "American Samoa", status: "Active" },
  { id: 6, country: "Andorra", status: "Active" },
  { id: 7, country: "Angola", status: "Active" },
  { id: 8, country: "Anguilla", status: "Active" },
  { id: 9, country: "Antarctica", status: "Active" },
  { id: 10, country: "Antigua And Barbuda", status: "Active" },
];

const accountDetectorData = [
  {
    id: 1,
    name: "proper admin",
    username: "propersAdmin",
    email: "propersix321@gmail.com",
    country: "—",
    date: "2023-03-08",
  },
  {
    id: 1130,
    name: "fredrik Johansson",
    username: "fredrikJo",
    email: "fredrik@propersix.com",
    country: "—",
    date: "2023-04-29",
  },
  {
    id: 1131,
    name: "fredrik Johansson",
    username: "fredrikJo",
    email: "fredrik@allwinner.com",
    country: "—",
    date: "2023-04-29",
  },
  {
    id: 1183,
    name: "Shazin Khamid",
    username: "shazin_kh",
    email: "shazin@propersix.com",
    country: "—",
    date: "2024-03-07",
  },
  {
    id: 1192,
    name: "Amis Surgonis",
    username: "casinobee",
    email: "info@casinobee.com",
    country: "Latvia",
    date: "2024-04-06",
  },
  {
    id: 1193,
    name: "Stripey Em Stripey Em",
    username: "histaphen",
    email: "marketing@stripery-elm.com",
    country: "Romania",
    date: "2024-04-06",
  },
  {
    id: 1194,
    name: "Fredrik Johansson",
    username: "Fredrik",
    email: "fredrik123@propersix.com",
    country: "—",
    date: "2024-04-06",
  },
  {
    id: 1195,
    name: "Peter devin",
    username: "Peter123devin.se",
    email: "Peter123@devin.se",
    country: "—",
    date: "2024-06-04",
  },
  {
    id: 1200,
    name: "First Name Testski",
    username: "testski@gmail.com",
    email: "testski@gmail.com",
    country: "—",
    date: "2024-06-04",
  },
  {
    id: 1206,
    name: "supera admin",
    username: "superadmin",
    email: "superadmins@gmail.com",
    country: "—",
    date: "2025-08-09",
  },
];

const ipsDetectorData = [
  {
    id: 389,
    name: "mickie",
    username: "—",
    email: "lomas@propersix.com",
    ip: "185.138.28.471",
    country: "Angola",
    date: "2021-02-22",
  },
  {
    id: 391,
    name: "kasemido",
    username: "—",
    email: "kasemido140@gmail.com",
    ip: "72.255.10.13",
    country: "Pakistan",
    date: "2021-02-23",
  },
  {
    id: 398,
    name: "B Lumi94",
    username: "—",
    email: "B Lumi_1@hotmail.com",
    ip: "46.8.175.118",
    country: "Sweden",
    date: "2021-02-23",
  },
  {
    id: 401,
    name: "hamaditoet",
    username: "—",
    email: "hamadi@mailinator.com",
    ip: "113.160.65.101",
    country: "Pakistan",
    date: "2021-02-23",
  },
  {
    id: 406,
    name: "alex",
    username: "—",
    email: "develorooper@gmail.com",
    ip: "37.46.114.114",
    country: "Ukraine",
    date: "2021-02-24",
  },
  {
    id: 427,
    name: "bohdan",
    username: "—",
    email: "softgame@gmail.com",
    ip: "91.235.142.210",
    country: "Afghanistan",
    date: "2021-03-03",
  },
  {
    id: 430,
    name: "Actor Upgradevlivi",
    username: "—",
    email: "elysium_upgrade@list.ru",
    ip: "37.46.114.115",
    country: "Afghanistan",
    date: "2021-03-06",
  },
  {
    id: 432,
    name: "joe bloggsi1",
    username: "—",
    email: "joe.bloggs@dtsnet.com",
    ip: "2607:c7f62d6:5990::2fc::9c5d",
    country: "Afghanistan",
    date: "2021-03-09",
  },
  {
    id: 444,
    name: "Max",
    username: "—",
    email: "testing@aler.net",
    ip: "185.138.54.98",
    country: "Afghanistan",
    date: "2021-03-16",
  },
  {
    id: 448,
    name: "Miraam",
    username: "—",
    email: "islamictaam32@gmail.com",
    ip: "91.77.117.234",
    country: "Afghanistan",
    date: "2021-03-17",
  },
];

const SecurityPage = () => {
  const [activeTab, setActiveTab] = useState("country_backlist");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl font-normal">Security</h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              Security
            </span>
            <span className="text-white/20">/</span>
            <span className="capitalize">
              {activeTab.replace("_", " ").replace("ips", "IP's")}
            </span>
          </div>
        </div>

        {/* Level 1 Tabs Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-xl p-4 mb-8 backdrop-blur-md">
          <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab("country_backlist")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "country_backlist"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Country Backlist
            </button>
            <button
              onClick={() => setActiveTab("account_detector")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "account_detector"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Account Detector
            </button>
            <button
              onClick={() => setActiveTab("ips_detector")}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "ips_detector"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              IP's Detector
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          <h3 className="text-white text-xl md:text-2xl text-center py-10 font-semibold tracking-wide">
            {activeTab === "country_backlist" && "Country Block list"}
            {activeTab !== "country_backlist" && "List Users"}
          </h3>

          {/* Controls Row */}
          <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-sm font-medium hover:text-white transition-all cursor-pointer">
                Copy
              </button>
              <button className="px-5 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-sm font-medium hover:text-white transition-all cursor-pointer">
                Print
              </button>
            </div>

            <div className="relative w-full max-w-xs flex items-center gap-3">
              <span className="text-[#99A1AF] text-sm whitespace-nowrap">
                Search:
              </span>
              <input
                type="text"
                className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto min-h-[150px]">
            {activeTab === "country_backlist" && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ID</th>
                    <th className="px-8 py-4">COUNTRY NAME</th>
                    <th className="px-8 py-4">STATUS</th>
                    <th className="px-8 py-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {countryListData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC] font-bold">
                        {item.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.country}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        <span className="px-3 py-1 bg-[#00A63E] text-white text-xs rounded-md shadow-[0_0_10px_rgba(0,166,62,0.3)]">
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <button className="px-5 py-1.5 bg-[#E7000B] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium">
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "account_detector" && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ID</th>
                    <th className="px-8 py-4">NAME</th>
                    <th className="px-8 py-4">USERNAME</th>
                    <th className="px-8 py-4">EMAIL</th>
                    <th className="px-8 py-4">COUNTRY</th>
                    <th className="px-8 py-4">REGISTER DATE</th>
                    <th className="px-8 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {accountDetectorData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC] font-bold">
                        {item.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#2D7FFF] cursor-pointer hover:underline">
                        {item.name}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.username}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.email}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.country}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.date}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end">
                          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2D7FFF] text-white hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                            <FiEye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "ips_detector" && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ID</th>
                    <th className="px-8 py-4">NAME</th>
                    <th className="px-8 py-4">USERNAME</th>
                    <th className="px-8 py-4">EMAIL</th>
                    <th className="px-8 py-4">IP ADDRESS</th>
                    <th className="px-8 py-4">COUNTRY</th>
                    <th className="px-8 py-4">REGISTER DATE</th>
                    <th className="px-8 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {ipsDetectorData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC] font-bold">
                        {item.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#2D7FFF] cursor-pointer hover:underline">
                        {item.name}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.username}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.email}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.ip}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.country}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.date}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end">
                          <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2D7FFF] text-white hover:opacity-80 transition-all cursor-pointer shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                            <FiEye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="px-8 py-10 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
            <p className="text-[#99A1AF] text-xs uppercase font-medium">
              {activeTab === "country_backlist" &&
                "Showing 1 to 10 of 247 entries"}
              {activeTab === "account_detector" &&
                "Showing 1 to 10 of 10 entries"}
              {activeTab === "ips_detector" && "Showing 1 to 10 of 69 entries"}
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                Previous
              </button>
              <button className="w-10 h-10 bg-[#2D7FFF] rounded text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)] cursor-pointer">
                1
              </button>
              <button className="w-10 h-10 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                2
              </button>
              <button className="w-10 h-10 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                3
              </button>
              <button className="w-10 h-10 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                4
              </button>
              <button className="w-10 h-10 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                5
              </button>
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
