import { useState } from 'react';
import { Classroom } from '@/types/classroom';
import { loadData, saveData } from '@/services/classroomStorage';
import { message } from 'antd';

// Model quản lý trạng thái và logic liên quan đến phòng học, bao gồm thêm, sửa, xóa và lưu trữ dữ liệu
export default function useClassroom() {
  const [rooms, setRooms] = useState<Classroom[]>(loadData());

  const addRoom = (room: Classroom) => {
    const newList = [...rooms, room];
    setRooms(newList);
    saveData(newList);
    message.success('Thêm phòng thành công');
  };

  // Cập nhật phòng học dựa trên ID, nếu ID trùng thì cập nhật, ngược lại giữ nguyên
  const updateRoom = (updatedRoom: Classroom) => {
    const newList = rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r);
    setRooms(newList);
    saveData(newList);
    message.success('Cập nhật thành công');
  };

  // Xóa phòng học dựa trên ID, đồng thời kiểm tra điều kiện không cho xóa nếu số chỗ >= 30
  const deleteRoom = (id: string) => {
    const room = rooms.find(r => r.id === id);
    if (room && room.capacity >= 30) {
      message.error('Không thể xóa phòng có từ 30 chỗ trở lên');
      return;
    }
    const newList = rooms.filter(r => r.id !== id);
    setRooms(newList);
    saveData(newList);
    message.success('Đã xóa phòng');
  };

  return { rooms, addRoom, updateRoom, deleteRoom };
}