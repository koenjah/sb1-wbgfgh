export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  parentId: number | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewTask {
  title: string;
  description: string;
  priority: number;
  parentId: number | null;
}