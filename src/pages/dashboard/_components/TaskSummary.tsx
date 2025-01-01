import React, { useEffect } from 'react'
import { Link } from 'react-router'
import DispalyCard from '../../../../components/ui/DisplayCard'
import useFetchAll from '../../../../hooks/useFetchAll'
import { ClipboardPen, ClipboardX } from 'lucide-react'
import TaskFallback from '../../../../components/TaskFallback'
import { useAppContext } from '../../../../appContext'

const todaysDate=new Date().toLocaleDateString()

const TaskSummary = () => {
    const { data, refetch } = useFetchAll()
    const Contenxt = useAppContext()

    const filteredData = data.filter((task) => task.createdOn.toLocaleDateString() === todaysDate)

    useEffect(() => {
        refetch()
    }, [Contenxt?.fetchDep])

    return (
        <div>
            <Header />
            <div className="todayTask my-2 pr-2 space-y-5 max-h-[550px] overflow-y-scroll scroll">
                {
                    filteredData && filteredData.length ? filteredData.map((task, index) => {
                        return <DispalyCard key={task.id} {...task} />
                    })
                        : <TaskFallback />
                }
            </div>
        </div>
    )
}

const Header = () => {
    return (
        <>
            <header className=' flex justify-between mb-5'>
                <div className=" text-primary font-medium text-xl flex gap-3 ">
                    <ClipboardPen className='' />
                    <p>To-Do</p>
                </div>
                <Link to={'/todo'} className=' cursor-pointer underline hover:text-primary'>
                    See all
                </Link>
            </header>
            <div className="date text-xs my-1">
                {todaysDate} <span className=' text-[#A1A3AB] ml-1'> .Today</span>
            </div>
        </>
    )
}

export default TaskSummary