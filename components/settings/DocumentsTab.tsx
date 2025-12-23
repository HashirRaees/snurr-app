import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export default function DocumentsTab() {
  return (
    <div className="bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-[#E9D4FF] text-sm">
          Please provide a copy of your ID-Card OR Passport for identity
          verification and another document for address verification.
        </p>
      </div>

      <h2 className="text-white text-xl font-bold text-center mb-6 uppercase tracking-wide">
        Type of Document
      </h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="text-[#E9D4FF] text-sm mb-2 block">
            Document Type
          </label>
          <div className="relative">
            <select className="w-full bg-[#0000004D] border border-[#FF690080] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9810FA] appearance-none cursor-pointer">
              <option>Passport</option>
              <option>ID Card</option>
              <option>Driver's License</option>
            </select>
            <IoIosArrowDown className="absolute right-4 top-[18px] text-[#DAB2FF] pointer-events-none" />
          </div>
        </div>

        {[
          { label: "User Selfie :", id: "selfie" },
          { label: "Front Side :", id: "front" },
        ].map((field) => (
          <div
            key={field.id}
            className="bg-[#0000004D] border border-[#FF690080] rounded-xl p-4 flex items-center justify-between"
          >
            <span className="text-white text-sm">{field.label}</span>
            <div className="flex items-center gap-3">
              <button className="px-4 py-1.5 rounded-lg border border-[#FF6900] text-[#FF8904] text-xs hover:bg-[#FF6900] hover:text-white transition-all uppercase">
                Choose
              </button>
              <span className="text-[#DAB2FF] text-xs">Upload File</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-12">
        <button className="px-12 py-3 rounded-xl bg-[linear-gradient(90deg,#F0B100_0%,#FF6900_100%)] text-white  tracking-wide shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:shadow-[0_0_30px_rgba(255,165,0,0.6)] transition-all">
          Submit
        </button>
      </div>

      <h2 className="text-white border-t py-7 border-[#FFFFFF1A] text-xl font-bold text-center mb-6 uppercase tracking-wide">
        All Information
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-white text-base  tracking-wider">
              <th className="pb-2">Date</th>
              <th className="pb-2">Type</th>
              <th className="pb-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {[
              { date: "2024-11-05", type: "Passport", status: "Approved" },
              {
                date: "2024-11-10",
                type: "Proof of Address",
                status: "Pending",
              },
              {
                date: "2024-10-28",
                type: "Selfie Verification",
                status: "Approved",
              },
              {
                date: "2024-10-15",
                type: "Driver's License",
                status: "Rejected",
              },
            ].map((row, index) => (
              <tr key={index} className="text-sm">
                <td className="py-4 border-b border-[#FFFFFF1A] text-[#DAB2FF]">
                  {row.date}
                </td>
                <td className="py-4 border-b border-[#FFFFFF1A] text-[#DAB2FF]">
                  {row.type}
                </td>
                <td className="py-4 border-b border-[#FFFFFF1A] text-right">
                  {row.status === "Approved" && (
                    <span className="inline-flex items-center gap-2 text-[#00C950]">
                      <FaRegCheckCircle /> Approved
                    </span>
                  )}
                  {row.status === "Pending" && (
                    <span className="inline-flex items-center gap-2 text-[#F0B100]">
                      <FaRegClock /> Pending
                    </span>
                  )}
                  {row.status === "Rejected" && (
                    <span className="inline-flex items-center gap-2 text-[#FF6467]">
                      <RxCrossCircled /> Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
