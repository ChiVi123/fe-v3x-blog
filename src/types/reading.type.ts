import type { PostRow } from "~/types/entities.type";

export type ReadMap = Record<string, number>; // id → progress (0–1)

export type LastReadItem = PostRow & { pct: number };

export interface ReadingState {
  savedSet: Map<string, PostRow>;
  readMap: ReadMap;
  lastRead: LastReadItem | null;
  fsLvl: number; // 0 | 1 | 2
}

export type ReadingAction =
  | { type: "HYDRATE"; state: ReadingState }
  | { type: "TOGGLE_SAVE"; post: PostRow }
  | { type: "SET_PROGRESS"; post: PostRow; pct: number }
  | { type: "SET_LAST_READ"; post: PostRow; pct: number }
  | { type: "CLEAR_LAST_READ" }
  | { type: "SET_FS"; lvl: number };
