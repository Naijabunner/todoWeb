import React, { useState } from 'react'
import { Link } from 'react-router'
import ModalBackground from '../components/ui/ModalBackground'
import FormModal from '../components/ui/FormModal'
import { Home, List, Plus, Trash2 } from 'lucide-react';

const SideBar = () => {
  const [openModal, setOpenModal] = useState(false)


  const dashboardItems = [
    { icon: <Home  absoluteStrokeWidth className=' text-primary ' />, path: '/', label: 'Home' },
    { icon: <List absoluteStrokeWidth className=' text-primary' />, path: '/todo', label: 'All Tasks' },
  ];

  return (
    <aside className='shadow-shadow shadow bg-white rounded-lg min-w-[286px] p-5 lg:p-10 flex lg:flex-col gap-5'>
      <CreateBtn fn={() => setOpenModal(true)} />
        <div className=' mt-5'/>
      {
        dashboardItems.map(items => {
          return (
            <Link to={items.path} className='bg-opacity-25 flex px-4 justify-between bg-[#4880FF] rounded-md min-h-[35px] text-primary font-semibold items-center'>
              {items.icon}
              <p className='max-sm:hidden'>
                {items.label}
              </p>
            </Link>
          )
        })
      }
      <FormModal openModal={openModal} closeModal={()=>setOpenModal(false)} />
    </aside>
  )
}

interface CreateBtnProps {
  fn: () => void;
}

const CreateBtn: React.FC<CreateBtnProps> = ({ fn }) => {
  return (
    <button onClick={fn} className='lg:w-full rounded-md bg-primary text-center text-sm flex justify-between items-center px-5 font-bold text-white min-h-[43px]'>
      <Plus/>
      <p className='max-sm:hidden'>
         Create New Task
      </p>
      
    </button>
  )
}

export default SideBar