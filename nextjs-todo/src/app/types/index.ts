export interface Page {
  id: number;
  title: string;
  boards: BoardData[];
  from: Date | null;
  to: Date | null;
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
  username: string;
  email: string;
  // 이미지는 나중에 ...
}
