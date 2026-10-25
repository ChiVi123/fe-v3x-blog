export interface ToastAction {
  label: string;
  fn: () => void;
}

export interface ToastItem {
  id: number;
  msg: string;
  action?: ToastAction;
}

export type ToastFn = (msg: string, action?: ToastAction) => void;
