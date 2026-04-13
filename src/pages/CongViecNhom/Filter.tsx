import { Card, Col, Input, Row, Select } from 'antd';
import { useModel } from 'umi';
import { useMemo } from 'react';

const { Search } = Input;
const { Option } = Select;

const CongViecFilter = () => {
  const {
    congViecList,
    setSearchText,
    setFilterTrangThai,
    setFilterNguoiGiao,
  } = useModel('CongViecNhom.congviecnhom');

  // Lấy danh sách những người được giao (không trùng lặp) để đưa vào Select
  const uniqueAssignees = useMemo(() => {
    const assignees = new Set(congViecList.map((item) => item.nguoiDuocGiao));
    return Array.from(assignees);
  }, [congViecList]);

  return (
    <Card style={{ marginBottom: 16 }} size="small">
      <Row gutter={16}>
        <Col span={8}>
          <Search
            placeholder="Tìm kiếm theo tên công việc..."
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Select
            style={{ width: '100%' }}
            placeholder="Lọc theo trạng thái"
            allowClear
            onChange={(value) => setFilterTrangThai(value)}
          >
            <Option value="Chưa làm">Chưa làm</Option>
            <Option value="Đang làm">Đang làm</Option>
            <Option value="Đã xong">Đã xong</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: '100%' }}
            placeholder="Lọc theo người được giao"
            allowClear
            onChange={(value) => setFilterNguoiGiao(value)}
          >
            {uniqueAssignees.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default CongViecFilter;