import { useCallback, useContext } from "react";
import { ReadingStoreContext } from "~/components/shared/reading-provider";
import type { PostRow, ReadingState } from "~/types";

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
    (post: PostRow) => dispatch({ type: "TOGGLE_SAVE", post }),
    [dispatch],
  );
  const setProgress = useCallback(
    (post: PostRow, pct: number) =>
      dispatch({ type: "SET_PROGRESS", post, pct }),
    [dispatch],
  );
  const setLastRead = useCallback(
    (post: PostRow, pct: number) =>
      dispatch({ type: "SET_LAST_READ", post, pct }),
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
