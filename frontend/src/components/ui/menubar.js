import React, { forwardRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../lib/utils";   // ⬅️ adjust path if needed

/* ------------------------------------------------------------------ */
/* Aliases from Radix                                                 */
/* ------------------------------------------------------------------ */
const MenubarMenu       = MenubarPrimitive.Menu;
const MenubarGroup      = MenubarPrimitive.Group;
const MenubarPortal     = MenubarPrimitive.Portal;
const MenubarSub        = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

/* ------------------------------------------------------------------ */
/* Root                                                               */
/* ------------------------------------------------------------------ */
const Menubar = forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
));
Menubar.displayName = "Menubar";

/* ------------------------------------------------------------------ */
/* Trigger                                                            */
/* ------------------------------------------------------------------ */
const MenubarTrigger = forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none " +
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

/* ------------------------------------------------------------------ */
/* Sub‑trigger                                                        */
/* ------------------------------------------------------------------ */
const MenubarSubTrigger = forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none " +
          "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";

/* ------------------------------------------------------------------ */
/* Sub‑content                                                        */
/* ------------------------------------------------------------------ */
const MenubarSubContent = forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md " +
        "animate-in slide-in-from-left-1",
      className
    )}
    {...props}
  />
));
MenubarSubContent.displayName = "MenubarSubContent";

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */
const MenubarContent = forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md " +
          "animate-in slide-in-from-top-1",
        className
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = "MenubarContent";

/* ------------------------------------------------------------------ */
/* Items                                                              */
/* ------------------------------------------------------------------ */
const MenubarItem = forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none " +
        "transition-colors focus:bg-accent focus:text-accent-foreground " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
MenubarItem.displayName = "MenubarItem";

/* Checkbox item */
const MenubarCheckboxItem = forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none " +
          "transition-colors focus:bg-accent focus:text-accent-foreground " +
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="h-4 w-4" />
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

/* Radio item */
const MenubarRadioItem = forwardRef(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none " +
        "transition-colors focus:bg-accent focus:text-accent-foreground " +
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Circle className="h-2 w-2 fill-current" />
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = "MenubarRadioItem";

/* Label */
const MenubarLabel = forwardRef(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

/* Separator */
const MenubarSeparator = forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = "MenubarSeparator";

/* Shortcut text */
const MenubarShortcut = ({ className, ...props }) => (
  <span
    className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
    {...props}
  />
);
MenubarShortcut.displayName = "MenubarShortcut";

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */
export {
  Menubar,
  MenubarMenu,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarRadioGroup,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
};
