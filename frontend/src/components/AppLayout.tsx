import { CarOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Typography } from "antd";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  children: ReactNode;
}

export function AppLayout({
  isLoggedIn,
  onLogout,
  children,
}: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Header
        style={{
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/vehicles"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <CarOutlined style={{ fontSize: 22, color: "#38bdf8" }} />
          <Typography.Text strong style={{ color: "#ffffff", fontSize: 16 }}>
            | ระบบบันทึกข้อมูลรถยนตร์
          </Typography.Text>
        </Link>

        {isLoggedIn && (
          <Button
            type="link"
            danger
            icon={<LogoutOutlined />}
            onClick={onLogout}
          >
            ออกจากระบบ
          </Button>
        )}
      </Header>

      <Content
        style={{
          width: "90%",
          margin: "24px auto",
          padding: 24,
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          color: '#64748b',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '18px 24px',
        }}
      >
        <Typography.Text
          type="secondary"
          style={{ fontSize: 12 }}
        >
          ระบบสารสนเทศสำหรับการบริหารจัดการยานพาหนะภายในองค์กร
        </Typography.Text>
      </Footer>
    </Layout>
  );
}
