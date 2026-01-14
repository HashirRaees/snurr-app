"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "../../../components/homepage/Navbar";
import TicketChat from "../../../components/support/TicketChat";
// import Footer from "../../components/Footer";

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use() as per Next.js 15+ patterns if applicable, 
    // or standard async await in server components. 
    // Since this is a client component ("use client"), params is a Promise in recent Next.js versions.
    // I will use `use(params)` pattern.
    const resolvedParams = use(params);
    const ticketId = parseInt(resolvedParams.id);

    return (
        <div className="min-h-screen bg-[#050511] font-sans selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -z-10"></div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link
                            href="/support"
                            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                        >
                            &larr; Back to Support
                        </Link>
                    </div>

                    <h1 className="font-heading text-3xl md:text-4xl text-white mb-8 tracking-wide">
                        Ticket Details
                    </h1>

                    <TicketChat ticketId={ticketId} />
                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
