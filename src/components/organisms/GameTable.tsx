import type { Game, GameStatus } from "../../types/game";
import { StatusSelect } from "../molecules/StatusSelect";
import { StatusPill } from "../atoms/StatusPill";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";

interface GameTableProps {
  games: Game[];
}

export const GameTable = ({ games }: GameTableProps) => {
  const { statuses, setStatus } = useGameStore();

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/5 bg-bg-card/40 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Year</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Company</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Genre</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {games.map((game) => (
                <motion.tr
                  key={game.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                  className="transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                      {game.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{game.year}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{game.company}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500 px-2 py-1 bg-slate-800/50 rounded-md">
                      {game.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelect
                      status={statuses[game.id] || "missing"}
                      onChange={(newStatus) => setStatus(game.id, newStatus)}
                    />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {games.map((game) => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{game.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{game.company} • {game.year}</p>
                </div>
                <StatusPill status={statuses[game.id] || "missing"} />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-800/50 rounded-md">
                  {game.genre}
                </span>
                <StatusSelect
                  status={statuses[game.id] || "missing"}
                  onChange={(newStatus) => setStatus(game.id, newStatus)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {games.length === 0 && (
        <div className="text-center py-20 glass-card">
          <p className="text-slate-500 font-medium">No games found. Try changing your filters.</p>
        </div>
      )}
    </div>
  );
};
