import { Button, Card, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const LoginForm = () => {
  const { login } = useModel('CongViecNhom.congviecnhom');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card title="Đăng nhập" style={{ width: 400 }}>
        <Form
          onFinish={(values) => {
            login(values.username);
          }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên người dùng"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
