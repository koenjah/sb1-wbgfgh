import initSqlJs from 'sql.js';
import type { Database } from 'sql.js';
import type { Task, NewTask } from './types';
import { initialTasks } from './initialTasks';

let db: Database | null = null;

export async function initDb() {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  
  db = new SQL.Database();
  
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority INTEGER NOT NULL,
      parentId INTEGER,
      completed BOOLEAN DEFAULT FALSE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parentId) REFERENCES tasks(id)
    )
  `);

  // Check if we need to initialize with default tasks
  const result = db.exec("SELECT COUNT(*) FROM tasks");
  const count = result[0].values[0][0] as number;
  
  if (count === 0) {
    initialTasks.forEach(task => {
      db.run(`
        INSERT INTO tasks (title, description, priority, parentId)
        VALUES (?, ?, ?, ?)
      `, [task.title, task.description, task.priority, task.parentId]);
    });
  }

  return db;
}

export function getAllTasks(): Task[] {
  if (!db) throw new Error('Database not initialized');
  
  const result = db.exec(`
    SELECT * FROM tasks 
    ORDER BY priority DESC, createdAt DESC
  `);
  
  if (result.length === 0) return [];
  
  return result[0].values.map((row) => ({
    id: row[0] as number,
    title: row[1] as string,
    description: row[2] as string,
    priority: row[3] as number,
    parentId: row[4] as number | null,
    completed: Boolean(row[5]),
    createdAt: row[6] as string,
    updatedAt: row[7] as string
  }));
}

export function addTask(task: NewTask): Task {
  if (!db) throw new Error('Database not initialized');
  
  const { title, description, priority, parentId } = task;
  
  db.run(`
    INSERT INTO tasks (title, description, priority, parentId)
    VALUES (?, ?, ?, ?)
  `, [title, description, priority, parentId]);
  
  const result = db.exec(`
    SELECT * FROM tasks 
    WHERE id = last_insert_rowid()
  `);
  
  const row = result[0].values[0];
  return {
    id: row[0] as number,
    title: row[1] as string,
    description: row[2] as string,
    priority: row[3] as number,
    parentId: row[4] as number | null,
    completed: Boolean(row[5]),
    createdAt: row[6] as string,
    updatedAt: row[7] as string
  };
}

export function updateTask(id: number, updates: Partial<Task>) {
  if (!db) throw new Error('Database not initialized');
  
  const sets = Object.entries(updates)
    .map(([key]) => `${key} = ?`)
    .join(', ');
  
  db.run(`
    UPDATE tasks 
    SET ${sets}, updatedAt = CURRENT_TIMESTAMP 
    WHERE id = ?
  `, [...Object.values(updates), id]);
}

export function deleteTask(id: number) {
  if (!db) throw new Error('Database not initialized');
  
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
  // Also delete all subtasks
  db.run('DELETE FROM tasks WHERE parentId = ?', [id]);
}