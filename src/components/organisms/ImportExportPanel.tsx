import { Button } from "../atoms/Button";
import { FiDownload, FiUpload, FiAlertTriangle, FiCheck, FiTrash2 } from "react-icons/fi";
import { useGameStore } from "../../store/useGameStore";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ImportExportPanel = () => {
  const { exportData, importData, resetStatuses } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toISOString().split('T')[0];
    link.download = `ps2-vault-tracker-export-${date}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    setSuccess("Collection exported successfully!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importData(content);
      if (result.success) {
        setSuccess("Collection imported successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to import data");
        setTimeout(() => setError(null), 5000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all statuses to missing? This cannot be undone.")) {
      resetStatuses();
      setSuccess("All statuses have been reset.");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
      <div className="flex-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <span>Data & Collection</span>
        </h3>
        <p className="text-xs text-slate-500">Backup, restore, or reset your local progress.</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="danger"
          size="sm"
          onClick={handleReset}
          className="flex items-center space-x-2"
          title="Reset All Statuses"
        >
          <FiTrash2 />
          <span>Reset All</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2"
        >
          <FiUpload />
          <span>Import</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleExport}
          className="flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
        >
          <FiDownload />
          <span>Export JSON</span>
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
        accept=".json"
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-2xl border border-red-400"
          >
            <FiAlertTriangle className="w-5 h-5" />
            <span className="font-bold tracking-tight">{error}</span>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-bg-darker px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-2xl border border-cyan-300"
          >
            <FiCheck className="w-5 h-5 font-black" />
            <span className="font-bold tracking-tight">{success}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
