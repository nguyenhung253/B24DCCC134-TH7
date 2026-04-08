import { Button, Card, Modal, Space, Table, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useModel } from 'umi';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import LoginForm from './LoginForm';
import CongViecForm from './Form';

const CongViecNhom = () => {
  const {
    congViecList,
    currentUser,
    visible,
    isEdit,
    loadCongViecList,
    loadCurrentUser,
    handleLogout,
    setVisible,
    setIsEdit,
    setSelectedCongViec,
    xoaCongViec,
  } = useModel('CongViecNhom.congviecnhom');

  useEffect(() => {
    loadCurrentUser();
    loadCongViecList();
  }, []);

  if (!currentUser) {
    return <LoginForm />;
  }

  const getMucDoColor = (mucDo: string) => {
    switch (mucDo) {
      case 'Cao':
        return 'red';
      case 'Trung bình':
        return 'orange';
      case 'Thấp':
        return 'green';
      default:
        return 'default';
    }
  };

  const getTrangThaiColor = (trangThai: string) => {
    switch (trangThai) {
      case 'Đã xong':
        return 'success';
      case 'Đang làm':
        return 'processing';
      case 'Chưa làm':
        return 'default';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<CongViecNhom.CongViec> = [
    {
      title: 'Tên công việc',
      dataIndex: 'tenCongViec',
      key: 'tenCongViec',
      width: 250,
    },
    {
      title: 'Người được giao',
      dataIndex: 'nguoiDuocGiao',
      key: 'nguoiDuocGiao',
      width: 150,
    },
    {
      title: 'Mức độ ưu tiên',
      dataIndex: 'mucDoUuTien',
      key: 'mucDoUuTien',
      width: 150,
      render: (mucDo: string) => (
        <Tag color={getMucDoColor(mucDo)}>{mucDo}</Tag>
      ),
    },
    {
      title: 'Thời hạn',
      dataIndex: 'deadline',
      key: 'deadline',
      width: 120,
      render: (date: string) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (trangThai: string) => (
        <Tag color={getTrangThaiColor(trangThai)}>{trangThai}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      align: 'center',
      render: (record: CongViecNhom.CongViec) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCongViec(record);
              setIsEdit(true);
              setVisible(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa công việc này?"
            onConfirm={() => xoaCongViec(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Quản lý Công việc Nhóm</span>
            <Space>
              <span>Xin chào, {currentUser.username}</span>
              <Button
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </Space>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsEdit(false);
              setSelectedCongViec(undefined);
              setVisible(true);
            }}
          >
            Thêm công việc
          </Button>
        }
      >
        <Table
          dataSource={congViecList}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={isEdit ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <CongViecForm />
      </Modal>
    </div>
  );
};

export default CongViecNhom;
