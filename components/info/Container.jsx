export default function Container({children}) {
  return (
    <>
    <div className="border rounded-2xl max-w-7xl mx-auto py-3 px-4 border-[#C27AFF4D] bg-[linear-gradient(135deg,rgba(18,18,26,0.95)_0%,rgba(89,22,139,0.1)_50%,rgba(134,16,67,0.1)_100%)] shadow-[0_4px_6px_-4px_#0000001A] shadow-[0_10px_15px_-3px_#0000001A] shadow-[0_0_0px_1px_#AD46FF33]">
        {children}
    </div>
    </>
  );
}