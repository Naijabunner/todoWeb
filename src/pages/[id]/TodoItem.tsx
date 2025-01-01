import React, { useEffect } from 'react'
import DispalyCard from '../../../components/ui/DisplayCard'
import { useParams } from 'react-router'
import useFetchById from '../../../hooks/useFetchById'
import PriorityText from '../../../components/ui/PriorityText'
import StatusText from '../../../components/ui/StatusText'
import { ClipboardPen, ClipboardX } from 'lucide-react'
import ItemDetails from './_components/ItemDetails'
import ErrorFallback from './_components/ErrorFallback'
import useFetchAll from '../../../hooks/useFetchAll'
import TaskFallback from '../../../components/TaskFallback'
import { useAppContext } from '../../../appContext'

const TodoItem = () => {
const Contenxt = useAppContext()
const {id} = useParams()
const {data, refetch}= useFetchById(id as string)
const {data: AllTask, refetch: refetchAll}= useFetchAll()

useEffect(() => {
    refetch()
    refetchAll()
}, [Contenxt?.fetchDep])

const RelatedData= AllTask.filter((task)=>task.id !== id)
    return (
        <section className='shadow shadow-shadow bg-white w-full p-10 rounded-md  '>
            <Header  title={data?.title ?? 'Task'}/>
            <div className="grid md:grid-cols-[45%,51%]  gap-5 min-h-[650px] ">
                <div className=" max-md:hidden max-h-[750px] space-y-3   overflow-y-scroll rounded p-5">
                   {data &&  <DispalyCard {...data} selected/> }
                   <div className=" max-h-full space-y-3   overflow-y-scroll rounded p-5">
                   <p className=' my-3 text-primary'>
                    Related
                </p>
                <div className="grid gap-3">
                {
                    RelatedData && RelatedData.length ? RelatedData.map((task, index) => {
                        if(index >3) return;
                        return <DispalyCard key={task.id} {...task} />
                    })
                        : <TaskFallback />
                }
                </div>
                   </div>
                </div>
                {
                    data? <ItemDetails data={data}/>
                    :<ErrorFallback/>
                }
               
            </div>


        </section>
    )
}


const Header = ({ title }:{ title:string}) => {
    return (
        <>
          <header className=' flex justify-between mb-5'>
            <div className=" text-primary font-medium text-xl flex gap-3 ">
            <ClipboardPen className=''/>
            <p>{title}</p>
            </div>
        </header>  
        </>
    )
}






export default TodoItem