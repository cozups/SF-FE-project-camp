export interface Todo {
  id: number;
  title: string;
  boards: Board[];
  from: Date | null;
  to: Date | null;
  author_id: string;
}

export interface Board {
  id: string;
  title: string;
  from: Date | null;
  to: Date | null;
  isCompleted: boolean;
  contents: string;
}
