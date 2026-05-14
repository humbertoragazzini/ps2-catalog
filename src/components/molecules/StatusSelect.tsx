import { GameStatus } from "../../types/game";
import { FiCheck, FiCircle, FiMinusCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface StatusSelectProps {
  status: GameStatus;
  onChange: (status: GameStatus) => void;
}

export const StatusSelect = ({ status, onChange }: StatusSelectProps) => {
  const options: { value: GameStatus; icon: any; color: string; label: string }[] = [
    { value: "acquired", icon: FiCheck, color: "text-primary", label: "A" },
    { value: "missing", icon: FiCircle, color: "text-amber-500", label: "M" },
    { value: "not_interested", icon: FiMinusCircle, color: "text-red-500", label: "N" },
  ];

  return (
    <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-lg border border-white/5">
      {options.map((opt) => (
        <motion.button
          key={opt.value}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(opt.value)}
          className={`
            relative p-1.5 rounded-md transition-all flex items-center justify-center
            ${status === opt.value 
              ? 'bg-slate-700 text-white shadow-inner' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}
          `}
          title={opt.value.replace('_', ' ')}
        >
          <opt.icon className={`w-3.5 h-3.5 ${status === opt.value ? opt.color : ''}`} />
          {status === opt.value && (
            <motion.div
              layoutId="active-bg"
              className="absolute inset-0 bg-white/5 rounded-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
