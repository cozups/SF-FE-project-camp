export interface Page {
  id: number;
  title: string;
  boards: BoardData[];
  from: Date | null;
  to: Date | null;
  author_id: string;
}

export interface BoardData {
  id: string;
  title: string;
  from: Date | null;
  to: Date | null;
  isCompleted: boolean;
  contents: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  // 이미지는 나중에 ...
}
