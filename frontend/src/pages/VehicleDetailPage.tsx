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
  Skeleton,
  Space,
  Typography,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import vehicleService, { type Vehicle } from '../services/vehicleApi';
import { useEffect, useState } from 'react';

export function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    vehicleService.getVehicleById(Number(id))
      .then(setVehicle)
      .catch(() => {
        message.error('ไม่พบข้อมูลรถยนต์ที่ต้องการ');
        navigate('/vehicles');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!vehicle) return;
    try {
      await vehicleService.deleteVehicle(vehicle.id);
      message.success('ลบข้อมูลรถยนต์เรียบร้อยแล้ว');
      navigate('/vehicles');
    } catch {
      message.error('ไม่สามารถลบข้อมูลรถยนต์ได้');
    }
  };

  if (loading) {
    return (
      <Card>
        <Skeleton active />
      </Card>
    );
  }

  if (!vehicle) return null;

  return (
    <Card
      title={
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/vehicles")}
          ></Button>
           <Typography.Title level={5} style={{ margin: 0 }}>
            รายละเอียดรถยนต์: {vehicle.carNumber}
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
          <Typography.Text strong>{vehicle.carNumber}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="สถานะ">
          <StatusTag status={vehicle.status} />
        </Descriptions.Item>
        <Descriptions.Item label="ยี่ห้อรถ">{vehicle.carBrand}</Descriptions.Item>
        <Descriptions.Item label="รุ่นรถ">{vehicle.carModel}</Descriptions.Item>
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