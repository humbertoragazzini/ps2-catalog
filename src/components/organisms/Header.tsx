import { StatCard } from "../molecules/StatCard";
import { FiDatabase, FiCheckCircle, FiAlertCircle, FiMinusCircle } from "react-icons/fi";
import { useGameStore } from "../../store/useGameStore";

export const Header = () => {
  const { totalGames, acquiredCount, missingCount, notInterestedCount } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            PS2 <span className="text-primary drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">Vault</span> Tracker
          </h1>
          <p className="text-slate-400 font-medium">
            Track your legendary PlayStation 2 collection
          </p>
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
