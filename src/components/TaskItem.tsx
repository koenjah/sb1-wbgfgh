import React, { useState } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronRight, Trash2, PlusCircle } from 'lucide-react';
import type { Task, NewTask } from '../types';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
  subtasks: Task[];
  onUpdate: (id: number, updates: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onAddSubtask: (task: NewTask) => void;
}

export default function TaskItem({ task, subtasks, onUpdate, onDelete, onAddSubtask }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleCompleted = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const priorityColor = task.priority >= 80 ? 'text-red-600' :
                       task.priority >= 50 ? 'text-yellow-600' :
                       'text-green-600';

  return (
    <div className="task-card mb-4">
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleCompleted}
          className="text-gray-400 hover:text-[#0066CC] transition-colors duration-200"
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-[#0066CC]" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center group"
            >
              {subtasks.length > 0 && (
                <span className="text-gray-400 group-hover:text-[#0066CC] transition-colors duration-200">
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              )}
              <span className={`ml-2 font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </span>
            </button>

            <div className="ml-auto flex items-center space-x-3">
              <span className={`text-sm font-medium ${priorityColor}`}>
                {task.priority}
              </span>

              <button
                onClick={() => setShowForm(!showForm)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#FF6600] transition-colors duration-200"
                title="Subtaak toevoegen"
              >
                <PlusCircle className="h-4 w-4" />
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Verwijderen"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-gray-600 ml-6">{task.description}</p>
          )}
        </div>
      </div>

      {expanded && subtasks.length > 0 && (
        <div className="ml-6 mt-3 space-y-3 border-l-2 border-gray-100 pl-4">
          {subtasks.map(subtask => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              subtasks={[]}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddSubtask={onAddSubtask}
            />
          ))}
        </div>
      )}

      {showForm && (
        <div className="mt-3 ml-6 border-l-2 border-gray-100 pl-4">
          <TaskForm
            parentId={task.id}
            onSubmit={(newTask) => {
              onAddSubtask(newTask);
              setShowForm(false);
            }}
            isSubtask
          />
        </div>
      )}
    </div>
  );
}