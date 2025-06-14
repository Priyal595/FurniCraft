import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------------ */
/* Config                                                                    */
/* ------------------------------------------------------------------------ */
const TOAST_LIMIT = 1;          // max concurrent toasts
const TOAST_REMOVE_DELAY = 5000; // ms before DOM removal after close

/* ------------------------------------------------------------------------ */
/* Internal helpers                                                         */
/* ------------------------------------------------------------------------ */
let idCounter = 0;
const genId = () => (++idCounter % Number.MAX_SAFE_INTEGER).toString();

/* ------------------------------------------------------------------------ */
/* Action constants                                                         */
/* ------------------------------------------------------------------------ */
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
};

/* ------------------------------------------------------------------------ */
/* Reducer & state                                                           */
/* ------------------------------------------------------------------------ */
const toastTimeouts = new Map();
const listeners = [];
let memoryState = { toasts: [] };

function addToRemoveQueue(toastId) {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          toastId === undefined || t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts:
          action.toastId === undefined
            ? []
            : state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

/* ------------------------------------------------------------------------ */
/* Public API                                                               */
/* ------------------------------------------------------------------------ */
export function toast(options) {
  const id = genId();

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
  const update = (opts) =>
    dispatch({ type: actionTypes.UPDATE_TOAST, toast: { ...opts, id } });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...options,
      id,
      open: true,
      onOpenChange: (open) => !open && dismiss(),
    },
  });

  return { id, dismiss, update };
}

export function useToast() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}
