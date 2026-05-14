import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export const Badge = ({ children, variant = "neutral", className = "" }: BadgeProps) => {
  const variants = {
    neutral: "bg-slate-800 text-slate-400 border-slate-700",
    success: "bg-cyan-500/10 text-primary border-primary/30",
    warning: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    danger: "bg-red-500/10 text-red-400 border-red-500/30",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
