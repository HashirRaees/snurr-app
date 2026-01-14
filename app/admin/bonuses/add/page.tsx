"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../../components/admin/Navbar";
import { FiGift, FiPlus } from "react-icons/fi";
import { bonusService } from "../../../../lib/services/bonusService";

const AddBonusPage = () => {
  const labelClasses = "text-[#D1D5DC] text-sm font-medium min-w-[150px]";
  const inputContainerClasses = "flex flex-col md:flex-row md:items-center gap-2 mb-6";
  const inputClasses = "flex-1 bg-[#1E293B40] w-full border border-[#364153] rounded-xl py-3 px-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#AD46FF] transition-all";
  const helperTextClasses = "text-[#00C950] text-xs mt-2 block";
  const selectClasses = "flex-1 bg-[#1E293B40] w-full border border-[#364153] rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-[#AD46FF] transition-all";

  const [selectedType, setSelectedType] = useState("");
  const [confirmedType, setConfirmedType] = useState("");
  const [isCheckingType, setIsCheckingType] = useState(false);

  // Form States
  const [formData, setFormData] = useState<any>({
    bonus_name: "",
    bonus_amount: "",
    free_spin: "",
    bonus_code: "",
    deposit_method: "",
    min_loss: "",
    w_2: "01",
    recurring: "w",
    status: "1",
    // Date fields
    from_field: "",
    till: "",
    specific_day: "",
    // Other fields if needed
  });
  const [submitting, setSubmitting] = useState(false);

  const bonusTypes = [
    { value: "registration", label: "Registration Bonus" },
    { value: "login", label: "Login Bonus" },
    { value: "deposit", label: "Deposit Bonus" },
    { value: "code", label: "Code Bonus" },
    { value: "method", label: "Method Bonus" },
    { value: "cashback", label: "Cashback Bonus" },
  ];

  const timeCategories = [
    { value: "recurring", label: "Recurring" },
    { value: "specific_date", label: "Specific Date" },
    { value: "from_till", label: "From - Till" },
  ];

  // Derived state for date category to show correct fields
  const [dateCategory, setDateCategory] = useState("recurring");

  const handleTypeSubmit = async () => {
    if (!selectedType) {
      alert("Please select a bonus type");
      return;
    }
    setIsCheckingType(true);
    try {
      const res = await bonusService.checkBonusType(selectedType);
      if (res.message === "Bonus type stored" || res.bonus_type) {
        setConfirmedType(selectedType);
      } else {
        alert("Bonus type check failed.");
      }
    } catch (error) {
      console.error("Type check error", error);
      alert("Failed to check bonus type. API might be down.");
      // For dev flow if API is Mock: setConfirmedType(selectedType);
    } finally {
      setIsCheckingType(false);
    }
  };

  const handleAddBonus = async () => {
    setSubmitting(true);
    try {
      let response;
      const payload = { ...formData };

      // Clean up payload based on type if needed, but sending extra fields usually ignored by robust APIs.
      // Ensure numbers are numbers where expected.
      if (payload.bonus_amount) payload.bonus_amount = Number(payload.bonus_amount);
      if (payload.free_spin) payload.free_spin = Number(payload.free_spin);
      if (payload.min_loss) payload.min_loss = Number(payload.min_loss);
      if (payload.bet_size) payload.bet_size = Number(payload.bet_size || 0);
      if (payload.lines) payload.lines = Number(payload.lines || 0);
      if (payload.wagering_req) payload.wagering_req = Number(payload.wagering_req || 0);

      // Status convert to number
      payload.status = parseInt(payload.status);

      switch (confirmedType) {
        case "registration":
          response = await bonusService.createRegistrationBonus(payload);
          break;
        case "login":
          response = await bonusService.createLoginBonus(payload);
          break;
        case "deposit":
          response = await bonusService.createDepositBonus(payload);
          break;
        case "code":
          response = await bonusService.createCodeBonus(payload);
          break;
        case "method":
          response = await bonusService.createMethodBonus(payload);
          break;
        case "cashback":
          response = await bonusService.createCashbackBonus(payload);
          break;
        default:
          alert("Unknown bonus type");
          setSubmitting(false);
          return;
      }

      alert(`${confirmedType.charAt(0).toUpperCase() + confirmedType.slice(1)} Bonus added successfully!`);
      // Reset form or redirect
      // router.push("/admin/bonuses/list");
    } catch (error) {
      console.error("Failed to add bonus", error);
      alert("Failed to add bonus. Please check inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  // Render Form Fields Helpers
  const renderCommonFields = () => (
    <>
      <div className={inputContainerClasses}>
        <label className={labelClasses}>Bonus Name</label>
        <input
          type="text"
          value={formData.bonus_name}
          onChange={(e) => setFormData({ ...formData, bonus_name: e.target.value })}
          placeholder="Enter bonus title"
          className={inputClasses}
        />
      </div>

      {(confirmedType === "registration" || confirmedType === "login" || confirmedType === "deposit" || confirmedType === "code") && (
        <div className={inputContainerClasses}>
          <label className={labelClasses}>Bonus Amount (Tokens)</label>
          <input
            type="number"
            value={formData.bonus_amount}
            onChange={(e) => setFormData({ ...formData, bonus_amount: e.target.value })}
            placeholder="Enter amount"
            className={inputClasses}
          />
        </div>
      )}

      {(confirmedType !== "cashback" && confirmedType !== "code") && (
        <div className={inputContainerClasses}>
          <label className={labelClasses}>Free Spins</label>
          <input
            type="number"
            value={formData.free_spin}
            onChange={(e) => setFormData({ ...formData, free_spin: e.target.value })}
            placeholder="Enter number of free spins"
            className={inputClasses}
          />
        </div>
      )}
    </>
  );

  const renderSpecificFields = () => {
    switch (confirmedType) {
      case "deposit":
      case "code":
        return (
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Bonus Code</label>
            <input
              type="text"
              value={formData.bonus_code}
              onChange={(e) => setFormData({ ...formData, bonus_code: e.target.value })}
              placeholder="e.g DEPOSIT100"
              className={inputClasses}
            />
          </div>
        );
      case "method":
        return (
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Deposit Method</label>
            <select
              value={formData.deposit_method}
              onChange={(e) => setFormData({ ...formData, deposit_method: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select Method</option>
              <option value="crypto">Crypto</option>
              <option value="card">Card</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>
        );
      case "cashback":
        return (
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Min Loss</label>
            <input
              type="number"
              value={formData.min_loss}
              onChange={(e) => setFormData({ ...formData, min_loss: e.target.value })}
              placeholder="Minimum loss amount"
              className={inputClasses}
            />
          </div>
        );
      default: return null;
    }
  };

  const renderTimeCategories = () => (
    <>
      <div className={inputContainerClasses}>
        <label className={labelClasses}>Bonus Time Category</label>
        <div className="flex-1">
          <select
            value={dateCategory}
            onChange={(e) => setDateCategory(e.target.value)}
            className={selectClasses}
          >
            {timeCategories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <span className={helperTextClasses}>
            Select how the bonus duration is handled
          </span>
        </div>
      </div>

      {dateCategory === "specific_date" && (
        <div className={inputContainerClasses}>
          <label className={labelClasses}>Specific Day</label>
          <input
            type="date"
            value={formData.specific_day}
            onChange={(e) => setFormData({ ...formData, specific_day: e.target.value })}
            className={inputClasses}
          />
        </div>
      )}

      {dateCategory === "from_till" && (
        <>
          <div className={inputContainerClasses}>
            <label className={labelClasses}>From</label>
            <input
              type="date"
              value={formData.from_field}
              onChange={(e) => setFormData({ ...formData, from_field: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className={inputContainerClasses}>
            <label className={labelClasses}>Till</label>
            <input
              type="date"
              value={formData.till}
              onChange={(e) => setFormData({ ...formData, till: e.target.value })}
              className={inputClasses}
            />
          </div>
        </>
      )}

      {dateCategory === "recurring" && (
        <div className={inputContainerClasses}>
          <label className={labelClasses}>Recurring Period</label>
          <div className="flex-1">
            <select
              value={formData.recurring}
              onChange={(e) => setFormData({ ...formData, recurring: e.target.value })}
              className={selectClasses}
            >
              <option value="w">Weekly</option>
              <option value="m">Monthly</option>
              <option value="d">Daily</option>
            </select>
            <span className={helperTextClasses}>
              Example logic: 'w' for Weekly
            </span>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1">
          <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Bonuses
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
            Add Bonus
          </span>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-10 px-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FiGift size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl tracking-tight">Add Bonus</h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Create new bonus offer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin/bonuses/list">
              <button className="px-6 py-3 rounded-xl bg-[linear-gradient(90deg,#2D7FFF_0%,#0062FF_100%)] shadow-[0_0_15px_rgba(45,127,255,0.4)] text-white text-sm flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap">
                Bonus list
              </button>
            </Link>
          </div>
        </div>

        {/* Select Bonus Type Card */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 mb-10 backdrop-blur-md">
          <h3 className="text-white text-lg font-medium mb-8">
            Select Bonus Type
          </h3>

          <div className={inputContainerClasses}>
            <label className={labelClasses}>Bonus Type</label>
            <div className="flex-1">
              <select
                className={selectClasses}
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setConfirmedType(""); // Reset confirmation on change
                }}
              >
                <option value="">Select Type</option>
                {bonusTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <span className={helperTextClasses}>
                select bonus type from drop down before adding and submit to
                show relevant form
              </span>
            </div>
          </div>

          <div className="flex justify-start md:ml-[166px]">
            <button
              onClick={handleTypeSubmit}
              disabled={isCheckingType}
              className="px-10 py-3 rounded-xl bg-[#2D7FFF] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#2D7FFFEE] transition-all cursor-pointer shadow-[0_0_15px_rgba(45,127,255,0.3)] disabled:opacity-50">
              {isCheckingType ? "Checking..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Dynamic Bonus Form */}
        {confirmedType && (
          <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] p-8 backdrop-blur-md fade-in">
            <h3 className="text-white text-lg font-medium mb-8 capitalize">
              Add {confirmedType} Bonus
            </h3>

            {renderCommonFields()}
            {renderSpecificFields()}
            {renderTimeCategories()}

            {/* Excluded countries (Placeholder) */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>Excluded countries</label>
              <div className="flex-1">
                <input type="text" placeholder="e.g US, UK"
                  value={formData.ex_country || ""}
                  onChange={(e) => setFormData({ ...formData, ex_country: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Affiliate source */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>Affiliate source</label>
              <input type="text"
                value={formData.aff_source || ""}
                onChange={(e) => setFormData({ ...formData, aff_source: e.target.value })}
                className={inputClasses}
              />
            </div>

            {/* Status */}
            <div className={inputContainerClasses}>
              <label className={labelClasses}>Status</label>
              <div className="flex-1">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={selectClasses}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col items-start md:ml-[166px] mt-4">
              <button
                onClick={handleAddBonus}
                disabled={submitting}
                className="px-10 py-3 rounded-xl bg-[#2D7FFF] text-white text-sm flex items-center justify-center gap-2 hover:bg-[#2D7FFFEE] transition-all cursor-pointer shadow-[0_0_15px_rgba(45,127,255,0.3)] disabled:opacity-50">
                <FiPlus size={18} /> {submitting ? "Adding..." : "Add"}
              </button>
              <span className="text-white/40 text-[10px] mt-3">
                click on 'Add' button to save bonus
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddBonusPage;
