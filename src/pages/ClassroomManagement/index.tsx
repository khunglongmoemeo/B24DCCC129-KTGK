import { useState, useMemo } from 'react';
import { Button, Layout, Typography, Modal, Input, Row, Col, Select } from 'antd';
import { useModel } from 'umi';
import ClassroomTable from '@/components/ClassroomTable';
import ClassroomModal from '@/components/ClassroomModal';
import { Classroom } from '@/types/classroom';

const { Title } = Typography;
const { Option } = Select;

// Kết nối với model quản lý phòng học, đồng thời quản lý state cho tìm kiếm và lọc
export default function ClassroomManagement() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useModel('useClassroom');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Classroom | null>(null);

  // State cho Tìm kiếm & Lọc
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [filterManager, setFilterManager] = useState<string | undefined>(undefined);

  // Logic lọc dữ liệu
  const filteredRooms = useMemo(() => {
    return rooms.filter((item) => {
      const matchSearch = item.code.toLowerCase().includes(searchText.toLowerCase()) || 
                          item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchType = filterType ? item.type === filterType : true;
      const matchManager = filterManager ? item.manager === filterManager : true;
      return matchSearch && matchType && matchManager;
    });
  }, [rooms, searchText, filterType, filterManager]);

  // Lấy danh sách người quản lý duy nhất để hiển thị trong dropdown lọc
  const managers = useMemo(() => [...new Set(rooms.map(r => r.manager))], [rooms]);

  // Xác nhận trước khi xóa, đồng thời kiểm tra điều kiện không cho xóa nếu số chỗ >= 30
  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa phòng học này?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa', okType: 'danger', cancelText: 'Huỷ',
      onOk() { deleteRoom(id); },
    });
  };

  // Xử lý khi form Thêm/Sửa được submit, phân biệt dựa vào việc có đang chỉnh sửa hay không
  const handleFinish = (values: any) => {
    if (editingRoom) {
      updateRoom({ ...values, id: editingRoom.id });
    } else {
      addRoom({ ...values, id: Date.now().toString() });
    }
    setIsModalVisible(false);
  };

  // Giao diện chính, bao gồm phần tìm kiếm, lọc và bảng hiển thị dữ liệu
  return (
    <Layout style={{ padding: 24, background: '#fff' }}>
      <Title level={2}>Quản lý phòng học</Title>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input.Search placeholder="Tìm theo mã hoặc tên..." onChange={(e) => setSearchText(e.target.value)} allowClear />
        </Col>
        <Col span={5}>
          <Select placeholder="Loại phòng" allowClear style={{ width: '100%' }} onChange={setFilterType}>
            <Option value="Lý thuyết">Lý thuyết</Option>
            <Option value="Thực hành">Thực hành</Option>
            <Option value="Hội trường">Hội trường</Option>
          </Select>
        </Col>
        <Col span={5}>
          <Select placeholder="Người phụ trách" allowClear style={{ width: '100%' }} onChange={setFilterManager}>
            {managers.map(m => <Option key={m} value={m}>{m}</Option>)}
          </Select>
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => { setEditingRoom(null); setIsModalVisible(true); }}>Thêm mới</Button>
        </Col>
      </Row>
      
      <ClassroomTable 
        dataSource={filteredRooms} 
        onEdit={(r) => { setEditingRoom(r); setIsModalVisible(true); }} 
        onDelete={showDeleteConfirm}
      />

      <ClassroomModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onFinish={handleFinish}
        initialValues={editingRoom}
      />
    </Layout>
  );
}