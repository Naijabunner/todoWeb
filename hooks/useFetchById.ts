import { useEffect, useState } from "react";
import Task from "../models/task";
import { task } from "../src/pages/AllTask/AllTaskPage";

const useFetchById = (id: string): { data: task|null; refetch: () => void } => {
    const [data, setData] = useState<task | null>(null);

    const fetchTask = () => {
        const task = Task.getById(id);
        setData(task ? task: null);
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const refetch = () => {
        fetchTask();
    };

    return {
        data,
        refetch,
    };
};

export default useFetchById;
