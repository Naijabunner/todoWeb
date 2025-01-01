import React, { useEffect, useState } from 'react'
import DispalyCard from '../../../components/ui/DisplayCard'
import Task from '../../../models/task'
import useFetchAll from '../../../hooks/useFetchAll';
import { ClipboardPen } from 'lucide-react';
import FilterComponent from './_components/FilterComponent';
import TaskFallback from '../../../components/TaskFallback';
import { useAppContext } from '../../../appContext';

export interface task {
  title: string;
  subject: string;
  submissionDate: Date;
  description: string;
  id?: string | null;
  priority: "Low" | "High" | "Medium";
  status: 'Completed' | 'In progress' | 'Failed';
  createdOn: Date;
}


const AllTaskPage = () => {
  const { data, refetch } = useFetchAll()
  const Contenxt = useAppContext()
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    refetch()
  }, [Contenxt?.fetchDep])

  const handleFilter = ({ status, priority, search }: { status: string, priority: string, search: string }) => {

    const updatingData = () => {
      let filtered = data;
      if (status) {
        filtered = filtered.filter(task => task.status === status);
      }
      if (priority) {
        filtered = filtered.filter(task => task.priority === priority);
      }
      if (search) {
        filtered = filtered.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
      }
      return filtered
    }

    setFilteredData(updatingData());
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <section className='shadow shadow-shadow bg-white p-10 rounded-md overflow-y-scroll w-full '>
      <Header />
      <FilterComponent onFilter={handleFilter} />
      <div className="grid md:grid-cols-2 gap-10 max-h-[600px]  pb-10 rounded p-5 ">
        {
          filteredData.length ? filteredData.map((task) => {
            return <DispalyCard key={task.id} {...task} />
          })
            : <TaskFallback />
        }
      </div>

    </section>
  )
}


const Header = () => {
  return (
    <>
      <header className=' flex justify-between mb-5'>
        <div className=" text-primary font-medium text-xl flex gap-3 ">
          <ClipboardPen className='' />
          <p>To-Do List</p>
        </div>
      </header>

    </>
  )
}
export default AllTaskPage