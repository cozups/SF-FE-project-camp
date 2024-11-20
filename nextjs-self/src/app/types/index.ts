export interface Page {
  id: string;
  title: string;
  boards: BoardData[];
  from: string;
  to: string;
}

export interface BoardData {
  id: string;
  title: string;
  from: string;
  to: string;
  isCompleted: boolean;
  contents: string;
}
