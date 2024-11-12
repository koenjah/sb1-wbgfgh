import React from 'react';
import { Bot, Brain, Database, FileText } from 'lucide-react';
import type { Task } from '../types';

interface StatsProps {
  tasks: Task[];
}

export default function Stats({ tasks }: StatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority >= 80).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Totaal Taken</p>
            <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
          </div>
          <ClipboardList className="h-8 w-8 text-[#0066CC]" />
        </div>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Afgerond</p>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
          </div>
          <Bot className="h-8 w-8 text-[#0066CC]" />
        </div>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Hoge Prioriteit</p>
            <p className="text-2xl font-bold text-gray-900">{highPriorityTasks}</p>
          </div>
          <Brain className="h-8 w-8 text-[#FF6600]" />
        </div>
      </div>

      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Voortgang</p>
            <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
          </div>
          <Database className="h-8 w-8 text-green-500" />
        </div>
      </div>
    </div>
  );
}