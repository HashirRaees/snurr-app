"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/admin/Navbar";
import axiosInstance from "@/lib/axios";
import { IoMdClose, IoMdTrash } from "react-icons/io";
import { FiSettings, FiSave } from "react-icons/fi";

const AffiliateApiSettings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    partner_list: false,
    player_disable_mark: false,
    player_disable_unmark: false,
    player_duplicate_mark: false,
    player_duplicate_unmark: false,
    player_import: false,
    player_self_excluded_mark: false,
    player_self_excluded_unmark: false,
    sync_players: false,
    import_player_activities: false,
    import_invalid_player_activities: false,
    import_invalid_synced_visits: false,
    count_visit_sync: false,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/affiliates/affiliate-api-settings/");

      if (response.data) {
        const data = response.data.results || response.data;
        if (Array.isArray(data) && data.length > 0) {
          const setting = data[0];
          setSettings(setting);
          setFormData({
            partner_list: setting.partner_list === 1 || setting.partner_list === true,
            player_disable_mark: setting.player_disable_mark === 1 || setting.player_disable_mark === true,
            player_disable_unmark: setting.player_disable_unmark === 1 || setting.player_disable_unmark === true,
            player_duplicate_mark: setting.player_duplicate_mark === 1 || setting.player_duplicate_mark === true,
            player_duplicate_unmark: setting.player_duplicate_unmark === 1 || setting.player_duplicate_unmark === true,
            player_import: setting.player_import === 1 || setting.player_import === true,
            player_self_excluded_mark: setting.player_self_excluded_mark === 1 || setting.player_self_excluded_mark === true,
            player_self_excluded_unmark: setting.player_self_excluded_unmark === 1 || setting.player_self_excluded_unmark === true,
            sync_players: setting.sync_players === 1 || setting.sync_players === true,
            import_player_activities: setting.import_player_activities === 1 || setting.import_player_activities === true,
            import_invalid_player_activities: setting.import_invalid_player_activities === 1 || setting.import_invalid_player_activities === true,
            import_invalid_synced_visits: setting.import_invalid_synced_visits === 1 || setting.import_invalid_synced_visits === true,
            count_visit_sync: setting.count_visit_sync === 1 || setting.count_visit_sync === true,
          });
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch API settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleDelete = async () => {
    if (!settings) return;

    try {
      setProcessing(true);
      await axiosInstance.delete(`/api/affiliates/affiliate-api-settings/${settings.id}/`);
      alert("Settings deleted successfully!");
      setSettings(null);
      setFormData({
        partner_list: false,
        player_disable_mark: false,
        player_disable_unmark: false,
        player_duplicate_mark: false,
        player_duplicate_unmark: false,
        player_import: false,
        player_self_excluded_mark: false,
        player_self_excluded_unmark: false,
        sync_players: false,
        import_player_activities: false,
        import_invalid_player_activities: false,
        import_invalid_synced_visits: false,
        count_visit_sync: false,
      });
      setShowDeleteModal(false);
    } catch (err: any) {
      console.error("Failed to delete settings:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to delete settings.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    try {
      setProcessing(true);
      const payload: any = {};

      // Only include fields that are true
      Object.keys(formData).forEach((key) => {
        if (formData[key as keyof typeof formData]) {
          payload[key] = 1;
        }
      });

      if (settings) {
        // Update existing
        await axiosInstance.patch(
          `/api/affiliates/affiliate-api-settings/${settings.id}/`,
          payload
        );
      } else {
        // Create new
        await axiosInstance.post("/api/affiliates/affiliate-api-settings/", payload);
      }

      alert("Settings saved successfully!");
      fetchSettings();
    } catch (err: any) {
      console.error("Failed to save settings:", err);
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Failed to save settings.";
      alert(msg);
    } finally {
      setProcessing(false);
    }
  };

  const toggleField = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const settingFields = [
    { key: "partner_list", label: "Partner List" },
    { key: "player_disable_mark", label: "Player Disable Mark" },
    { key: "player_disable_unmark", label: "Player Disable Unmark" },
    { key: "player_duplicate_mark", label: "Player Duplicate Mark" },
    { key: "player_duplicate_unmark", label: "Player Duplicate Unmark" },
    { key: "player_import", label: "Player Import" },
    { key: "player_self_excluded_mark", label: "Player Self Excluded Mark" },
    { key: "player_self_excluded_unmark", label: "Player Self Excluded Unmark" },
    { key: "sync_players", label: "Sync Players" },
    { key: "import_player_activities", label: "Import Player Activities" },
    { key: "import_invalid_player_activities", label: "Import Invalid Player Activities" },
    { key: "import_invalid_synced_visits", label: "Import Invalid Synced Visits" },
    { key: "count_visit_sync", label: "Count Visit Sync" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#22003B] font-sans pb-20">
      <Navbar />

      <main className="mx-auto px-5 md:px-20 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 px-1 flex-wrap">
          <Link href="/admin/affiliate">
            <span className="text-[#C27AFF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Affiliate
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/req-list">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Requests
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/users">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Users
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/withdraws">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Withdrawals
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/bonuses">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Bonuses
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/pro-transactions">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Pro Transactions
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/media-list">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              MultiMedia
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/list-affiliates">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              List Affiliates
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/settings">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Settings
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/api-history">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              API History
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#C27AFF] font-medium">API Settings</span>
          <span className="text-white/20">/</span>
          <Link href="/admin/affiliate/visitor-history">
            <span className="text-[#99A1AF] hover:text-[#C27AFF] cursor-pointer transition-colors font-medium">
              Visitor History
            </span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex md:flex-row flex-col md:items-center justify-between mb-8 gap-4 px-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#AD46FF33] rounded-2xl flex items-center justify-center text-[#C27AFF]">
              <FiSettings size={28} />
            </div>
            <div>
              <h2 className="text-white text-3xl font-heading">
                Affiliate API Settings
              </h2>
              <p className="text-[#98A2B3] text-sm mt-1">
                Configure affiliate API integration settings
              </p>
            </div>
          </div>
          {settings && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 rounded-xl shadow-[0_10px_15px_-3px_#FF46464D] bg-[#FB2C36] text-white text-sm font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
            >
              <IoMdTrash size={20} />
              Delete Settings
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Settings Form */}
        <div className="bg-[#10182899] border border-[#1E293980] rounded-[32px] overflow-hidden backdrop-blur-md">
          <div className="md:p-8 p-5 border-b border-[#C27AFF1A]">
            <h3 className="text-white text-xl font-bold">API Configuration</h3>
            <p className="text-[#98A2B3] text-sm mt-2">
              Enable or disable specific API features
            </p>
          </div>

          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <div key={idx} className="h-16 bg-white/5 rounded-xl"></div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingFields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center justify-between p-4 bg-[#1E293B40] border border-[#364153] rounded-xl hover:border-[#C27AFF] transition-all"
                  >
                    <label className="text-white text-sm font-medium cursor-pointer flex-1">
                      {field.label}
                    </label>
                    <button
                      onClick={() => toggleField(field.key as keyof typeof formData)}
                      className={`relative w-14 h-7 rounded-full transition-all ${
                        formData[field.key as keyof typeof formData]
                          ? "bg-[#12B76A]"
                          : "bg-[#364153]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          formData[field.key as keyof typeof formData]
                            ? "translate-x-7"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-end gap-4">
                <button
                  onClick={handleSave}
                  disabled={processing}
                  className="px-8 py-3 bg-[#12B76A] rounded-xl text-white text-sm font-bold hover:bg-[#10A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FiSave size={18} />
                  {processing ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#C27AFF21] rounded-[32px] max-w-md w-full">
            <div className="p-6 border-b border-[#C27AFF21]">
              <h3 className="text-white text-xl font-bold">Delete Settings</h3>
              <p className="text-[#98A2B3] text-sm mt-2">
                Are you sure you want to delete these API settings? This action cannot be undone.
              </p>
            </div>
            <div className="p-6 flex items-center justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2.5 bg-[#1E2939] border border-[#364153] rounded-xl text-white text-sm hover:bg-[#1E293B] transition-all"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={processing}
                className="px-6 py-2.5 bg-[#FB2C36] rounded-xl text-white text-sm hover:bg-[#E0242E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateApiSettings;

