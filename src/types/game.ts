export type Game = {
  id: string;
  title: string;
  year: number;
  company: string;
  genre: string;
};

export type GameStatus = "acquired" | "missing" | "not_interested";

export type GameTrackingState = Record<string, GameStatus>;

export type ExportData = {
  version: number;
  exportedAt: string;
  statuses: GameTrackingState;
};
