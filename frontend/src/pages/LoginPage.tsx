
import { LockOutlined, LoginOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Result,
  Space,
  Typography,
} from 'antd';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}
        styles={{ body: { padding: '40px 32px' } }}
      >
        <Result
          icon={
            <LockOutlined
              style={{
                color: '#1677ff',
                fontSize: 52,
              }}
            />
          }
          title={
            <Typography.Title level={3} style={{ marginBottom: 8 }}>
              เข้าสู่ระบบ
            </Typography.Title>
          }
          subTitle={
            <Space direction="vertical" size={4}>
              <Typography.Text strong>
                ระบบจัดการยานพาหนะ
              </Typography.Text>
              <Typography.Text type="secondary">
                กรุณาเข้าสู่ระบบเพื่อใช้งานระบบจัดการข้อมูลรถยนต์ของบริษัท
              </Typography.Text>
            </Space>
          }
          extra={
            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              onClick={onLogin}
              block
              style={{ height: 46, borderRadius: 8 }}
            >
              เข้าสู่ระบบ
            </Button>
          }
        />

        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: 16,
            textAlign: 'center',
          }}
        >
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            ระบบสารสนเทศสำหรับการบริหารจัดการยานพาหนะภายในองค์กร
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
}
