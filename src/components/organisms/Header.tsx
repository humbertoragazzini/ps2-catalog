import { StatCard } from "../molecules/StatCard";
import { FiDatabase, FiCheckCircle, FiAlertCircle, FiMinusCircle } from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";
import { useGameStore } from "../../store/useGameStore";
import { motion } from "framer-motion";

export const Header = () => {
  const { totalGames, acquiredCount, missingCount, notInterestedCount } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 bg-primary/10 rounded-2xl border border-primary/20 text-primary shadow-[0_0_20px_rgba(0,229,255,0.1)]"
          >
            <FaGamepad className="w-8 h-8" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center">
              PS2 <span className="text-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)] ml-2">Vault</span>
              <span className="ml-2 text-slate-500 font-light lowercase not-italic tracking-normal text-2xl hidden sm:inline">Tracker</span>
            </h1>
            <p className="text-slate-400 font-medium">
              Track your legendary PlayStation 2 collection
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Catalog"
          value={totalGames}
          icon={<FiDatabase />}
          colorClass="text-blue-400"
        />
        <StatCard
          label="Acquired"
          value={acquiredCount}
          icon={<FiCheckCircle />}
          colorClass="text-primary"
        />
        <StatCard
          label="Missing"
          value={missingCount}
          icon={<FiAlertCircle />}
          colorClass="text-amber-500"
        />
        <StatCard
          label="Not Interested"
          value={notInterestedCount}
          icon={<FiMinusCircle />}
          colorClass="text-red-500/70"
        />
      </div>
    </div>
  );
};
