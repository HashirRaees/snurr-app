"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/admin/Navbar";
import { ticketService } from "../../../lib/services/ticketService";
import { format } from "date-fns";
import { IoMdSearch, IoMdPrint, IoMdCopy } from "react-icons/io";
import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPrinter,
  FiCopy,
} from "react-icons/fi";
// import { LuTicket } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuTicket } from "react-icons/lu";

const TicketsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const StatusCard = ({
    icon: Icon,
    label,
    value,
    iconBg,
    iconColor,
  }: {
    icon: any;
    label: string;
    value: string | number;
    iconBg: string;
    iconColor: string;
  }) => (
    <div className="bg-[#10182899] border border-[#1E293980] p-6 rounded-[24px] flex items-center gap-4 flex-1">
      <div
        className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center ${iconColor}`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[#98A2B3] text-sm font-medium">{label}</p>
        <p className="text-white text-2xl font-bold mt-1 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const getStyles = () => {
      switch (status.toLowerCase()) {
        case "submitted":
          return "bg-[#2B7FFF33] text-[#51A2FF] border-[#2B7FFF4D]";
        case "closed":
          return "bg-[#FB2C3633] text-[#FF6467] border-[#FB2C364D]";
        default:
          return "bg-white/10 text-white border-white/20";
      }
    };

    return (
      <span
        className={`px-4 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${getStyles()}`}
      >
        {status}
      </span>
    );
  };

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);
      const response = await ticketService.getTickets(page);
      setTickets(response.results);
      setTotalCount(response.count);
      // Assuming 10 items per page as api default, adjust if needed
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage]);


  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Support
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Tickets
          </span>
        </div>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10 px-1">
          <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
            <LuTicket size={28} />
          </div>
          <div>
            <h2 className="text-white text-3xl  tracking-tight">All Tickets</h2>
            <p className="text-[#98A2B3] text-sm mt-1">
              Manage and review support tickets
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatusCard
            icon={LuTicket}
            label="Total Tickets"
            value="421"
            iconBg="bg-[#AD46FF33]"
            iconColor="text-[#C27AFF]"
          />
          <StatusCard
            icon={FiClock}
            label="Submitted"
            value="385"
            iconBg="bg-[#FF690033]"
            iconColor="text-[#FF8904]"
          />
          <StatusCard
            icon={FiCheckCircle}
            label="Closed"
            value="36"
            iconBg="bg-[#00C95033]"
            iconColor="text-[#05DF72]"
          />
          <StatusCard
            icon={FiAlertCircle}
            label="Needs Attention"
            value="8"
            iconBg="bg-[#F0B10033]"
            iconColor="text-[#FDC700]"
          />
        </div>

        {/* Table Container */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          {/* Table Actions */}
          <div className="md:p-8 p-5 border-b border-[#C27AFF1A] flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm font-medium hover:bg-[#1E293B] transition-all cursor-pointer">
                <FiCopy size={18} />
                Copy
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-[#2D3748] hover:bg-[#4A5568] text-white px-4 py-2 rounded-lg transition-colors">
                <FiPrinter size={18} /> Print
              </button>
            </div>
            <div className="relative flex-1 min-w-[300px] max-w-md ml-auto">
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C27AFF1A] text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-8 py-5">Ticket No</th>
                  <th className="px-8 py-5">User Email</th>
                  <th className="px-8 py-5">Title</th>
                  <th className="px-8 py-5">Summary</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C27AFF11]">
                {tickets.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-8 py-5 text-white font-medium text-sm">
                      <div className="flex items-center gap-2">
                        {row.ticket_number || `#${row.id}`}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                      {row.user?.email || "Unknown User"}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {row.ticket_title || "No Title"}
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm max-w-[200px] truncate">
                      {/* Summary not available in list response usually, or fetch from content */}
                      {row.contents?.[0]?.message || "No content"}
                    </td>
                    <td className="px-8 py-5">
                      <StatusBadge status={row.ticket_status === 0 ? "Submitted" : "Closed"} />
                    </td>
                    <td className="px-8 py-5 text-[#98A2B3] text-sm">
                      {row.created_at ? format(new Date(row.created_at), 'yyyy-MM-dd') : 'N/A'}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => router.push(`/admin/tickets/${row.id}`)}
                          className="px-5 py-2 bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(45,127,255,0.4)] hover:scale-105 transition-all cursor-pointer">
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-8 flex gap-3 flex-col md:flex-row items-center justify-between border-t border-[#C27AFF1A]">
            <p className="text-[#98A2B3] text-xs md:text-sm">
              Showing <span className="text-white font-medium">1</span> to{" "}
              <span className="text-white font-medium">10</span> of{" "}
              <span className="text-white font-medium">421</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button className="md:px-4 px-3 py-1 md:py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-xs md:text-sm flex items-center gap-2 cursor-pointer">
                <IoIosArrowBack size={15} />
                Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#AD46FF] text-white font-bold text-sm shadow-[0_0_15px_-3px_#AD46FF80] cursor-pointer">
                  1
                </button>
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#1E293B40] border border-[#C27AFF1A] text-[#98A2B3] hover:text-white transition-all text-xs md:text-sm cursor-pointer">
                  2
                </button>
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#1E293B40] border border-[#C27AFF1A] text-[#98A2B3] hover:text-white transition-all text-xs md:text-sm cursor-pointer">
                  3
                </button>
                <span className="text-[#98A2B3] px-1 text-sm">...</span>
                <button className="md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-xl bg-[#1E293B40] border border-[#C27AFF1A] text-[#98A2B3] hover:text-white transition-all text-xs md:text-sm cursor-pointer">
                  43
                </button>
              </div>
              <button className="md:px-4 px-3 py-1 md:py-2 border border-[#C27AFF1A] rounded-xl text-[#98A2B3] hover:text-white hover:border-[#C27AFF4D] transition-all bg-[#1E293B40] text-xs md:text-sm flex items-center gap-2 cursor-pointer">
                Next
                <IoIosArrowForward size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketsPage;
