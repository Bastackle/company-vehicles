import { Tag } from 'antd';
import type { VehicleStatus } from '../data/mockVehicles';

const STATUS_CONFIG: Record<VehicleStatus, { label: string; color: string }> = {
  AVAILABLE: { label: 'พร้อมใช้งาน', color: 'green' },
  IN_USE: { label: 'กำลังใช้งาน', color: 'blue' },
  MAINTENANCE: { label: 'ซ่อมบำรุง / เข้าศูนย์', color: 'orange' },
};

export function StatusTag({ status }: { status: VehicleStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: 'default' };
  return <Tag color={cfg.color}>{cfg.label}</Tag>;
}