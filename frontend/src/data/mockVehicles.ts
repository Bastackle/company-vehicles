export type VehicleStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE';

export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number | null;
  color: string | null;
  status: VehicleStatus;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    licensePlate: 'กข-1234',
    brand: 'Toyota',
    model: 'Hilux Revo Prerunner',
    year: 2023,
    color: 'ขาว',
    status: 'AVAILABLE',
    note: 'รถกระบะสำหรับฝ่าย BD ลงพื้นที่ต่างจังหวัด',
    createdAt: '2026-11-10T09:00:00.000Z',
    updatedAt: '2026-11-10T09:00:00.000Z',
  },
  {
    id: 2,
    licensePlate: 'ฆง-5521',
    brand: 'Honda',
    model: 'Civic FE',
    year: 2024,
    color: 'เทา',
    status: 'IN_USE',
    note: 'รถเก๋งใช้งานประชุมลูกค้าโซนในเมือง',
    createdAt: '2026-11-11T10:30:00.000Z',
    updatedAt: '2026-11-12T14:15:00.000Z',
  },
  {
    id: 3,
    licensePlate: 'จฉ-8890',
    brand: 'Isuzu',
    model: 'MU-X',
    year: 2022,
    color: 'ดำ',
    status: 'MAINTENANCE',
    note: 'เข้าศูนย์เช็กระยะและเปลี่ยนยาง',
    createdAt: '2026-11-12T08:20:00.000Z',
    updatedAt: '2026-11-15T16:40:00.000Z',
  },
  {
    id: 4,
    licensePlate: 'ญญ-3019',
    brand: 'Mitsubishi',
    model: 'Xpander',
    year: 2023,
    color: 'เงิน',
    status: 'AVAILABLE',
    note: 'พร้อมใช้งาน รับ-ส่งทีมงาน',
    createdAt: '2026-11-13T11:00:00.000Z',
    updatedAt: '2026-11-13T11:00:00.000Z',
  },
  {
    id: 5,
    licensePlate: 'ฎฏ-4410',
    brand: 'Toyota',
    model: 'Yaris Ativ',
    year: 2024,
    color: 'ขาว',
    status: 'AVAILABLE',
    note: 'ประหยัดน้ำมัน ใช้เดินทางระยะสั้น',
    createdAt: '2026-11-14T13:45:00.000Z',
    updatedAt: '2026-11-14T13:45:00.000Z',
  },
  {
    id: 6,
    licensePlate: 'ฐฐ-7782',
    brand: 'MG',
    model: 'HS PHEV',
    year: 2022,
    color: 'แดง',
    status: 'IN_USE',
    note: 'คุณสมชายใช้งานออกพบลูกค้า',
    createdAt: '2026-11-15T07:50:00.000Z',
    updatedAt: '2026-11-18T09:10:00.000Z',
  },
];