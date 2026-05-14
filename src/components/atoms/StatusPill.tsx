import { GameStatus } from "../../types/game";

interface StatusPillProps {
  status: GameStatus;
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const configs = {
    acquired: {
      label: "Acquired",
      styles: "bg-cyan-500/10 text-primary border-primary/30",
    },
    missing: {
      label: "Missing",
      styles: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    },
    not_interested: {
      label: "Not Interested",
      styles: "bg-red-500/10 text-red-400 border-red-500/20 opacity-60",
    },
  };

  const { label, styles } = configs[status] || configs.missing;

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${styles}`}>
      {label}
    </div>
  );
};
