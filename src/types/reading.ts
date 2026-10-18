export type ReadMap = Record<string, number>; // no → progress (0–1)

export interface LastReadItem {
  no: string;
  pct: number;
}

export interface ReadingState {
  savedSet: Set<string>;
  readMap: ReadMap;
  lastRead: LastReadItem | null;
  fsLvl: number; // 0 | 1 | 2
}

export type ReadingAction =
  | { type: "HYDRATE"; state: ReadingState }
  | { type: "TOGGLE_SAVE"; no: string }
  | { type: "SET_PROGRESS"; no: string; pct: number }
  | { type: "SET_LAST_READ"; no: string; pct: number }
  | { type: "CLEAR_LAST_READ" }
  | { type: "SET_FS"; lvl: number };
