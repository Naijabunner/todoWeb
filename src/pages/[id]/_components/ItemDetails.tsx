import React, { useState } from "react";
import PriorityText from "../../../../components/ui/PriorityText";
import StatusText from "../../../../components/ui/StatusText";
import { task } from "../../AllTask/AllTaskPage";
import { PinOff, Stamp } from "lucide-react";
import DeleteModal from "../../../../components/ui/DeleteModal";
import FormModal from "../../../../components/ui/FormModal";

const ItemDetails = ({ data }:{data:task| null}) => {
    const [openDeleteModal, setopenDeleteModal] = useState(false)
    const [open, setopen] = useState(false)
    

    if(!data) return;
     const allData ={
    title:data?.title,
    subject:data?.subject,
    submissionDate:data?.submissionDate,
    description:data?.description,
    priority:data?.priority,
    status:data?.status,
    createdOn:data?.createdOn,
 }
    return (
        <div className="border max-h-[750px] space-y-5 border-shadow overflow-y-scroll rounded p-5">
            <DeleteModal openModal={openDeleteModal} closeModal={()=>setopenDeleteModal(false)} name={data.title} id={data.id ?? ""} />
            <FormModal openModal={open} closeModal={()=>setopen(false)} data={allData} type="Edit" id={data.id ?? ""}/>
            <div className=" flex gap-10 ">
                <button onClick={()=>setopen(true)} className=" py-1 rounded-md flex-1 text-center  border border-primary shadow text-lg "> Edit</button>
                <button onClick={()=>setopenDeleteModal(true)} className="py-1 rounded-md  flex-1 text-center text-lg bg-primary text-white"> Delete</button>
            </div>
            <div className="head space-y-3">
                <h2 className="text-black text-lg font-semibold">{data?.title}</h2>
                <PriorityText priority={data?.priority} />
                <StatusText status={data?.status} />
                <p className="text-[#A1A3AB]">Created on: {data?.createdOn.toLocaleDateString()}</p>
            </div>
            <div className="Body space-y-3 mt-3">
                <p className="text-alternateText">
                    <strong className="font-bold">Task Title:{" "}</strong>
                    {data?.title}
                </p>
                <p className="text-alternateText">
                    <strong className="font-bold">Objective:{" "}</strong>
                    {data?.subject}
                </p>
                <p className="text-alternateText">
                    <strong className="font-bold">Task Description:{" "}</strong>
                    {data?.description}
                </p>
                <p className="text-alternateText">
                    <strong className="font-bold">Deadline for Submission:{" "}</strong>
                    {data?.submissionDate.toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default ItemDetails;