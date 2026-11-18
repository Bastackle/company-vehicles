CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  car_number VARCHAR(32) NOT NULL UNIQUE,
  car_brand VARCHAR(100) NOT NULL,
  car_model VARCHAR(100) NOT NULL,
  year INTEGER,
  color VARCHAR(50),
  status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO vehicles (car_number, car_brand, car_model, year, color, status, note)
VALUES
  ('กข-1234', 'Toyota', 'Hilux Revo Prerunner', 2023, 'ขาว', 'AVAILABLE', 'รถกระบะพร้อมใช้งาน ตรวจสอบสภาพรถเรียบร้อย'),
  ('ฆง-5521', 'Honda', 'Civic FE', 2024, 'เทา', 'IN_USE', 'รถกำลังถูกใช้งานโดยพนักงาน'),
  ('จฉ-8890', 'Isuzu', 'MU-X', 2022, 'ดำ', 'MAINTENANCE', 'อยู่ระหว่างเข้ารับการตรวจเช็กและซ่อมบำรุง'),
  ('ญญ-3019', 'Mitsubishi', 'Xpander', 2023, 'เงิน', 'AVAILABLE', 'รถพร้อมให้บริการ เหมาะสำหรับเดินทางเป็นหมู่คณะ'),
  ('ฎฏ-4410', 'Toyota', 'Yaris Ativ', 2024, 'ขาว', 'AVAILABLE', 'รถพร้อมใช้งาน สภาพรถปกติ'),
  ('ฐฐ-7782', 'MG', 'HS PHEV', 2022, 'แดง', 'IN_USE', 'รถกำลังถูกใช้งาน อยู่ระหว่างการเดินทาง')
ON CONFLICT (car_number) DO NOTHING;