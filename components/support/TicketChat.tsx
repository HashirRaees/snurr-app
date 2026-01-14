"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { BsSend, BsPerson, BsHeadset } from "react-icons/bs";
import { ticketService, Ticket, TicketContent } from "../../lib/services/ticketService";

interface TicketChatProps {
    ticketId: number;
}

export default function TicketChat({ ticketId }: TicketChatProps) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [contents, setContents] = useState<TicketContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            // First get ticket details to check status etc.
            const detailData = await ticketService.getTicket(ticketId);
            setTicket(detailData.ticket);

            // Then fetch all contents (messages)
            // The API structure seems to return contents in detailData.contents as well
            // But let's check if fetch-contents endpoint gives more or same.
            // Based on API docs, let's use the one from getTicket which seems to return { ticket, contents } in some examples
            // Wait, the API example for DETAIL shows { ticket: { ..., contents: [...] } }
            // AND fetch-contents shows { ticket: {...}, content: [] }
            // I'll stick to using the detail response for now, and if that's paginated or limited, I might need the other.
            // Let's rely on `detailData.ticket.contents` initially as per the first API example.
            // Actually, looking closely at the user request:
            // GET: {{localhost}}/api/support/tickets/1/ -> returns { ticket: { ..., contents: [...] } }
            // GET: {{localhost}}/api/support/tickets/2/fetch-contents/ -> returns { ticket: {...}, content: [] }
            // It seems safer to merge or just use what works. I'll use `getTicket` response.

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
        fetchData();
    }, [ticketId]);

    useEffect(() => {
        scrollToBottom();
    }, [contents]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !ticket?.ticket_number) return;

        setSending(true);
        try {
            const response = await ticketService.sendMessage(ticket.ticket_number, newMessage);

            // Create a new content object from response to append optimistically or just Refetch
            // The response structure matches TicketContent roughly
            const newContent: TicketContent = {
                id: response.id,
                ticket_number: response.ticket_number,
                message: response.message,
                read_status: response.read_status,
                status: response.status,
                created_at: response.created_at,
                updated_at: response.updated_at,
                deleted_at: null,
                user: response.user // usage of user object from response
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

    if (loading) {
        return <div className="text-white text-center py-10">Loading conversation...</div>;
    }

    if (!ticket) {
        return <div className="text-white text-center py-10">Ticket not found.</div>;
    }

    return (
        <div className="flex flex-col h-[600px] bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-[#1a1a24] border-b border-white/5 flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-white font-semibold text-lg">Ticket #{ticket.id}</h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${ticket.ticket_status === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                            }`}>
                            {ticket.ticket_status === 0 ? 'Open' : 'Closed'}
                        </span>
                    </div>
                    {ticket.ticket_title && <p className="text-gray-400 text-sm mt-1">{ticket.ticket_title}</p>}
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {contents.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No messages yet.</div>
                ) : (
                    contents.map((msg) => {
                        // Determine if message is from user or support
                        // The API response for contents has a 'user' field which is null in the example for the ticket creator? 
                        // Or maybe 'user' is null for the original poster?
                        // In the first example: "user": null for contents.
                        // In the send-message response: "user": { ... details ... }
                        // Usually, we compare msg.user_id with current user ID or check if msg.user is null/admin.
                        // Let's assume if msg.user is NOT null, it might be the sender.
                        // Wait, looking at the first example again:
                        // Ticket itself has "user": null.
                        // Ticket contents have "user": null.
                        // This suggests anonymized or just not populated.
                        // BUT, if I am the logged in user, my messages should look like MINE.
                        // If the message is from support, it might have a user or be distinct.
                        // Let's assume: If I created the ticket, my messages are on the right.
                        // Since we don't have auth context easily available here without more context,
                        // we will assume messages with "user" field populated MIGHT be from support or agent if the structure implies it?
                        // Actually, in the POST response, "user" IS populated with MY details.
                        // So if msg.user is populated, it is a USER message.
                        // If msg.user is NULL, is it also a user message?
                        // Let's look at the "send_ticket" controller code:
                        // "user_id" => Auth::user()->id
                        // So all messages have a user_id.
                        // Typically support systems have an 'admin_id' or a flag.
                        // In `tickets/1/` example, `contents` have `user: null`.
                        // This is tricky. Let's try to assume alignment based on simple heuristic:
                        // If it's the current user's token, we treat it as "Me".
                        // But we don't know which ID is "Me" easily without decoding token or fetching profile.
                        // Safe bet: For now, align everything to left unless we know for sure.
                        // OR better: Align standard styling for now.
                        // Re-reading response:
                        // Reply response structure has "user" object.
                        // The historical messages have "user": null.
                        // This might mean "user" relation wasn't loaded or previous messages were anonymous?
                        // Let's just style them all neutrally or slightly different if we can distinguish.

                        // Let's look at `user_id`. The response example doesn't show `user_id` in contents array explicitly, just `user` object.
                        // Wait, the controller code shows `user_id` IS inserted into `ticket_content`.
                        // But the JSON output `contents` array shows objects having `id`, `user` (null), `message`, etc.

                        // Temporary strategy: Align Right for 'Me'. But how to know 'Me'?
                        // I'll make a generic message bubble. 
                        // If `ticket.user_id` matches `content.user_id` -> It's the customer (Right side usually).
                        // If they don't match -> It's support (Left side).
                        // But I don't have `user_id` in the API response JSON for the content item in the prompt example!
                        // It only shows `user: null`.
                        // Okay, I will stick to a neutral design: "User" icon for everyone for now,
                        // or maybe alternating if I can find a differentiator.
                        // Actually, usually the "user" field being null might mean "System" or "Support" in some systems,
                        // but the controller says `user_id` is Auth user.
                        // Let's just use a simple left-aligned Chat UI for everyone to be safe against mis-attribution.

                        return (
                            <div key={msg.id} className="flex flex-col gap-1 items-start">
                                <div className="max-w-[80%] bg-[#2a2a35] rounded-xl p-3 border border-white/5 text-sm text-gray-200">
                                    {msg.message}
                                </div>
                                <span className="text-[10px] text-gray-500 px-1">
                                    {format(new Date(msg.created_at), 'MMM dd, HH:mm')}
                                </span>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-[#1a1a24] border-t border-white/5">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply..."
                        className="flex-1 bg-[#0a0a10] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#9810FA] transition-all text-sm"
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="bg-[#9810FA] hover:bg-[#7a0cc9] text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <BsSend className="text-lg" />
                    </button>
                </div>
            </form>
        </div>
    );
}
