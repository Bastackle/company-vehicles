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
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StatusTag } from '../components/StatusTag';
import vehicleService, { type Vehicle } from '../services/vehicleApi';

export function VehicleListPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await vehicleService.getVehicles({
        search: searchQuery || undefined,
        page,
        limit: pageSize,
      });

      if (res.meta.total > 0 && page > res.meta.totalPages) {
        setPage(res.meta.totalPages);
        return;
      }

      setVehicles(res.data);
      setTotal(res.meta.total);
    } catch {
      message.error('ไม่สามารถโหลดข้อมูลรถยนต์ได้');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, pageSize]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearchQuery(value.trim());
  };

  const handleDelete = async (id: number) => {
    try {
      await vehicleService.deleteVehicle(id);
      message.success('ลบข้อมูลรถยนต์เรียบร้อยแล้ว');
      if (vehicles.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchList();
      }
    } catch {
      message.error('ไม่สามารถลบข้อมูลรถยนต์ได้');
    }
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: 'ทะเบียนรถ',
      dataIndex: 'carNumber',
      key: 'carNumber',
      render: (text: string, record) => (
        <Link to={`/vehicles/${record.id}`}>
          <Typography.Text strong>{text}</Typography.Text>
        </Link>
      ),
    },
    {
      title: 'ยี่ห้อ',
      dataIndex: 'carBrand',
      key: 'carBrand',
    },
    {
      title: 'รุ่น',
      dataIndex: 'carModel',
      key: 'carModel',
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
            description={`ทะเบียน ${record.carNumber}`}
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
        dataSource={vehicles}
        loading={loading}
        pagination={{
          current: page,
          pageSize,
          total,
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