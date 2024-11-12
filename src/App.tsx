import React, { useEffect, useState } from 'react';
import { ClipboardList, Plus, Bot, Brain, Database, FileText } from 'lucide-react';
import { initDb, getAllTasks, addTask, updateTask, deleteTask } from './db';
import type { Task, NewTask } from './types';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Stats from './components/Stats';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDb();
        refreshTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize database');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const refreshTasks = () => {
    try {
      const allTasks = getAllTasks();
      setTasks(allTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    }
  };

  const handleAddTask = (newTask: NewTask) => {
    try {
      addTask(newTask);
      refreshTasks();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    }
  };

  const handleUpdateTask = (id: number, updates: Partial<Task>) => {
    try {
      updateTask(id, updates);
      refreshTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = (id: number) => {
    try {
      deleteTask(id);
      refreshTasks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066CC]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const rootTasks = tasks.filter(task => !task.parentId);
  const getSubtasks = (parentId: number) => tasks.filter(task => task.parentId === parentId);

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <header className="header">
        <div className="header-content">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-[#0066CC]" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Brigade</h1>
              <p className="text-sm text-gray-500">Takenlijst & Voortgang</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-accent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Taak
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Stats tasks={tasks} />

        {showForm && (
          <div className="mb-8">
            <TaskForm onSubmit={handleAddTask} />
          </div>
        )}

        <div className="space-y-4">
          {rootTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              subtasks={getSubtasks(task.id)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAddSubtask={handleAddTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;