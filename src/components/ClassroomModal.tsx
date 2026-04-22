import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { Classroom } from '@/types/classroom';

// Component Modal dùng chung cho cả Thêm và Sửa phòng học, dựa vào props để phân biệt
interface Props {
  visible: boolean;
  onClose: () => void;
  onFinish: (values: any) => void;
  initialValues?: Classroom | null;
}

const ClassroomModal: React.FC<Props> = ({ visible, onClose, onFinish, initialValues }) => {
  const [form] = Form.useForm();

  // Reset và nạp lại dữ liệu
  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  // Giao diện chính của Modal, bao gồm form với các trường thông tin và validationz
  return (
    <Modal 
        title={initialValues ? "Sửa thông tin" : "Thêm mới"} 
        visible={visible} 
        onOk={() => form.submit()} // Dùng form.submit() trực tiếp
        onCancel={onClose}
    >
      <Form 
        form={form} 
        onFinish={(values) => {
            onFinish(values);
            form.resetFields(); // Reset sau khi lưu thành công
        }}
        onFinishFailed={(errorInfo) => {
            console.log('Form submission failed:', errorInfo);
        }}
        layout="vertical"
      >
        <Form.Item name="code" label="Mã phòng" rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}> 
          <Input /> 
        </Form.Item>
        <Form.Item name="name" label="Tên phòng" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}> 
          <Input /> 
        </Form.Item>
        <Form.Item name="capacity" label="Số chỗ" rules={[{ required: true, message: 'Vui lòng nhập số chỗ!' }]}> 
          <InputNumber style={{width:'100%'}}/> 
        </Form.Item>
        <Form.Item name="type" label="Loại phòng" rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}>
          <Select options={['Lý thuyết', 'Thực hành', 'Hội trường'].map(i => ({ label: i, value: i }))} />
        </Form.Item>
        <Form.Item name="manager" label="Người phụ trách" rules={[{ required: true, message: 'Vui lòng nhập người phụ trách!' }]}> 
          <Input /> 
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClassroomModal;