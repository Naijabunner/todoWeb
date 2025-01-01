import React, { useEffect, useState } from "react";
import Task from "../models/task";
import { task } from "../src/pages/AllTask/AllTaskPage";

const useFetchAll = (): { data: task[]; refetch: () => void } => {
    const [data, setData] = useState<task[]>([]);

    useEffect(() => {
        setData(Task.fetchAll());
    }, []);

    const refetch = () => {
        setData(Task.fetchAll());
    };

    return {
        data,
        refetch,
    };
};

export default useFetchAll;
