"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxUi( { label, my = 0 }  : { label : string, my? : number } ) {

  return (
    <div className={`items-top flex space-x-2 my-[${my}px]`}>
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {label}
        </label>
      </div>
    </div>
  )
}
