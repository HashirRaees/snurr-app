"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ticketService, Ticket } from "../../lib/services/ticketService";
import { format } from "date-fns";

export default function TicketList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await ticketService.getTickets();
                setTickets(data.results);
            } catch (err) {
                console.error("Failed to fetch tickets", err);
                setError("Failed to load tickets. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <div className="text-white text-center py-8">Loading tickets...</div>;
    }

    if (error) {
        return <div className="text-red-400 text-center py-8">{error}</div>;
    }

    if (tickets.length === 0) {
        return <div className="text-gray-400 text-center py-8">No tickets found.</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">My Tickets</h2>
            <div className="grid gap-4">
                {tickets.map((ticket) => {
                    const lastMessage = ticket.contents && ticket.contents.length > 0
                        ? ticket.contents[ticket.contents.length - 1]
                        : null;

                    return (
                        <Link
                            key={ticket.id}
                            href={`/support/${ticket.id}`}
                            className="block bg-[#12121a] border border-white/10 rounded-xl p-6 hover:border-[#9810FA] transition-all hover:shadow-[0_0_15px_rgba(152,16,250,0.15)]"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[#9810FA] font-medium text-sm">Ticket #{ticket.id}</span>
                                <span className="text-gray-500 text-xs">
                                    {lastMessage ? format(new Date(lastMessage.created_at), 'MMM dd, yyyy HH:mm') : 'No Date'}
                                </span>
                            </div>
                            <h3 className="text-white font-semibold mb-1 line-clamp-1">
                                {lastMessage ? lastMessage.message : 'No content'}
                            </h3>
                            <div className="flex items-center justify-between mt-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${ticket.contents?.[0]?.status === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                                    }`}>
                                    {ticket.contents?.[0]?.status === 0 ? 'Open' : 'Closed'}
                                </span>
                                <span className="text-sm text-gray-400">View Details &rarr;</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
