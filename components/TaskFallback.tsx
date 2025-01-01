import { ClipboardX } from 'lucide-react'
import React from 'react'

const TaskFallback = () => {
    return (
        <div className=" flex flex-col items-center justify-center opacity-75 py-20 text-2xl gap-5">
            <ClipboardX size={100} absoluteStrokeWidth className='' />
            NO TASK :(
        </div>
    )
}

export default TaskFallback