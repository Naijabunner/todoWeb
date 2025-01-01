import React from 'react'
import TaskSummary from './TaskSummary'
import Completedtask from './Completedtask'
import TaskStats from '../../../../components/TaskStats'

const DashboardLayout = () => {
    // const {TaskSummary, TaskStatus, CompletedTasks }= children
  return (
    <div className=" grid lg:grid-cols-[50%,45%] lg:grid-rows-[40%,57%] gap-5 lg:gap-[5%] gap-y-10 p-5 min-h-[650px] rounded-md shadow shadow-shadow bg-white pb-10 pt-5 overflow-y-hidden ">
        <div className="shadow-md row-span-2 px-5">
        <TaskSummary/>
        </div>
        <div className=" overflow-visible  flex justify-xenter items-center ">
        <TaskStats/>
        </div>
        <div className=" shadow-md px-3 h-full overflow-y-hidden ">
        <Completedtask/>
        </div>
    </div>
  )
}

export default DashboardLayout