import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Input,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import type { Vehicle } from '../data/mockVehicles';

interface VehicleListPageProps {
  vehicles: Vehicle[];
  onDeleteVehicle: (id: number) => void;
}

export function VehicleListPage({
  vehicles,
  onDeleteVehicle,
}: VehicleListPageProps) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredVehicles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return vehicles;
    return vehicles.filter(
      (v) =>
        v.licensePlate.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
    );
  }, [vehicles, searchQuery]);

  const pagedVehicles = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredVehicles.slice(start, start + pageSize);
  }, [filteredVehicles, page, pageSize]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchQuery(value.trim());
  };

  const handleDelete = (id: number) => {
    onDeleteVehicle(id);
    message.success('ลบข้อมูลรถยนต์เรียบร้อยแล้ว (Mock)');
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: 'ทะเบียนรถ',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      render: (text: string, record) => (
        <Link to={`/vehicles/${record.id}`}>
          <Typography.Text strong>{text}</Typography.Text>
        </Link>
      ),
    },
    {
      title: 'ยี่ห้อ',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'รุ่น',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'ปี',
      key: 'meta',
      render: (_, record) =>
        `${record.year ?? '-'}`,
    },
    {
      title: 'สี',
      key: 'meta',
      render: (_, record) =>
        `${record.color ?? '-'}`,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'จัดการ',
      key: 'actions',
      align: 'center',
      width: 220,
      render: (_, record) => (
        <Space size="medium">
          <Button
            size="medium"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/vehicles/${record.id}`)}
          >
          </Button>
          <Button
            size="medium"
            icon={<EditOutlined />}
            onClick={() => navigate(`/vehicles/${record.id}/edit`)}
          >
          </Button>
          <Popconfirm
            title="ยืนยันการลบข้อมูลรถคันนี้?"
            description={`ทะเบียน ${record.licensePlate}`}
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="medium" danger icon={<DeleteOutlined />}>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            รายการรถยนต์ของบริษัท
          </Typography.Title>
          <Typography.Text type="secondary">
            ข้อมูลรถยนต์ทั้งหมดในระบบ
          </Typography.Text>
        </div>

        <Space wrap>
          <Input.Search
            placeholder="ค้นหาด้วยทะเบียนรถ / ยี่ห้อ / รุ่น"
            allowClear
            enterButton={<SearchOutlined />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/vehicles/new')}
          >
            เพิ่มข้อมูลรถ
          </Button>
        </Space>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={pagedVehicles}
        pagination={{
          current: page,
          pageSize,
          total: filteredVehicles.length,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20],
          onChange: (nextPage, nextSize) => {
            setPage(nextPage);
            setPageSize(nextSize);
          },
        }}
      />
    </Card>
  );
}