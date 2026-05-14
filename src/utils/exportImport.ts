import { GameStatus, GameTrackingState, ExportData } from "../types/game";

const VALID_STATUSES: GameStatus[] = ["acquired", "missing", "not_interested"];

export const validateImportData = (data: any, validGameIds: string[]): { success: boolean; statuses: GameTrackingState; error?: string } => {
  try {
    if (!data || typeof data !== "object") {
      return { success: false, statuses: {}, error: "Invalid file format" };
    }

    if (data.version !== 1) {
      return { success: false, statuses: {}, error: "Unsupported version" };
    }

    const importedStatuses = data.statuses;
    if (!importedStatuses || typeof importedStatuses !== "object") {
      return { success: false, statuses: {}, error: "No status data found" };
    }

    const validatedStatuses: GameTrackingState = {};
    const gameIdSet = new Set(validGameIds);

    for (const [id, status] of Object.entries(importedStatuses)) {
      if (gameIdSet.has(id) && VALID_STATUSES.includes(status as GameStatus)) {
        validatedStatuses[id] = status as GameStatus;
      }
    }

    return { success: true, statuses: validatedStatuses };
  } catch (error) {
    return { success: false, statuses: {}, error: "Failed to parse import data" };
  }
};

export const prepareExportData = (statuses: GameTrackingState): string => {
  const exportData: ExportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    statuses,
  };
  return JSON.stringify(exportData, null, 2);
};
