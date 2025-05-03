"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ChartContainer({
  className,
  children,
  ...props
}: ChartProps) {
  return (
    <div
      className={cn(
        "h-[350px] w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    [key: string]: unknown
  }>
  label?: string
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {payload[0]?.value}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ChartTooltipContent() {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            Value
          </span>
          <span className="font-bold text-muted-foreground">
            Loading...
          </span>
        </div>
      </div>
    </div>
  )
}
