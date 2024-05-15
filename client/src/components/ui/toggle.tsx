import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "yesinline-flex yesitems-center yesjustify-center yesrounded-md yestext-sm yesfont-medium yesring-offset-white yestransition-colors hover:yesbg-slate-100 hover:yestext-slate-500 focus-visible:yesoutline-none focus-visible:yesring-2 focus-visible:yesring-slate-950 focus-visible:yesring-offset-2 disabled:yespointer-events-none disabled:yesopacity-50 data-[state=on]:yesbg-slate-100 data-[state=on]:yestext-slate-900 dark:yesring-offset-slate-950 dark:hover:yesbg-slate-800 dark:hover:yestext-slate-400 dark:focus-visible:yesring-slate-300 dark:data-[state=on]:yesbg-slate-800 dark:data-[state=on]:yestext-slate-50",
  {
    variants: {
      variant: {
        default: "yesbg-transparent",
        outline:
          "yesborder yesborder-slate-200 yesbg-transparent hover:yesbg-slate-100 hover:yestext-slate-900 dark:yesborder-slate-800 dark:hover:yesbg-slate-800 dark:hover:yestext-slate-50",
      },
      size: {
        default: "yesh-10 yespx-3",
        sm: "yesh-9 yespx-2.5",
        lg: "yesh-11 yespx-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
