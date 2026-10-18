import { useCallback, useContext } from "react";
import { ReadingStoreContext } from "~/components/shared/reading-provider";
import type { ReadingState } from "~/types";

export function useReadingStore<T>(selector: (s: ReadingState) => T): T {
  const ctx = useContext(ReadingStoreContext);
  if (!ctx) {
    throw new Error("useReadingStore must be used inside ReadingStoreProvider");
  }
  return selector(ctx.state);
}

export function useReadingActions() {
  const ctx = useContext(ReadingStoreContext);
  if (!ctx) {
    throw new Error(
      "useReadingActions must be used inside ReadingStoreProvider",
    );
  }
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
