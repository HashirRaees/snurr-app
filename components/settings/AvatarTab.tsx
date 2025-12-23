import { FiUpload, FiTrash2 } from "react-icons/fi";
import { LuImage } from "react-icons/lu";

export default function AvatarTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Current Avatar */}
      <div className="lg:col-span-1 bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8 h-full">
        <h2 className="text-white text-2xl  mb-8">Current Avatar</h2>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-64 h-64 rounded-full p-1 bg-[#BF9600] shadow-[0_0_50px_rgba(255,215,0,0.4)] mb-8">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src="/assets/discover-games.jpg"
                alt="Current Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button className="w-full cursor-pointer py-3 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white  uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all flex items-center justify-center gap-2 mb-4">
            <FiUpload className="text-xl" /> Upload New Avatar
          </button>

          <button className="w-full cursor-pointer py-3 rounded-xl bg-[#82181A4D] border border-[#FB2C364D] text-[#FF6467] font-medium hover:bg-[#FF6467]/30 transition-all flex items-center justify-center gap-2">
            <FiTrash2 className="text-xl" /> Remove Avatar
          </button>
        </div>

        <div className="bg-[#59168B4D] border border-[#AD46FF33] rounded-2xl p-6">
          <p className="text-[#DAB2FF] text-sm mb-4">Requirements:</p>
          <ul className="space-y-2 text-[#DAB2FF] text-sm">
            <li className="flex items-center gap-2">
              • Maximum file size: 5MB
            </li>
            <li className="flex items-center gap-2">
              • Accepted formats: JPG, PNG, GIF
            </li>
            <li className="flex items-center gap-2">
              • Recommended size: 400x400px
            </li>
            <li className="flex items-center gap-2">
              • Square images work best
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Presets & Frames */}
      <div className="lg:col-span-2 bg-[linear-gradient(135deg,rgba(89,22,139,0.4)_0%,rgba(114,19,120,0.4)_100%)] border border-[#AD46FF33] rounded-3xl p-6 md:p-8">
        <h2 className="text-white text-2xl mb-6">Choose from Presets</h2>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="aspect-square rounded-full p-[2px] cursor-pointer hover:shadow-[0_0_20px_rgba(173,70,255,0.4)] transition-all pt-1"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-black/50 border border-[#AD46FF33] hover:border-[#9810FA] transition-all">
                <img
                  src={`/assets/avatar${num}.png`}
                  alt={`Preset ${num}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-white text-2xl  mb-2">Avatar Frames</h2>
        <p className="text-[#AD46FF] text-sm mb-6">
          Unlock exclusive frames by reaching higher VIP levels
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              name: "Gold",
              color: "#f97316",
            },
            {
              name: "Diamond",
              color: "#06b6d4",
            },
            {
              name: "Ruby",
              color: "#F6339A",
              innerIcon: "#C08695",
              locked: true,
              vip: 7,
            },
            {
              name: "Emerald",
              color: "#00BC7D",
              innerIcon: "#6B9E83",
              locked: true,
              vip: 8,
            },
          ].map((frame, idx) => (
            <div
              key={idx}
              className="aspect-[2/3] rounded-2xl p-1.5 flex flex-col cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: frame.color }}
            >
              <div className="flex-1 w-full bg-[#421C76] rounded-xl flex items-center justify-center relative overflow-hidden">
                {frame.locked ? (
                  <div className="flex flex-col items-center justify-center text-white">
                    <span className="text-sm absolute ">VIP</span>
                    <span className="text-sm absolute mt-8 ">{frame.vip}</span>
                    <LuImage className="text-2xl mt-1 opacity-20" />
                  </div>
                ) : (
                  <LuImage className="text-4xl opacity-50 text-[#DAB2FF]" />
                )}
              </div>
              <div className="text-center text-white text-sm  uppercase py-2">
                {frame.name}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full cursor-pointer py-4 rounded-xl bg-[linear-gradient(90deg,#9810FA_0%,#C800DE_100%)] text-white  uppercase tracking-wide shadow-[0_0_20px_rgba(152,16,250,0.4)] hover:shadow-[0_0_30px_rgba(152,16,250,0.6)] transition-all">
          Save Avatar
        </button>
      </div>
    </div>
  );
}
