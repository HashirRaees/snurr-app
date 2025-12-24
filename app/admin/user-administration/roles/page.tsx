"use client";

import React, { useState } from "react";
import Navbar from "@/components/admin/Navbar";
import { FiX } from "react-icons/fi";

// Mock Data
const rolesData = [
  {
    id: 1,
    role: "Admin",
    permissions:
      "Bonus And Code User VIP and Loyalty Missions Casino Settings Finances Games Management Security User Management Customer Information Dashboard",
  },
  { id: 2, role: "Affiliate", permissions: "Affiliate" },
  { id: 3, role: "Agent", permissions: "Bonus And Code Finances" },
  { id: 4, role: "Operator", permissions: "Games Management" },
  {
    id: 5,
    role: "Super Admin",
    permissions:
      "Admin panel Bonus And Code User VIP and Loyalty Missions Casino Settings Finances Games Management Security Staff Management User Management Customer Information Dashboard",
  },
  { id: 6, role: "Tester", permissions: "User Missions" },
  { id: 7, role: "User", permissions: "" },
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

const UserAdministrationPage = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Header Section */}
        <div className="bg-[#1E293966] backdrop-blur-md border border-[#364153] rounded-xl p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-2xl font-normal">
            User Administration
          </h2>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#99A1AF]">
            <span className="text-[#C27AFF] cursor-pointer hover:text-[#C27AFFDD] transition-colors">
              User Management
            </span>
            <span className="text-white/20">/</span>
            <span className="capitalize">{activeTab}</span>
          </div>
        </div>

        {/* Level 1 Tabs Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-xl p-4 mb-8 backdrop-blur-md">
          <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-12 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "roles"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Roles
            </button>
            <button
              onClick={() => setActiveTab("permissions")}
              className={`px-12 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === "permissions"
                  ? "bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
                  : "bg-[#1E2939] text-[#99A1AF] border border-[#364153] hover:text-white"
              }`}
            >
              Permissions
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          <div className="px-8 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-white text-xl md:text-2xl font-semibold">
              User Administration
            </h3>
            {activeTab === "roles" ? (
              <button
                onClick={() => setShowRoleModal(true)}
                className="px-6 py-2.5 rounded-lg bg-[linear-gradient(90deg,#00A63E_0%,#008030_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]"
              >
                Add Role
              </button>
            ) : (
              <button
                onClick={() => setShowPermissionModal(true)}
                className="px-6 py-2.5 rounded-lg bg-[linear-gradient(90deg,#00A63E_0%,#008030_100%)] text-white text-sm font-medium hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,166,62,0.4)]"
              >
                Add Permission
              </button>
            )}
          </div>

          {/* Controls Row */}
          <div className="px-8 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
              <span className="text-[#99A1AF] text-sm font-medium whitespace-nowrap">
                Search:
              </span>
              <input
                type="text"
                className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-md h-10 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto min-h-[150px]">
            {activeTab === "roles" ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1E293980] text-[#99A1AF] text-xs tracking-wider uppercase font-medium bg-[#1E29394D]">
                    <th className="px-8 py-4">ROLE</th>
                    <th className="px-8 py-4">PERMISSIONS</th>
                    <th className="px-8 py-4 text-right">OPERATION</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {rolesData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors"
                    >
                      <td className="px-8 py-4 text-sm text-white font-bold">
                        {item.role}
                      </td>
                      <td className="px-8 py-4 text-xs text-[#99A1AF] leading-relaxed max-w-md">
                        {item.permissions}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="px-5 py-1.5 bg-[#2D7FFF] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(45,127,255,0.3)]">
                            Edit
                          </button>
                          <button className="px-5 py-1.5 bg-[#E7000B] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
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
                        <div className="flex justify-end">
                          <button className="px-5 py-1.5 bg-[#E7000B] text-white text-xs rounded hover:opacity-80 transition-all cursor-pointer font-medium shadow-[0_0_10px_rgba(231,0,11,0.3)]">
                            Delete
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
            <p className="text-[#99A1AF] text-xs font-medium">
              {activeTab === "roles"
                ? "Showing 1 to 7 of 7 entries"
                : "Showing 1 to 10 of 15 entries"}
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                Previous
              </button>
              <button className="w-10 h-10 bg-[#2D7FFF] rounded-lg text-white text-xs flex items-center justify-center shadow-[0_0_10px_rgba(45,127,255,0.3)] cursor-pointer">
                1
              </button>
              {activeTab === "permissions" && (
                <button className="w-10 h-10 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-xs flex items-center justify-center hover:bg-[#1E293B] hover:text-white transition-all cursor-pointer">
                  2
                </button>
              )}
              <button className="px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-lg text-[#99A1AF] text-xs hover:text-white transition-all cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#00000080] backdrop-blur-sm"
            onClick={() => setShowRoleModal(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-[#101828] border border-[#1E2939] rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(173,70,255,0.2)]">
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-white text-2xl font-semibold">Add Role</h4>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="text-[#99A1AF] hover:text-white transition-all cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-white text-sm font-medium block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter role name"
                    className="w-full bg-[#1E29394D] border border-[#1E2939] rounded-xl h-14 px-5 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium block mb-5">
                    Assign Permissions
                  </label>
                  <div className="grid grid-cols-1 gap-5 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                    {[
                      "Admin panel",
                      "Bonus And Code",
                      "User",
                      "VIP and Loyalty",
                      "Missions",
                      "Casino Settings",
                      "Finances",
                    ].map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="relative">
                          <input type="checkbox" className="peer hidden" />
                          <div className="w-6 h-6 bg-[#1E29394D] border border-[#1E2939] rounded flex items-center justify-center peer-checked:bg-[#2D7FFF] peer-checked:border-[#2D7FFF] transition-all">
                            <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5 opacity-0 peer-checked:opacity-100 transition-all"></div>
                          </div>
                        </div>
                        <span className="text-[#99A1AF] text-sm group-hover:text-white transition-all">
                          {perm}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 mt-5 border-t border-[#1E2939] flex justify-between items-center">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-10 py-3 bg-[#2D7FFF] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
              >
                Back
              </button>
              <button className="px-10 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#00000080] backdrop-blur-sm"
            onClick={() => setShowPermissionModal(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-[#101828] border border-[#1E2939] rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(173,70,255,0.2)]">
            <div className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-white text-2xl font-semibold">
                  Add Permission
                </h4>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="text-[#99A1AF] hover:text-white transition-all cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-white text-sm font-medium block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full bg-[#1E29394D] border border-[#1E2939] rounded-xl h-14 px-5 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium block mb-5">
                    Assign Permissions
                  </label>
                  <div className="grid grid-cols-1 gap-5 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                    {[
                      "Super Admin",
                      "Admin",
                      "Agent",
                      "Operator",
                      "User",
                      "Affiliated",
                      "Tested",
                    ].map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="relative">
                          <input type="checkbox" className="peer hidden" />
                          <div className="w-6 h-6 bg-[#1E29394D] border border-[#1E2939] rounded flex items-center justify-center peer-checked:bg-[#2D7FFF] peer-checked:border-[#2D7FFF] transition-all">
                            <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5 opacity-0 peer-checked:opacity-100 transition-all"></div>
                          </div>
                        </div>
                        <span className="text-[#99A1AF] text-sm group-hover:text-white transition-all">
                          {perm}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 mt-5 border-t border-[#1E2939] flex justify-between items-center">
              <button
                onClick={() => setShowPermissionModal(false)}
                className="px-10 py-3 bg-[#2D7FFF] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]"
              >
                Back
              </button>
              <button className="px-10 py-3 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-[0_4px_15px_rgba(45,127,255,0.4)]">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdministrationPage;
