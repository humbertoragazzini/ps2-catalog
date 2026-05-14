import { create } from "zustand";
import { Game, GameStatus, GameTrackingState } from "../types/game";
import gamesData from "../data/ps2-games.json";
import { loadStatuses, saveStatuses, clearStatuses } from "../utils/storage";
import { validateImportData, prepareExportData } from "../utils/exportImport";

interface GameStore {
  games: Game[];
  statuses: GameTrackingState;
  
  // Actions
  setStatus: (gameId: string, status: GameStatus) => void;
  resetStatuses: () => void;
  importData: (jsonData: string) => { success: boolean; error?: string };
  exportData: () => string;
  
  // Computed
  totalGames: number;
  acquiredCount: number;
  missingCount: number;
  notInterestedCount: number;
}

export const useGameStore = create<GameStore>((set, get) => {
  const initialStatuses = loadStatuses();
  const games = gamesData as Game[];

  // Helper to calculate counts
  const calculateCounts = (statuses: GameTrackingState) => {
    let acquired = 0;
    let missing = 0;
    let notInterested = 0;

    games.forEach((game) => {
      const status = statuses[game.id] || "missing";
      if (status === "acquired") acquired++;
      else if (status === "not_interested") notInterested++;
      else missing++;
    });

    return {
      acquiredCount: acquired,
      missingCount: missing,
      notInterestedCount: notInterested,
    };
  };

  const initialCounts = calculateCounts(initialStatuses);

  return {
    games,
    statuses: initialStatuses,
    
    totalGames: games.length,
    ...initialCounts,

    setStatus: (gameId, status) => {
      set((state) => {
        const newStatuses = { ...state.statuses, [gameId]: status };
        saveStatuses(newStatuses);
        return {
          statuses: newStatuses,
          ...calculateCounts(newStatuses),
        };
      });
    },

    resetStatuses: () => {
      clearStatuses();
      const emptyStatuses = {};
      set({
        statuses: emptyStatuses,
        ...calculateCounts(emptyStatuses),
      });
    },

    importData: (jsonData) => {
      try {
        const data = JSON.parse(jsonData);
        const result = validateImportData(data, games.map(g => g.id));
        
        if (result.success) {
          saveStatuses(result.statuses);
          set({
            statuses: result.statuses,
            ...calculateCounts(result.statuses),
          });
          return { success: true };
        } else {
          return { success: false, error: result.error };
        }
      } catch (e) {
        return { success: false, error: "Invalid JSON format" };
      }
    },

    exportData: () => {
      return prepareExportData(get().statuses);
    },
  };
});
