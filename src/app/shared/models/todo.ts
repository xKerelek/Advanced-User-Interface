export interface Todo {
  id?: string;
  content: string;
  isCompleted: boolean;
}

export type FilterType = 'All' | 'Active' | 'Completed';
