import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  colorClass?: string;
}

export const StatCard = ({ label, value, icon, colorClass = "text-primary" }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card p-5 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform scale-150">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
          {label}
        </span>
        <div className="flex items-center space-x-3">
          <div className={`${colorClass} transition-colors`}>{icon}</div>
          <span className="text-2xl font-bold text-white tracking-tight">
            {value}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
