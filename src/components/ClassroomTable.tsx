import React from 'react';
import { Table, Button, Space } from 'antd';
import { Classroom } from '@/types/classroom';

// Component hiển thị bảng danh sách phòng học, nhận dữ liệu và các hàm xử lý từ component cha
interface Props {
  dataSource: Classroom[];
  onEdit: (record: Classroom) => void;
  onDelete: (id: string) => void;
}

// Định nghĩa cấu trúc cột cho bảng, bao gồm các trường thông tin và cột thao tác với nút Sửa/Xóa
const ClassroomTable: React.FC<Props> = ({ dataSource, onEdit, onDelete }) => {
  const columns = [
    { title: 'Mã phòng', dataIndex: 'code', key: 'code' },
    { title: 'Tên phòng', dataIndex: 'name', key: 'name' },
    { title: 'Số chỗ', dataIndex: 'capacity', key: 'capacity', sorter: (a: any, b: any) => a.capacity - b.capacity },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
    { title: 'Người quản lý', dataIndex: 'manager', key: 'manager' },
    { title: 'Thao tác', key: 'action', render: (_: any, record: Classroom) => (
      <Space>
        <Button onClick={() => onEdit(record)}>Sửa</Button>
        <Button danger onClick={() => onDelete(record.id)}>Xóa</Button>
      </Space>
    )},
  ];
  return <Table dataSource={dataSource} columns={columns} rowKey="id" />;
};

export default ClassroomTable;