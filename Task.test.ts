import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import Task from './models/task';


// Mock localStorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
});

afterEach(() => {
  localStorage.clear();
});

describe('Task Class', () => {
  it('should create a new task and save it to localStorage', () => {
    const task = new Task(
      'Test Task',
      'Math',
      new Date('2024-12-31'),
      'This is a test task.',
      'High',
      'In progress',
      new Date(),
    );
    task.create();

    const tasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(tasks[0].status).toBe('In progress');
  });

  it('should fetch all tasks from localStorage in reverse order', () => {
    const task1 = new Task(
      'Task 1',
      'Math',
      new Date('2024-12-31'),
      'First task description.',
      'High',
      'In progress',
      new Date(),
    );
    const task2 = new Task(
      'Task 2',
      'Science',
      new Date('2025-01-01'),
      'Second task description.',
      'Medium',
      'Completed',
      new Date(),
    );
    task1.create();
    task2.create();

    const tasks = Task.fetchAll();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Task 2'); // Reverse order
    expect(tasks[1].title).toBe('Task 1');
  });

  it('should delete a task by ID', () => {
    const task = new Task(
      'Task to Delete',
      'History',
      new Date('2024-12-31'),
      'This task will be deleted.',
      'Low',
      'Failed',
      new Date(),
    );
    task.create();

    const tasksBeforeDelete = Task.fetchAll();
    expect(tasksBeforeDelete).toHaveLength(1);

    Task.deleteById(task.id!);
    const tasksAfterDelete = Task.fetchAll();
    expect(tasksAfterDelete).toHaveLength(0);
  });

  it('should edit a task by ID', () => {
    const task = new Task(
      'Task to Edit',
      'English',
      new Date('2024-12-31'),
      'This task will be edited.',
      'Low',
      'In progress',
      new Date(),
    );
    task.create();

    const updatedData: {
      title: string;
      priority: "Low" | "High" | "Medium";
      status: "Completed" | "In progress" | "Failed";
    } = { title: "Updated Task", priority: "High", status: "Completed" };
    Task.editById(task.id!, updatedData);

    const editedTask = Task.getById(task.id!);
    expect(editedTask).not.toBeNull();
    expect(editedTask?.title).toBe('Updated Task');
    expect(editedTask?.priority).toBe('High');
    expect(editedTask?.status).toBe('Completed');
  });

  it('should fetch a task by ID', () => {
    const task = new Task(
      'Specific Task',
      'Geography',
      new Date('2024-12-31'),
      'This task will be fetched by ID.',
      'Medium',
      'Completed',
      new Date(),
    );
    task.create();

    const fetchedTask = Task.getById(task.id!);
    expect(fetchedTask).not.toBeNull();
    expect(fetchedTask?.title).toBe('Specific Task');
    expect(fetchedTask?.status).toBe('Completed');
  });

  it('should return an empty array if no tasks are present', () => {
    const tasks = Task.fetchAll();
    expect(tasks).toHaveLength(0);
  });
});
