"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { format } from "date-fns";
import Navbar from "@/components/admin/Navbar";
import { User, userService } from "@/lib/services/userService";

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const userId = parseInt(resolvedParams.id);

    const [user, setUser] = useState<User | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const data = await userService.getCustomerDetails(userId);
            // API returns { user: {...}, commentsList: [...] }
            setUser(data.user);
            setComments(data.commentsList || []);
        } catch (error) {
            console.error("Failed to fetch customer details", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        try {
            setSubmitting(true);
            // Post payload likely needs just the comment string or object? 
            // Prompt says: POST .../create-leave-note/
            // I'll send { note: newNote } or similar.
            await userService.createLeaveNote(userId, { data: newNote });
            // Refresh details to see new note
            fetchDetails();
            setNewNote("");
            alert("Note added successfully");
        } catch (error) {
            console.error("Failed to add note", error);
            alert("Failed to add note");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (userId) fetchDetails();
    }, [userId]);

    if (loading) {
        return <div className="min-h-screen bg-[#22003B] flex items-center justify-center text-white">Loading customer details...</div>;
    }

    if (!user) {
        return <div className="min-h-screen bg-[#22003B] flex items-center justify-center text-white">Customer not found.</div>;
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
            <Navbar />

            <main className="mx-auto px-5 md:px-20 py-8">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link
                        href="/admin/customer/list"
                        className="text-[#C27AFF] hover:text-white transition-colors text-sm flex items-center gap-2 mb-4"
                    >
                        <IoIosArrowBack /> Back to Customers
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: User Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#10182899] border border-[#1E293980] rounded-[24px] p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white mb-4">Customer Profile</h2>

                            <div className="flex flex-col items-center mb-6">
                                <div className="w-24 h-24 bg-[#AD46FF33] rounded-full flex items-center justify-center text-[#C27AFF] text-3xl font-bold mb-3">
                                    {(user.first_name?.[0] || user.username?.[0] || "U").toUpperCase()}
                                </div>
                                <h3 className="text-white font-medium text-lg">{user.first_name} {user.last_name}</h3>
                                <p className="text-[#98A2B3] text-sm">@{user.username}</p>
                            </div>

                            <div className="space-y-4">
                                <InfoItem label="Account ID" value={`#${user.id}`} />
                                <InfoItem label="Email" value={user.email} />
                                <InfoItem label="Phone" value={user.phone || "N/A"} />
                                <InfoItem label="Country" value={user.country || "N/A"} />
                                <InfoItem label="City" value={user.city || "N/A"} />
                                <InfoItem label="Address" value={user.address || "N/A"} />
                                <InfoItem label="Status" value={
                                    <span className={`px-2 py-0.5 rounded text-xs ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                } />
                                <InfoItem label="Joined" value={user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "N/A"} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Notes / Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Add Note Section */}
                        <div className="bg-[#10182899] border border-[#1E293980] rounded-[24px] p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white mb-4">Leave a Note</h2>
                            <form onSubmit={handleAddNote}>
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Enter administrative notes here..."
                                    className="w-full bg-[#1E293B40] border border-[#364153] rounded-xl p-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all min-h-[100px] mb-4"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={submitting || !newNote.trim()}
                                        className="px-6 py-2 bg-[#AD46FF] hover:bg-[#9030E0] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {submitting ? "Saving..." : "Save Note"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Existing Notes List */}
                        <div className="bg-[#10182899] border border-[#1E293980] rounded-[24px] p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white mb-4">Note History</h2>
                            {comments.length === 0 ? (
                                <p className="text-[#98A2B3] text-sm text-center py-8">No notes found for this user.</p>
                            ) : (
                                <div className="space-y-4">
                                    {comments.map((note: any, idx) => (
                                        <div key={idx} className="bg-[#1E293B40] border border-[#364153] rounded-xl p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[#C27AFF] text-xs font-bold uppercase">Admin Note</span>
                                                <span className="text-[#98A2B3] text-xs">
                                                    {note.created_at ? format(new Date(note.created_at), 'MMM dd, yyyy HH:mm') : "Unknown Date"}
                                                </span>
                                            </div>
                                            <p className="text-gray-200 text-sm">{note.comment || note.data || JSON.stringify(note)}</p>
                                            {/* Adapt field access based on actual response structure */}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const InfoItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex justify-between py-2 border-b border-white/5 last:border-0">
        <span className="text-[#98A2B3] text-sm">{label}</span>
        <div className="text-white text-sm font-medium text-right max-w-[60%] truncate">{value}</div>
    </div>
);
