import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { MdError } from "react-icons/md";
import { motion } from "motion/react";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function AlertError({ errorMessage }: { errorMessage: string }) {
  return (
      <motion.div
        initial={{
          x: -200, opacity: 0
        }}
        animate={{
          x: 0, opacity: 1
        }}
        exit={{
          x: -200, opacity: 0
        }}
        transition={{ duration: 0.3 }}
        className="p-4 w-full md:flex md:justify-center absolute z-201">
        <Alert className="text-accent-color bg-black w-full md:w-[50%] border-primary rounded-none">
          <MdError />
          <AlertTitle className="font-bold">{errorMessage}</AlertTitle>
        </Alert>
      </motion.div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertError }
