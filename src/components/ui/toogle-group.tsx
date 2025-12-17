import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

/* -----------------------------
   ToggleGroup (Root)
------------------------------ */

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    type="single" // ✅ REQUIRED
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = "ToggleGroup";

/* -----------------------------
   ToggleGroupItem
------------------------------ */

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, value, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    value={value} // ✅ REQUIRED
    className={cn(
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
      "bg-muted hover:bg-muted/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
));

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
