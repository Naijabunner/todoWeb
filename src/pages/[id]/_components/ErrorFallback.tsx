import { ClipboardX } from "lucide-react"
import React from "react"

const ErrorFallback=()=>{
    return(
        <div className=" border max-h-[750px]space-y-5 border-shadow overflow-y-scroll  rounded p-5">
        <div className=" flex flex-col items-center justify-center opacity-75 py-20 text-2xl gap-5">
            <ClipboardX size={100} absoluteStrokeWidth className='' />
            We can't seem to find any TASK :(
        </div>
    </div>
    )
}

export default ErrorFallback