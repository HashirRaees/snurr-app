"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { BsSend } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import Navbar from "@/components/admin/Navbar";
import { Ticket, TicketContent, ticketService } from "@/lib/services/ticketService";

export default function AdminTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const ticketId = parseInt(resolvedParams.id);

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [contents, setContents] = useState<TicketContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            const detailData = await ticketService.getTicket(ticketId);
            setTicket(detailData.ticket);

            // Logic to merge or select contents
            if (detailData.ticket && detailData.ticket.contents) {
                setContents(detailData.ticket.contents);
            } else if (detailData.content) {
                setContents(detailData.content);
            }
        } catch (err) {
            console.error("Failed to fetch ticket details", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ticketId) {
            fetchData();
        }
    }, [ticketId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [contents]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !ticket?.ticket_number) return;

        setSending(true);
        try {
            const response = await ticketService.sendMessage(ticket.ticket_number, newMessage);

            // Optimistic update or refetch
            const newContent: TicketContent = {
                id: response.id,
                ticket_number: response.ticket_number,
                message: response.message,
                read_status: response.read_status,
                status: response.status,
                created_at: response.created_at,
                updated_at: response.updated_at,
                deleted_at: null,
                user: generateAdminUserStub(), // Mark as admin msg locally if needed
            };

            setContents([...contents, newContent]);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message", err);
            alert("Failed to send message. Please try again.");
        } finally {
            setSending(false);
        }
    };

    // Helper to distinguish admin vs user if API doesn't help. 
    // Ideally check response.user and see if it matches ticket.user data. 
    // But for admin panel, "My" messages are Admin messages.
    const generateAdminUserStub = () => ({ id: 'admin', name: 'Admin', email: 'admin@snurr.com' });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#22003B] font-sans text-white flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="min-h-screen bg-[#22003B] font-sans text-white flex justify-center items-center">
                Ticket not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#22003B] font-sans pb-20">
            <Navbar />

            <main className="mx-auto px-5 md:px-20 py-8">
                {/* Header / Breadcrumb */}
                <div className="mb-6">
                    <Link
                        href="/admin/tickets"
                        className="text-[#C27AFF] hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
                    >
                        <IoIosArrowBack /> Back to Tickets
                    </Link>

                    <div className="bg-[#10182899] border border-[#1E293980] rounded-[24px] p-6 backdrop-blur-md">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-white">Ticket #{ticket.ticket_number || ticket.id}</h1>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${ticket.ticket_status === 0
                                        ? "bg-[#2B7FFF33] text-[#51A2FF] border border-[#2B7FFF4D]"
                                        : "bg-[#FB2C3633] text-[#FF6467] border border-[#FB2C364D]"
                                        }`}>
                                        {ticket.ticket_status === 0 ? "Open" : "Closed"}
                                    </span>
                                </div>
                                <h2 className="text-[#98A2B3] text-lg">{ticket.ticket_title}</h2>
                                <p className="text-[#98A2B3] text-sm mt-1">
                                    From: <span className="text-white">{ticket.user?.email || "Unknown User"}</span>
                                </p>
                            </div>

                            {/* Actions could go here (e.g. Close Ticket button) */}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="bg-[#10182899] border border-[#1E293980] rounded-[24px] overflow-hidden backdrop-blur-md h-[600px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {contents.length === 0 ? (
                            <div className="text-center text-[#98A2B3] mt-10">No messages found.</div>
                        ) : (
                            contents.map((msg) => {
                                // Logic to align messages:
                                // If msg has NO user, or user email matches ticket user email -> Left (Customer)
                                // If msg has user and user email does NOT match ticket user -> Right (Admin/Support)
                                // Note: This is a heuristic.
                                const isCustomer = !msg.user || (ticket.user && msg.user.email === ticket.user.email);

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-xl p-4 text-sm ${isCustomer
                                                ? "bg-[#1E293B] text-gray-200 border border-[#364153]"
                                                : "bg-[#AD46FF33] text-white border border-[#AD46FF4D]"
                                                }`}
                                        >
                                            <p>{msg.message}</p>
                                        </div>
                                        <span className="text-[10px] text-[#98A2B3] px-1 mt-1">
                                            {format(new Date(msg.created_at), 'MMM dd, HH:mm')}
                                            {msg.user && !isCustomer && ` • ${msg.user.name || 'Support'}`}
                                            {msg.user && isCustomer && ` • ${msg.user.name || 'User'}`}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-[#1a1a24]/50 border-t border-[#1E293980]">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your reply..."
                                className="flex-1 bg-[#1E293B40] border border-[#364153] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all"
                                disabled={sending || ticket.ticket_status !== 0}
                            />
                            <button
                                type="submit"
                                disabled={sending || !newMessage.trim() || ticket.ticket_status !== 0}
                                className="bg-[#AD46FF] hover:bg-[#9030E0] text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_-3px_#AD46FF80]"
                            >
                                <BsSend className="text-xl" />
                            </button>
                        </div>
                        {ticket.ticket_status !== 0 && (
                            <p className="text-center text-xs text-[#98A2B3] mt-2">This ticket is closed.</p>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}
