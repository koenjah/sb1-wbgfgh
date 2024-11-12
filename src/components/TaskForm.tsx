import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { NewTask } from '../types';

interface TaskFormProps {
  parentId?: number | null;
  onSubmit: (task: NewTask) => void;
  isSubtask?: boolean;
}

export default function TaskForm({ parentId = null, onSubmit, isSubtask = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      parentId,
    });
    setTitle('');
    setDescription('');
    setPriority(50);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${!isSubtask && 'bg-white p-6 rounded-lg shadow-sm'}`}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titel
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Beschrijving
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field mt-1"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
          Prioriteit: {priority}
        </label>
        <input
          type="range"
          id="priority"
          min="0"
          max="100"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="priority-slider mt-1"
        />
      </div>

      <button
        type="submit"
        className={isSubtask ? 'btn-primary' : 'btn-accent'}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        {isSubtask ? 'Subtaak Toevoegen' : 'Nieuwe Taak'}
      </button>
    </form>
  );
}