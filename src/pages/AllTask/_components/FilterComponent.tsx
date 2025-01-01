import React, { useEffect } from "react";
import { useState } from "react";

interface FilterProps {
    status: string;
    priority: string;
    search: string;
}

const FilterComponent = ({ onFilter }: { onFilter: (filters: FilterProps) => void }) => {
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [search, setSearch] = useState('');
  
    const handleFilterChange = () => {
      onFilter({ status, priority, search });
    };

    useEffect(()=>{
        handleFilterChange();
    },[status, priority, search])
  
    return (
      <div className="flex gap-4 mb-5 text-sm">
        <select value={status} onChange={(e) => { setStatus(e.target.value);}} className="border p-2 cursor-pointer rounded">
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>
          <option value="Failed">Failed</option>
        </select>
        <select value={priority} onChange={(e) => { setPriority(e.target.value);}} className="border cursor-pointer p-2 focus:outline-primary rounded">
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value);}}
          placeholder="Search..."
          className="border p-2 rounded"
        />
      </div>
    );
  };

  export default FilterComponent