import { useCallback } from "react";
import type { ToastAction, ToastFn, ToastItem } from "~/types";

type Listener = (toasts: ToastItem[]) => void;

let toastId = 0;
let currentToasts: ToastItem[] = [];
const listeners = new Set<Listener>();

function notify() {
  for (const listener of listeners) {
    listener([...currentToasts]);
  }
}

export function subscribeToasts(listener: Listener) {
  listeners.add(listener);
  listener([...currentToasts]);
  return () => {
    listeners.delete(listener);
  };
}

export function dispatchToast(msg: string, action?: ToastAction) {
  const id = ++toastId;
  currentToasts = [...currentToasts, { id, msg, action }];
  notify();

  setTimeout(
    () => {
      currentToasts = currentToasts.filter((t) => t.id !== id);
      notify();
    },
    action ? 5200 : 3200,
  );
}

export function useToast(): ToastFn {
  return useCallback((msg: string, action?: ToastAction) => {
    dispatchToast(msg, action);
  }, []);
}
