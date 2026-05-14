import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, className = "", ...props }: SelectProps) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{label}</label>}
      <select
        className={`w-full bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-darker">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
