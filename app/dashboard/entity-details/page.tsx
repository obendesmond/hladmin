"use client"

import ESRDialog from "./components/esr-dialog"
import CDRDialog from "./components/cdr-dialog"

export default function EntityDetails() {
 
  return (
    <div className="flex items-center gap-4 flex-wrap w-full h-full">
     <ESRDialog />
     <CDRDialog />
    </div>
  );
}
