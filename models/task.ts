function saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

class Task {
    title: string;
    subject: string;
    submissionDate: Date;
    description: string;
    id: string | null;
    priority: "Low" | "High" | "Medium";
    status: 'Completed' | 'In progress' | 'Failed';
    createdOn: Date;

    constructor(title: string, subject: string, submissionDate: Date, description: string, priority: "Low" | "High" | "Medium", status: 'Completed' | 'In progress' | 'Failed', createdOn: Date, id?: string) {
        this.title = title;
        this.subject = subject;
        this.submissionDate = submissionDate;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.createdOn = createdOn;
        this.id = id ? id : null;
    }

    create() {
        if (!this.id) {
            this.id = new Date().getTime().toString();
        }
        const tasks = getFromLocalStorage('tasks') || [];
        tasks.push(this);
        saveToLocalStorage('tasks', tasks);
    }

    static fetchAll(): Task[] {
        const tasks = getFromLocalStorage('tasks') || [];
        return tasks.reverse().map((taskData: any) => new Task(
            taskData.title, 
            taskData.subject, 
            new Date(taskData.submissionDate), 
            taskData.description, 
            taskData.priority, 
            taskData.status, 
            new Date(taskData.createdOn), 
            taskData.id
        ));
    }

    static deleteById(id: string): void {
        let tasks = getFromLocalStorage('tasks') || [];
        tasks = tasks.filter((task: any) => task.id !== id);
        saveToLocalStorage('tasks', tasks);
    }

    static editById(id: string, updatedData: Partial<Task>): void {
        const tasks = getFromLocalStorage('tasks') || [];
        const taskIndex = tasks.findIndex((task: any) => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
            saveToLocalStorage('tasks', tasks);
        }
    }

    static getById(id: string): Task | null {
        const tasks = getFromLocalStorage('tasks') || [];
        const taskData = tasks.find((task: any) => task.id === id);
        return taskData ? new Task(
            taskData.title, 
            taskData.subject, 
            new Date(taskData.submissionDate), 
            taskData.description, 
            taskData.priority, 
            taskData.status, 
            new Date(taskData.createdOn), 
            taskData.id
        ) : null;
    }
}

export default Task;
