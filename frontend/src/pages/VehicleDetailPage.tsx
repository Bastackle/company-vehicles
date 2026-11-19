import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  Popconfirm,
  Space,
  Typography,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import type { Vehicle } from '../data/mockVehicles';

interface VehicleDetailPageProps {
  vehicles: Vehicle[];
  onDeleteVehicle: (id: number) => void;
}

export function VehicleDetailPage({
  vehicles,
  onDeleteVehicle,
}: VehicleDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.id === Number(id));

  if (!vehicle) {
    return (
      <Card>
        <Typography.Text>ไม่พบข้อมูลรถยนต์ที่ต้องการ</Typography.Text>
        <div style={{ marginTop: 12 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/vehicles')}
          >
            กลับหน้ารายการ
          </Button>
        </div>
      </Card>
    );
  }

  const handleDelete = () => {
    onDeleteVehicle(vehicle.id);
    message.success('ลบข้อมูลรถยนต์เรียบร้อยแล้ว (Mock)');
    navigate('/vehicles');
  };

  return (
    <Card
      title={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/vehicles")}
          ></Button>
           <Typography.Title level={5} style={{ margin: 0 }}>
            รายละเอียดรถยนต์: {vehicle.licensePlate}
          </Typography.Title>
        </Space>
      }
      style={{ margin: "0 auto" }}

      extra={
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
          >
            แก้ไขข้อมูล
          </Button>
          <Popconfirm
            title="ยืนยันการลบข้อมูลรถคันนี้?"
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{ danger: true }}
            onConfirm={handleDelete}
          >
            <Button danger icon={<DeleteOutlined />}>
              ลบข้อมูล
            </Button>
          </Popconfirm>
        </Space>
      }
    >
      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item label="ทะเบียนรถ">
          <Typography.Text strong>{vehicle.licensePlate}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="สถานะ">
          <StatusTag status={vehicle.status} />
        </Descriptions.Item>
        <Descriptions.Item label="ยี่ห้อรถ">{vehicle.brand}</Descriptions.Item>
        <Descriptions.Item label="รุ่นรถ">{vehicle.model}</Descriptions.Item>
        <Descriptions.Item label="ปีที่ผลิต">
          {vehicle.year ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label="สีรถ">{vehicle.color ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="หมายเหตุ" span={2}>
          {vehicle.note || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="วันที่บันทึก">
          {new Date(vehicle.createdAt).toLocaleString('th-TH')}
        </Descriptions.Item>
        <Descriptions.Item label="อัปเดตล่าสุด">
          {new Date(vehicle.updatedAt).toLocaleString('th-TH')}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}