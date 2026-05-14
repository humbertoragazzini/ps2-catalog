import { useGameStore } from "./store/useGameStore";

function App() {
  const { totalGames, acquiredCount, missingCount, notInterestedCount } = useGameStore();

  return (
    <div className="min-h-screen bg-bg-darker flex flex-col items-center justify-center p-8">
      <div className="glass-card p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-primary text-center tracking-tight">
          PS2 Catalog <span className="text-slate-400 font-light">Tracker</span>
        </h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Games</p>
            <p className="text-2xl font-bold text-white">{totalGames}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <p className="text-xs text-cyan-500 uppercase font-semibold text-primary">Acquired</p>
            <p className="text-2xl font-bold text-white">{acquiredCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <p className="text-xs text-amber-500 uppercase font-semibold">Missing</p>
            <p className="text-2xl font-bold text-white">{missingCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <p className="text-xs text-slate-500 uppercase font-semibold">Not Interested</p>
            <p className="text-2xl font-bold text-white">{notInterestedCount}</p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-slate-500 text-sm italic">
            Core data and store initialized successfully. Ready to build the UI!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
