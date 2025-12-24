"use client";

import React, { useState } from "react";
import { FiX, FiMonitor, FiSmartphone, FiTablet } from "react-icons/fi";

// --- Mock Data ---

const adminUsersData = [
  {
    name: "Afzs Kjsdshjksjdlf",
    email: "ostmarketinghksstsa.sirs@gmail.com",
    date: "March 30, 2021 07:40pm",
    roles: "",
  },
  {
    name: "Badrujjha Hasan Sajib",
    email: "sajibomwwxjpers@gmail.com",
    date: "May 11, 2021 08:32pm",
    roles: "",
  },
  {
    name: "casinobee",
    email: "info@casinobee.com",
    date: "April 06, 2024 05:54am",
    roles: "Affiliate",
  },
  {
    name: "CanFan_Billy",
    email: "neilsnor9776@gmail.com",
    date: "February 23, 2021 07:30pm",
    roles: "",
  },
  {
    name: "Dadan Ndemba",
    email: "dedandemba6@gmail.com",
    date: "May 11, 2021 10:01am",
    roles: "",
  },
  {
    name: "donna.w17",
    email: "donna.w17@yahoo.com",
    date: "May 23, 2021 11:14am",
    roles: "User Affiliate",
  },
  {
    name: "DTMmachine",
    email: "maynidojmcellmail.com",
    date: "February 27, 2021 06:13pm",
    roles: "",
  },
  {
    name: "Elisa Soomon",
    email: "elisasolomonfi@gmail.com",
    date: "May 11, 2021 12:00pm",
    roles: "",
  },
  {
    name: "Elvis Onyekachi",
    email: "elvisitachiev53@gmail.com",
    date: "May 11, 2021 12:11pm",
    roles: "",
  },
  {
    name: "d2rawir",
    email: "zawaghrowlook.com",
    date: "March 30, 2021 08:10pm",
    roles: "",
  },
];

const documentsData = [
  {
    id: 1,
    user: "HarryPotter",
    email: "collar1915@gmfun.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 2,
    user: "HarryPotter",
    email: "collar1915@gmfun.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 3,
    user: "HxHxH",
    email: "lakuunaghkjhkszumltS.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 4,
    user: "HxHxH",
    email: "lakuunaghkhzumltS.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 5,
    user: "HxHxH",
    email: "lakuunaghkhzumltS.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 6,
    user: "HxHxH",
    email: "lakuunaghkhzumltS.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 7,
    user: "sab264",
    email: "bahar.sab@gmail.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 8,
    user: "sab264",
    email: "bahar.sab@gmail.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 9,
    user: "Scanmehego",
    email: "scanmemoregg@gmail.com",
    identity: "No file",
    docs: "-",
  },
  {
    id: 10,
    user: "Scanmehego",
    email: "scanmemoregg@gmail.com",
    identity: "No file",
    docs: "-",
  },
];

const loggedInUsersData = [
  {
    id: 1,
    user: "HarryPotter",
    email: "collar1915@gmfun.com",
    loginTime: "2024-01-18 14:20:22",
    ip: "192.168.1.105",
    device: "Desktop",
    location: "United States",
    status: "Online",
  },
  {
    id: 2,
    user: "HxHxH",
    email: "lakuunaghkhzumltS.com",
    loginTime: "2024-01-18 14:15:45",
    ip: "192.168.1.156",
    device: "Mobile",
    location: "United Kingdom",
    status: "Online",
  },
  {
    id: 3,
    user: "sab264",
    email: "bahar.sab@gmail.com",
    loginTime: "2024-01-18 13:45:10",
    ip: "192.168.1.178",
    device: "Tablet",
    location: "Canada",
    status: "Idle",
  },
  {
    id: 4,
    user: "Scanmehego",
    email: "scanmemoregg@gmail.com",
    loginTime: "2024-01-18 13:20:33",
    ip: "192.168.1.201",
    device: "Desktop",
    location: "Australia",
    status: "Online",
  },
  {
    id: 5,
    user: "johnDoe123",
    email: "johndoe@example.com",
    loginTime: "2024-01-18 12:55:18",
    ip: "192.168.1.89",
    device: "Desktop",
    location: "Germany",
    status: "Online",
  },
  {
    id: 6,
    user: "gameMaster99",
    email: "gamemaster99@test.com",
    loginTime: "2024-01-18 12:30:42",
    ip: "192.168.1.234",
    device: "Mobile",
    location: "France",
    status: "Idle",
  },
  {
    id: 7,
    user: "luckyPlayer",
    email: "lucky.player@mail.com",
    loginTime: "2024-01-18 11:45:55",
    ip: "192.168.1.67",
    device: "Desktop",
    location: "Spain",
    status: "Online",
  },
  {
    id: 8,
    user: "casinoKing",
    email: "casinoking@gaming.com",
    loginTime: "2024-01-18 11:20:00",
    ip: "192.168.1.145",
    device: "Tablet",
    location: "Italy",
    status: "Away",
  },
  {
    id: 9,
    user: "spinWinner",
    email: "spinwinner@casino.com",
    loginTime: "2024-01-18 10:55:27",
    ip: "192.168.1.92",
    device: "Desktop",
    location: "Netherlands",
    status: "Online",
  },
  {
    id: 10,
    user: "betMaster",
    email: "betmaster@example.com",
    loginTime: "2024-01-18 10:30:15",
    ip: "192.168.1.223",
    device: "Mobile",
    location: "Sweden",
    status: "Online",
  },
];

const listUsersData = [
  {
    id: 1,
    user: "test32101",
    email: "Test32101@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-11-03 20:27:31",
  },
  {
    id: 2,
    user: "test3210",
    email: "test3210@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-10-27 21:40:54",
  },
  {
    id: 3,
    user: "abeetest21",
    email: "abeetest21312@stest.com",
    country: "Afghanistan",
    registerDate: "2025-10-25 17:32:19",
  },
  {
    id: 4,
    user: "abeetest",
    email: "abcstabeetest12@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-10-15 19:54:57",
  },
  {
    id: 5,
    user: "test22",
    email: "test22@test.com",
    country: "Afghanistan",
    registerDate: "2025-10-13 09:28:43",
  },
  {
    id: 6,
    user: "BlackIntodevdere",
    email: "nimstserher@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-10-07 15:35:55",
  },
  {
    id: 7,
    user: "johnvCena",
    email: "galvin7923@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-10-07 14:33:08",
  },
  {
    id: 8,
    user: "Abce",
    email: "cmoebee.fh@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-10-06 19:23:03",
  },
  {
    id: 9,
    user: "Bruno94",
    email: "titiktavjo@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-09-09 13:37:49",
  },
  {
    id: 10,
    user: "Balle",
    email: "titstrhft@gmail.com",
    country: "Afghanistan",
    registerDate: "2025-08-09 11:53:25",
  },
];

const permissionsData = [
  { id: 1, name: "Admin panel" },
  { id: 2, name: "Affiliate" },
  { id: 3, name: "Bonus And Code" },
  { id: 4, name: "Casino Settings" },
  { id: 5, name: "Customer Information" },
  { id: 6, name: "Dashboard" },
  { id: 7, name: "Finances" },
  { id: 8, name: "Games Management" },
  { id: 9, name: "Missions" },
  { id: 10, name: "Security" },
];

// --- Components ---

const UserAdminTabs = () => {
  const [activeTab, setActiveTab] = useState("admin-users");
  const [showAddModal, setShowAddModal] = useState(false);

  const tabs = [
    { name: "Admin Users", id: "admin-users" },
    { name: "User Documents", id: "documents" },
    { name: "Logged In Users", id: "logged-in" },
    { name: "List Users", id: "list-users" },
    { name: "Permissions", id: "permissions" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "admin-users":
        return (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <div className="px-8 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                User Administration
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2.5 rounded-lg bg-[#00A63E] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]"
              >
                add User
              </button>
            </div>
            <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E293980] mb-3">
              <div className="flex items-center gap-2 text-[#99A1AF] text-sm font-medium">
                Show
                <div className="relative">
                  <select className="appearance-none bg-[#1E2939] border border-[#364153] rounded px-4 py-1.5 pr-10 text-white focus:outline-none focus:border-[#AD46FF] cursor-pointer">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
                entries
              </div>
              <div className="relative w-full max-w-xs flex items-center gap-3">
                <span className="text-[#99A1AF] text-sm whitespace-nowrap font-medium">
                  Search:
                </span>
                <input
                  type="text"
                  className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">NAME</th>
                    <th className="px-8 py-4">EMAIL</th>
                    <th className="px-8 py-4">DATE/TIME ADDED</th>
                    <th className="px-8 py-4">USER ROLES</th>
                    <th className="px-8 py-4 text-right">OPERATIONS</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {adminUsersData.map((user, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.name}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.email}
                      </td>
                      <td className="px-8 py-4 text-xs text-[#D1D5DC]">
                        {user.date}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.roles}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="px-5 py-1.5 bg-[#2D7FFF] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                            Edit
                          </button>
                          <button className="px-5 py-1.5 bg-[#E7000B] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination stats="Showing 1 to 10 of 48 entries" />
          </div>
        );
      case "documents":
        return (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <div className="px-8 pt-10 pb-6">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                User Documents
              </h3>
            </div>
            <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E293980] mb-3">
              <div className="flex items-center gap-2">
                <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                  Copy
                </button>
                <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                  Print
                </button>
              </div>
              <div className="relative w-full max-w-xs flex items-center gap-3">
                <span className="text-[#99A1AF] text-sm whitespace-nowrap font-medium">
                  Search:
                </span>
                <input
                  type="text"
                  className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ID</th>
                    <th className="px-8 py-4">USERNAME</th>
                    <th className="px-8 py-4">EMAIL</th>
                    <th className="px-8 py-4">IDENTITY</th>
                    <th className="px-8 py-4">DOCUMENTS</th>
                    <th className="px-8 py-4">STATUS</th>
                    <th className="px-8 py-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {documentsData.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {doc.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {doc.user}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {doc.email}
                      </td>
                      <td className="px-8 py-4 text-xs text-[#99A1AF]">
                        {doc.identity}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {doc.docs}
                      </td>
                      <td className="px-8 py-4">
                        <span className="px-4 py-1.5 bg-[#F54900] text-white text-xs uppercase rounded-lg font-medium shadow-[0_0_10px_rgba(208,135,0,0.3)]">
                          Pending
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button className="px-5 py-1.5 bg-[#2D7FFF] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination stats="Showing 1 to 10 of 55 entries" />
          </div>
        );
      case "logged-in":
        return (
          <div className="space-y-8">
            <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-white text-2xl font-normal">
                User Management
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
                <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
                  User Management
                </span>
                <span className="text-white/20">/</span>
                <span className="capitalize text-white">Logged In Users</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard label="Online Users" value="7" color="#00C950" />
              <StatusCard label="Idle Users" value="2" color="#F0B100" />
              <StatusCard label="Away Users" value="1" color="#FF6900" />
            </div>
            <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
              <div className="px-8 pt-10 pb-6">
                <h3 className="text-white text-xl md:text-2xl font-semibold">
                  Logged In Users
                </h3>
              </div>
              <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E293980] mb-3">
                <div className="flex items-center gap-2">
                  <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                    Copy
                  </button>
                  <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                    Print
                  </button>
                  <button className="px-6 py-2 bg-[#2D7FFF] text-white text-sm rounded shadow-[0_4px_15px_rgba(45,127,255,0.4)] hover:opacity-90 transition-all cursor-pointer">
                    Export CSV
                  </button>
                </div>
                <div className="relative w-full max-w-xs flex items-center gap-3">
                  <span className="text-[#99A1AF] text-sm whitespace-nowrap font-medium">
                    Search:
                  </span>
                  <input
                    type="text"
                    className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  />
                </div>
              </div>
              <div className="overflow-x-auto min-h-[150px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                      <th className="px-8 py-4">ID</th>
                      <th className="px-8 py-4">USERNAME</th>
                      <th className="px-8 py-4">EMAIL</th>
                      <th className="px-8 py-4">LOGIN TIME</th>
                      <th className="px-8 py-4">IP ADDRESS</th>
                      <th className="px-8 py-4">DEVICE</th>
                      <th className="px-8 py-4">LOCATION</th>
                      <th className="px-8 py-4">STATUS</th>
                      <th className="px-8 py-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {loggedInUsersData.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                      >
                        <td className="px-8 py-4 text-sm text-white">
                          {user.id}
                        </td>
                        <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                          {user.user}
                        </td>
                        <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                          {user.email}
                        </td>
                        <td className="px-8 py-4 text-xs text-[#99A1AF] leading-tight whitespace-pre-line">
                          {user.loginTime.replace(" ", "\n")}
                        </td>
                        <td className="px-8 py-4 text-sm text-[#AD46FF] hover:underline cursor-pointer">
                          {user.ip}
                        </td>
                        <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                          <div className="flex items-center gap-2">
                            {user.device === "Desktop" && (
                              <FiMonitor size={14} className="text-[#99A1AF]" />
                            )}
                            {user.device === "Mobile" && (
                              <FiSmartphone
                                size={14}
                                className="text-[#99A1AF]"
                              />
                            )}
                            {user.device === "Tablet" && (
                              <FiTablet size={14} className="text-[#99A1AF]" />
                            )}
                            {user.device}
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                          {user.location}
                        </td>
                        <td className="px-8 py-4">
                          <span
                            className={`px-4 py-1 rounded text-xs font-medium ${
                              user.status === "Online"
                                ? "bg-[#00A63E] text-white"
                                : user.status === "Idle"
                                ? "bg-[#D08700] text-white"
                                : "bg-[#F54900] text-white"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-2 text-xs">
                            <button className="px-4 py-1.5 bg-[#2D7FFF] text-white rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                              View
                            </button>
                            <button className="px-4 py-1.5 bg-[#E7000B] text-white rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                              Kick
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination stats="Showing 1 to 10 of 10 entries" />
            </div>
          </div>
        );
      case "list-users":
        return (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <div className="px-8 pt-10 pb-6 flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#99A1AF]">
                  <span className="hover:text-[#C27AFF] cursor-pointer transition-colors">
                    User Management
                  </span>
                  <span>/</span>
                  <span className="text-[#99A1AF]">List Users</span>
                </div>
                <h3 className="text-white text-xl md:text-2xl font-semibold">
                  List Users
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2.5 rounded-lg bg-[#00A63E] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]"
              >
                add User
              </button>
            </div>
            <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#1E293980] mb-3">
              <div className="flex items-center gap-2">
                <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                  Copy
                </button>
                <button className="px-6 py-2 bg-[#1E2939] text-[#99A1AF] text-sm border border-[#364153] rounded hover:text-white transition-all cursor-pointer">
                  Print
                </button>
              </div>
              <div className="relative w-full max-w-xs flex items-center gap-3">
                <span className="text-[#99A1AF] text-sm whitespace-nowrap font-medium">
                  Search:
                </span>
                <input
                  type="text"
                  className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ID</th>
                    <th className="px-8 py-4">USERNAME</th>
                    <th className="px-8 py-4">EMAIL</th>
                    <th className="px-8 py-4">COUNTRY</th>
                    <th className="px-8 py-4">REGISTER DATE</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {listUsersData.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#2D7FFF] hover:underline cursor-pointer">
                        {user.user}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#2D7FFF] hover:underline cursor-pointer">
                        {user.email}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.country}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {user.registerDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination stats="Showing 1 to 10 of 767 entries" />
          </div>
        );
      case "permissions":
        return (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
            <div className="px-8 pt-10 pb-6 flex justify-between items-center">
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                Permissions
              </h3>
              <button className="px-6 py-2.5 rounded-lg bg-[#00A63E] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]">
                Add Permission
              </button>
            </div>
            <div className="overflow-x-auto min-h-[150px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">#</th>
                    <th className="px-8 py-4">PERMISSIONS</th>
                    <th className="px-8 py-4 text-right">OPERATION</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {permissionsData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-[#D1D5DC] font-bold">
                        {item.id}
                      </td>
                      <td className="px-8 py-4 text-sm text-[#D1D5DC]">
                        {item.name}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button className="px-5 py-1.5 bg-[#E7000B] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-[#10182899] border border-[#1E293980] rounded-xl p-4 mb-8 backdrop-blur-md">
        <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}

      {/* Create User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#00000080] backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-[#101828] border border-[#1E2939] rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(173,70,255,0.2)] my-8">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#99A1AF]">
                    <span className="hover:text-[#C27AFF] cursor-pointer transition-colors">
                      User Management
                    </span>
                    <span>/</span>
                    <span className="text-[#C27AFF]">Create User</span>
                  </div>
                  <h4 className="text-white text-xl font-semibold uppercase tracking-wide">
                    Create User
                  </h4>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-[#99A1AF] hover:text-white transition-all cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="max-w-xl mx-auto w-full">
                <div className="flex flex-col gap-4 pt-2 pb-2">
                  <FormGroup label="*Username:" placeholder="E.g. John" />
                  <FormGroup
                    label="*Password:"
                    type="password"
                    placeholder="E.g. ********"
                  />
                  <FormGroup label="*Email:" type="email" />
                  <FormGroup label="*First Name:" />
                  <FormGroup label="*Last Name:" />
                  <FormGroup label="Address:" />
                  <FormGroup label="Date Of Birth:" />
                  <div className="flex items-center justify-between gap-4 pb-2">
                    <label className="text-[#D1D5DC] text-xs font-normal whitespace-nowrap w-24 text-right">
                      Country:
                    </label>
                    <select className="flex-1 bg-[#1E29394D] border border-[#364153] rounded-lg h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all cursor-pointer">
                      <option value="">Select Country</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#1E2939] flex justify-center">
              <button className="px-8 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
                Create new user
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FormGroup = ({ label, type = "text", placeholder = "" }: any) => (
  <div className="flex items-center justify-between gap-4">
    <label className="text-[#D1D5DC] text-xs font-normal whitespace-nowrap w-24 text-right">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="flex-1 bg-[#1E29394D] border border-[#364153] rounded-lg h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
    />
  </div>
);

const StatusCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-[#10182899] backdrop-blur-md border border-[#1E293980] rounded-xl p-6 flex justify-between items-center shadow-lg">
    <div className="space-y-1">
      <p className="text-[#99A1AF] text-xs font-medium uppercase">{label}</p>
      <h3 className="text-white text-3xl font-bold">{value}</h3>
    </div>
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center`}
      style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  </div>
);

const Pagination = ({ stats }: { stats: string }) => (
  <div className="px-8 py-10 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
    <p className="text-[#99A1AF] text-xs font-medium uppercase">{stats}</p>
    <div className="flex items-center gap-2">
      <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
        Previous
      </button>
      <button className="w-10 h-10 bg-[#2D7FFF] rounded-lg text-white text-xs flex items-center justify-center shadow-[0_4px_15px_rgba(45,127,255,0.3)] cursor-pointer">
        1
      </button>
      <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
        Next
      </button>
    </div>
  </div>
);

export default UserAdminTabs;
