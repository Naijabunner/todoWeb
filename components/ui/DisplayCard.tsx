import React from "react";
import { task } from "../../src/pages/AllTask/AllTaskPage";
import { Link, useRoutes } from "react-router";
import StatusText from "./StatusText";
import PriorityText from "./PriorityText";
import StatusRing from "./StatusRing";

const DispalyCard = ({
    title,
    subject,
    submissionDate,
    description,
    createdOn,
    status,
    priority,
    id,
    selected,
}: task & { selected?: boolean }) => {

    return (
        <Link to={`/todo/${id}`} className={`cursor-pointer hover:bg-slate-50 transition-all ease-in-out grid grid-cols-[10%,89%]  w-full border border-shadow ${selected?'bg-slate-100':'bg-white'} rounded-md p-3 py-4`}>
            <StatusRing status={status} />
            <div className="">
                <h2 className=' line-clamp-3 font-semibold text-base'>
                    {title}
                </h2>
                <p className=' line-clamp-3 font-normal text-sm text-[#747474] '>
                    {subject}
                </p>
                <div className="bottom mt-3 flex justify-between items-center text-[10px] font-medium">
                    <PriorityText priority={priority} />
                    <StatusText status={status} />
                    <p className='text-[#A1A3AB]'> Created on: { createdOn.toLocaleString().split(',')[0]}</p>
                </div>
            </div>
        </Link>
    )
}

export default DispalyCard;