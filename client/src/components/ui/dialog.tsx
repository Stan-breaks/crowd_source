import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "yesfixed yesinset-0 yesz-50 yesbg-black/80 yes data-[state=open]:yesanimate-in data-[state=closed]:yesanimate-out data-[state=closed]:yesfade-out-0 data-[state=open]:yesfade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "yesfixed yesleft-[50%] yestop-[50%] yesz-50 yesgrid yesw-full yesmax-w-lg yestranslate-x-[-50%] yestranslate-y-[-50%] yesgap-4 yesborder yesborder-slate-200 yesbg-white yesp-6 yesshadow-lg yesduration-200 data-[state=open]:yesanimate-in data-[state=closed]:yesanimate-out data-[state=closed]:yesfade-out-0 data-[state=open]:yesfade-in-0 data-[state=closed]:yeszoom-out-95 data-[state=open]:yeszoom-in-95 data-[state=closed]:yesslide-out-to-left-1/2 data-[state=closed]:yesslide-out-to-top-[48%] data-[state=open]:yesslide-in-from-left-1/2 data-[state=open]:yesslide-in-from-top-[48%] sm:yesrounded-lg dark:yesborder-slate-800 dark:yesbg-slate-950",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="yesabsolute yesright-4 yestop-4 yesrounded-sm yesopacity-70 yesring-offset-white yestransition-opacity hover:yesopacity-100 focus:yesoutline-none focus:yesring-2 focus:yesring-slate-950 focus:yesring-offset-2 disabled:yespointer-events-none data-[state=open]:yesbg-slate-100 data-[state=open]:yestext-slate-500 dark:yesring-offset-slate-950 dark:focus:yesring-slate-300 dark:data-[state=open]:yesbg-slate-800 dark:data-[state=open]:yestext-slate-400">
        <X className="yesh-4 yesw-4" />
        <span className="yessr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "yesflex yesflex-col yesspace-y-1.5 yestext-center sm:yestext-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "yesflex yesflex-col-reverse sm:yesflex-row sm:yesjustify-end sm:yesspace-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "yestext-lg yesfont-semibold yesleading-none yestracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("yestext-sm yestext-slate-500 dark:yestext-slate-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
