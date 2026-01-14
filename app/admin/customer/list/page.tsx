"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { userService, User } from "../../../../lib/services/userService";
import { IoMdSearch } from "react-icons/io";
import { FiCopy, FiPrinter } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

const CustomersListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = async (page: number) => {
    try {
      setLoading(true);
      const data = await userService.getCustomers(page);
      // data.results.user is the array based on prompt
      if (data && data.results && data.results.user) {
        setCustomers(data.results.user);
        setTotalCount(data.count || 0);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Failed to fetch customers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

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
                Customers List ({totalCount})
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
              <button
                onClick={() => window.print()}
                className="flex-1 md:flex-none px-4 py-2 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-all cursor-pointer">
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
                  <th className="px-8 py-5">Joined</th>
                  <th className="px-8 py-5">Username</th>
                  <th className="px-8 py-5">Name</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5">City/Country</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[#C27AFF08] hover:bg-[#AD46FF05] transition-colors group"
                  >
                    <td className="px-8 py-5 text-white text-sm font-medium">
                      #{customer.id}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {customer.date_joined ? new Date(customer.date_joined).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.username}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {customer.email}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm w-40 leading-tight">
                      {customer.city || '-'}, {customer.country || '-'}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full border text-xs tracking-wider ${customer.is_active
                        ? "border-[#2B7FFF4D] bg-[#2B7FFF33] text-[#51A2FF]"
                        : "border-[#FB2C364D] bg-[#FB2C3633] text-[#FF6467]"
                        }`}>
                        {customer.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/customer/${customer.id}`}>
                          <button className="px-4 py-1.5 rounded-lg bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-xs shadow-[0_0_15px_rgba(45,127,255,0.4)] text-white hover:bg-[#1D4ED8] transition-all cursor-pointer">
                            Manage
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan={8} className="px-8 py-5 text-center text-white">Loading...</td>
                  </tr>
                )}
                {!loading && customers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-8 py-5 text-center text-white">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination / Info Row */}
            <div className="p-8 flex flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A] gap-4">
              <p className="text-[#98A2B3] text-sm">
                Showing <span className="text-white font-medium">{customers.length > 0 ? (currentPage - 1) * 10 + 1 : 0}</span> to{" "}
                <span className="text-white font-medium">{Math.min(currentPage * 10, totalCount)}</span> of{" "}
                <span className="text-white font-medium">{totalCount}</span> entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm cursor-pointer whitespace-nowrap">
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-10 h-10 rounded-xl bg-[#AD46FF] text-white text-sm font-bold cursor-pointer">
                    {currentPage}
                  </button>
                </div>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-4 py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap">
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
