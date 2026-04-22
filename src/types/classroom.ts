export type RoomType = 'Lý thuyết' | 'Thực hành' | 'Hội trường';

export interface Classroom {
  id: string;
  code: string;
  name: string;
  capacity: number;
  type: RoomType;
  manager: string;
}