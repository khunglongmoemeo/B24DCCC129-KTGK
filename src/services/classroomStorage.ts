// 
import { Classroom } from '@/types/classroom';

const KEY = 'APP_CLASSROOM_DATA_V3';

// Sample data giúp hệ thống ko bị trống khi lần đầu chạy, đồng thời dễ dàng kiểm tra tính năng hơn. 
const SAMPLE_DATA: Classroom[] = [
  { id: '1', code: 'A101', name: 'Phòng Lý thuyết 1', capacity: 40, type: 'Lý thuyết', manager: 'Nguyễn Văn Huy' },
  { id: '2', code: 'B202', name: 'Phòng Thực hành LAB 1', capacity: 25, type: 'Thực hành', manager: 'Trần Thị Giang' },
  { id: '3', code: 'H105', name: 'Hội trường A', capacity: 200, type: 'Hội trường', manager: 'Lê Văn Công' },
  { id: '4', code: 'A102', name: 'Phòng Lý thuyết 2', capacity: 45, type: 'Lý thuyết', manager: 'Nguyễn Văn Duy' },
  { id: '5', code: 'B203', name: 'Phòng Thực hành LAB 2', capacity: 30, type: 'Thực hành', manager: 'Phạm Thị Lan' },
];

export const loadData = (): Classroom[] => {
  const data = localStorage.getItem(KEY);
  if (data) {
    return JSON.parse(data);
  }
  saveData(SAMPLE_DATA);
  return SAMPLE_DATA;
};

export const saveData = (data: Classroom[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};