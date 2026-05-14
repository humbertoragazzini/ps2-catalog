import { Button } from "../atoms/Button";
import { FiDownload, FiUpload, FiAlertTriangle } from "react-icons/fi";
import { useGameStore } from "../../store/useGameStore";
import { useRef, useState } from "react";

export const ImportExportPanel = () => {
  const { exportData, importData } = useGameStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ps2-collection-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importData(content);
      if (!result.success) {
        setError(result.error || "Failed to import data");
        setTimeout(() => setError(null), 5000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
      <div className="flex-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Collection Data</h3>
        <p className="text-xs text-slate-500">Backup or restore your tracking progress locally.</p>
      </div>
      
      <div className="flex items-center gap-2">
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
          className="flex items-center space-x-2"
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

      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg animate-bounce">
          <FiAlertTriangle />
          <span className="text-sm font-bold">{error}</span>
        </div>
      )}
    </div>
  );
};
