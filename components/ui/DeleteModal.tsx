import React, { useState } from 'react'
import ModalBackground from './ModalBackground';
import Task from '../../models/task';
import { useAppContext } from '../../appContext';
import { useNavigate } from "react-router";

interface FormModalProps {
    openModal: boolean;
    closeModal: () => void;
    name: string;
    id: string
}


const DeleteModal: React.FC<FormModalProps> = ({ openModal, closeModal, name, id }) => {
    const [isLoading, setIsLoading] = useState(false)
    const Contenxt = useAppContext()
    let navigate = useNavigate();

    const handleDelete = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        Task.deleteById(id);
        setIsLoading(false)
        closeModal()
        Contenxt?.handleUpdate()
        // resetForm()
        
        navigate('/')
      };
    

    return (
        <ModalBackground isOpen={openModal} onClose={closeModal}>
            <div className='shadow-xl rounded-lg scale-95 px-10 pb-10 p-5 w-full bg-slate-50  max-w-[700px] mx-5 sm:mx-10 md:mx-auto' onClick={(e) => e.stopPropagation()} >
                <h2 className='pb-5 sm:text-2xl'>Delete Task
                    <p className=' h-[3px] mt-1  rounded-l-xl w-[20%] bg-red-500'></p>
                </h2>
                <div className="body h-fit flex flex-col gap-3">
                    <h1 className="text-black-300 text-lg font-semibold">{`Are you sure you want to delete ${name}?`}</h1>
                    <div className="flex justify-end gap-x-5 min-h-fit py-5 ">

                        <button
                            onClick={closeModal}
                            className=" justify-center p-1 px-2 rounded text-sm  text-black-300 border-[1px] shadow border-solid border-black-300 hover:translate-y-[-4px] transition-all ease-in-out hover:scale-[1.02]"
                        >
                            Cancel
                        </button>

                        <button
                         onClick={() => handleDelete()}
                            className=" justify-center p-1 px-2 rounded text-sm bg-red-500  w-[145px] text-white  shadow  hover:translate-y-[-4px] transition-all ease-in-out hover:scale-[1.02] "
                        >
                            {
                            isLoading?' fake Delay ...':
                            'Proceed'}

                        </button>

                    </div>
                </div>

            </div>
        </ModalBackground>
    )
}

export default DeleteModal