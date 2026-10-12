"use client";

/**
 * reading-store.tsx
 * Zustand-style global state dùng React context + useReducer
 * Lưu trữ: danh sách đã lưu, tiến độ đọc, bài đang đọc dở
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

/* ─── Types ─── */
type ReadMap = Record<string, number>; // no → progress (0–1)

interface State {
  savedSet: Set<string>;
  readMap: ReadMap;
  lastRead: { no: string; pct: number } | null;
  fsLvl: number; // 0 | 1 | 2
}

type Action =
  | { type: "TOGGLE_SAVE"; no: string }
  | { type: "SET_PROGRESS"; no: string; pct: number }
  | { type: "SET_LAST_READ"; no: string; pct: number }
  | { type: "CLEAR_LAST_READ" }
  | { type: "SET_FS"; lvl: number };

/* ─── LocalStorage helpers ─── */
const LS = {
  get<T>(k: string, d: T): T {
    if (typeof window === "undefined") return d;
    try {
      const v = JSON.parse(localStorage.getItem(k) ?? "null");
      return v ?? d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};

function loadState(): State {
  return {
    savedSet: new Set(LS.get<string[]>("tap-saved", [])),
    readMap: LS.get<ReadMap>("tap-read", {}),
    lastRead: LS.get<State["lastRead"]>("tap-lastread", null),
    fsLvl: LS.get<number>("tap-fs", 1),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_SAVE": {
      const next = new Set(state.savedSet);
      if (next.has(action.no)) next.delete(action.no);
      else next.add(action.no);
      LS.set("tap-saved", [...next]);
      return { ...state, savedSet: next };
    }
    case "SET_PROGRESS": {
      const readMap = { ...state.readMap, [action.no]: action.pct };
      LS.set("tap-read", readMap);
      return { ...state, readMap };
    }
    case "SET_LAST_READ": {
      const lastRead = { no: action.no, pct: action.pct };
      LS.set("tap-lastread", lastRead);
      return { ...state, lastRead };
    }
    case "CLEAR_LAST_READ":
      LS.del("tap-lastread");
      return { ...state, lastRead: null };
    case "SET_FS":
      LS.set("tap-fs", action.lvl);
      return { ...state, fsLvl: action.lvl };
    default:
      return state;
  }
}

/* ─── Context ─── */
interface StoreContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function ReadingStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

/* ─── Hook ─── */
export function useReadingStore<T>(selector: (s: State) => T): T {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useReadingStore must be inside ReadingStoreProvider");
  return selector(ctx.state);
}

export function useReadingActions() {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useReadingActions must be inside ReadingStoreProvider");
  const { dispatch } = ctx;

  const toggleSave = useCallback(
    (no: string) => dispatch({ type: "TOGGLE_SAVE", no }),
    [dispatch],
  );
  const setProgress = useCallback(
    (no: string, pct: number) => dispatch({ type: "SET_PROGRESS", no, pct }),
    [dispatch],
  );
  const setLastRead = useCallback(
    (no: string, pct: number) => dispatch({ type: "SET_LAST_READ", no, pct }),
    [dispatch],
  );
  const clearLastRead = useCallback(
    () => dispatch({ type: "CLEAR_LAST_READ" }),
    [dispatch],
  );
  const setFs = useCallback(
    (lvl: number) => dispatch({ type: "SET_FS", lvl }),
    [dispatch],
  );

  return { toggleSave, setProgress, setLastRead, clearLastRead, setFs };
}
