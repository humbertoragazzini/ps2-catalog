import { GameTrackingState } from "../types/game";

const STORAGE_KEY = "ps2-game-tracker-status-v1";

export const saveStatuses = (statuses: GameTrackingState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    console.error("Failed to save statuses to localStorage", error);
  }
};

export const loadStatuses = (): GameTrackingState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to load statuses from localStorage", error);
    return {};
  }
};

export const clearStatuses = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
