"use client";

import { createContext, useEffect, useMemo, useReducer } from "react";
import type { ReadingAction, ReadingState, ReadMap } from "~/types";

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

function loadState(): ReadingState {
  return {
    savedSet: new Set(LS.get<string[]>("tap-saved", [])),
    readMap: LS.get<ReadMap>("tap-read", {}),
    lastRead: LS.get<ReadingState["lastRead"]>("tap-lastread", null),
    fsLvl: LS.get<number>("tap-fs", 1),
  };
}

/* State mặc định giống nhau trên server và client */
function createInitialState(): ReadingState {
  return {
    savedSet: new Set<string>(),
    readMap: {},
    lastRead: null,
    fsLvl: 1,
  };
}

function reducer(state: ReadingState, action: ReadingAction): ReadingState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
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
export interface ReadingStoreContextValue {
  state: ReadingState;
  dispatch: React.Dispatch<ReadingAction>;
}

export const ReadingStoreContext =
  createContext<ReadingStoreContextValue | null>(null);

export function ReadingStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  useEffect(() => {
    dispatch({ type: "HYDRATE", state: loadState() });
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ReadingStoreContext.Provider value={value}>
      {children}
    </ReadingStoreContext.Provider>
  );
}
