import React from "react";
import { useToast } from "../../hooks/use-toast";            // ← update if needed
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "./toast";                                           // ← update if needed

export function Toaster() {
  const { toasts } = useToast();   // { id, title, description, action, ...props }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}

      {/* Radix viewport (portal) */}
      <ToastViewport />
    </ToastProvider>
  );
}
