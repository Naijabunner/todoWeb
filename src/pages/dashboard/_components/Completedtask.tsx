import React, { useEffect } from 'react'
import { Link } from 'react-router'
import DispalyCard from '../../../../components/ui/DisplayCard'
import useFetchAll from '../../../../hooks/useFetchAll'
import { ClipboardCheck } from 'lucide-react'
import TaskFallback from '../../../../components/TaskFallback'
import { useAppContext } from '../../../../appContext'

const Completedtask = () => {
    const {data,refetch} =useFetchAll()
  const Contenxt = useAppContext()


    const filteredData = data.filter((task) => task.status === 'Completed')
    
    useEffect(() => {
        refetch()
    }, [Contenxt?.fetchDep])

  return (
    <div className=' '>
        <Header/>
        <div className="todayTask my-2 pr-2 space-y-5 max-h-[290px] overflow-y-scroll scroll">
        {
                filteredData.length?filteredData.reverse().map((task,index)=>{
                    if(index >3 )return;
                    return <DispalyCard key={task.id} {...task}/>
                }): <TaskFallback />
            }
        </div>
    </div>
  )
}

const Header =()=>{
    return(
        <>
        <header className=' flex justify-between'>
            <div className=" text-primary mb-2 text-lg font-medium flex gap-3 ">
            <ClipboardCheck />
            <p>Completed Task</p>
            </div>
        </header>  
        <div className="date text-xs my-1">
            20 June <span className=' text-[#A1A3AB]'>.Today</span>
        </div>
        </>
    )
}

export default Completedtask