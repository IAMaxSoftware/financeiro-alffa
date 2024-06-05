"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "../../../lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface PropsDatasIntervalo {
  setDataRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  dataRange: DateRange | undefined
  className: String
}

export function DatasIntervalo({
  className, setDataRange, dataRange
}: PropsDatasIntervalo) {


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dataRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dataRange?.from ? (
              dataRange.to ? (
                <>
                  {format(dataRange.from, "LLL dd, y")} -{" "}
                  {format(dataRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dataRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dataRange?.from}
            selected={dataRange}
            onSelect={setDataRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}