"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FiUsers, FiCopy, FiPrinter } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

const CustomersListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "U88001000",
      lastLogin: "@11948",
      username: "Javier tortegrosa rincon",
      name: "Javier tortegrosa rincon",
      email: "jabitartas@hotoo.es",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001811",
      lastLogin: "MichiJay",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "micjayworld@gambrinus.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001882",
      lastLogin: "ajes1983",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "jkd@meha.es@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001923",
      lastLogin: "Milosara",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "Tarathacus27@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001904",
      lastLogin: "Johnnyjay",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "jvand365@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001905",
      lastLogin: "Michaelyordan",
      username: "Michele Jordan",
      name: "Michele Jordan",
      email: "Michele_jordan@yahoo.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001966",
      lastLogin: "Dixson234",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "dixson234@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001907",
      lastLogin: "BenAnanson",
      username: "Ben Danielson",
      name: "Ben Danielson",
      email: "bendanielsol7@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001908",
      lastLogin: "Akhsam919",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "akhsam919@gmail.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
    {
      id: "U88001909",
      lastLogin: "Akhsam916",
      username: "First Name Last Name",
      name: "First Name Last Name",
      email: "akhsam916@yahoo.com",
      withdrawal: "No Pending withdrawal",
      favoriteGame: "0",
      status: "Inactive",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Customer Information
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Customers List
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <LuUsers size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl tracking-tight">
                Customers List (788)
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Manage all registered customers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/customer/online">
              <button className="px-6 py-3 rounded-xl bg-[#1E2939] border border-[#364153] text-white text-sm font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer whitespace-nowrap">
                Online Customers
              </button>
            </Link>
            <Link href="/admin/customer/search">
              <button className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#AD46FF4D] bg-[#AD46FF] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
                Customer Search
              </button>
            </Link>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Controls Row */}
          <div className="md:p-8 p-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={16} /> Copy
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiPrinter size={16} /> Print
              </button>
            </div>
            <div className="relative w-full max-w-md">
              <IoMdSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl py-3 pl-12 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#99A1AF] text-[11px] font-medium uppercase tracking-widest whitespace-nowrap">
                  <th className="px-8 py-5">Account</th>
                  <th className="px-8 py-5">Last Login</th>
                  <th className="px-8 py-5">Username</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">Withdrawal</th>
                  <th className="px-8 py-5">Favorite Game</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                  >
                    <td className="px-8 py-5 text-white text-sm font-medium">
                      {customer.id}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {customer.lastLogin}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.username}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.name}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {customer.email}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.withdrawal}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm text-center">
                      {customer.favoriteGame}
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full border border-[#2B7FFF4D] bg-[#2B7FFF33] text-[#51A2FF] text-xs  tracking-wider">
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button className="px-4 py-1.5 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-xs shadow-[0_0_15px_rgba(45,127,255,0.4)] text-white  hover:bg-[#1D4ED8] transition-all cursor-pointer">
                          Manage
                        </button>
                        <button className="px-4 py-1.5 rounded-lg bg-[#00A63E] text-white text-xs shadow-[0_4px_6px_-4px_#00C95033] shadow-[0_10px_15px_-3px_#00C95033] hover:bg-[#059669EE] transition-all cursor-pointer">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white font-medium">1</span> to{" "}
                <span className="text-white font-medium">10</span> of{" "}
                <span className="text-white font-medium">788</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm cursor-pointer whitespace-nowrap">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 rounded-xl bg-[#AD46FF] text-white text-sm font-bold cursor-pointer">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#1E293B40] text-white text-sm font-bold hover:bg-[#1E293B60] cursor-pointer">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#1E293B40] text-white text-sm font-bold hover:bg-[#1E293B60] cursor-pointer">
                    3
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#1E293B40] text-white text-sm font-bold hover:bg-[#1E293B60] cursor-pointer">
                    4
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#1E293B40] text-white text-sm font-bold hover:bg-[#1E293B60] cursor-pointer">
                    5
                  </button>
                  <span className="text-white/40 px-2">...</span>
                </div>
                <button className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomersListPage;
