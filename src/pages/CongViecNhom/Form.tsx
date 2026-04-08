import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const { Option } = Select;

const CongViecForm = () => {
  const { isEdit, selectedCongViec, themCongViec, suaCongViec, setVisible, loadCongViecList } = 
    useModel('CongViecNhom.congviecnhom');

  return (
    <Form
      layout="vertical"
      initialValues={
        isEdit && selectedCongViec
          ? {
              ...selectedCongViec,
              deadline: moment(selectedCongViec.deadline),
            }
          : {
              trangThai: 'Chưa làm',
              mucDoUuTien: 'Trung bình',
            }
      }
      onFinish={(values) => {
        const congviecData = {
          ...values,
          deadline: values.deadline.format('YYYY-MM-DD'),
        };

        if (isEdit && selectedCongViec) {
          suaCongViec(selectedCongViec.id, congviecData);
        } else {
          themCongViec(congviecData);
        }

        setVisible(false);
        loadCongViecList();
      }}
    >
      <Form.Item
        label="Tên công việc"
        name="tenCongViec"
        rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}
      >
        <Input placeholder="Nhập tên công việc" />
      </Form.Item>

      <Form.Item
        label="Người được giao"
        name="nguoiDuocGiao"
        rules={[{ required: true, message: 'Vui lòng nhập người được giao!' }]}
      >
        <Input placeholder="Nhập tên người được giao" />
      </Form.Item>

      <Form.Item
        label="Mức độ ưu tiên"
        name="mucDoUuTien"
        rules={[{ required: true, message: 'Vui lòng chọn mức độ ưu tiên!' }]}
      >
        <Select>
          <Option value="Thấp">Thấp</Option>
          <Option value="Trung bình">Trung bình</Option>
          <Option value="Cao">Cao</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Thời hạn hoàn thành"
        name="deadline"
        rules={[{ required: true, message: 'Vui lòng chọn thời hạn!' }]}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="trangThai"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <Select>
          <Option value="Chưa làm">Chưa làm</Option>
          <Option value="Đang làm">Đang làm</Option>
          <Option value="Đã xong">Đã xong</Option>
        </Select>
      </Form.Item>

      <div className="form-footer">
        <Button htmlType="submit" type="primary">
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={() => setVisible(false)} style={{ marginLeft: 8 }}>
          Hủy
        </Button>
      </div>
    </Form>
  );
};

export default CongViecForm;
