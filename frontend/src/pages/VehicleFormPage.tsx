import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Vehicle, VehicleStatus } from "../data/mockVehicles";

export interface VehicleFormValues {
  licenseLetters: string;
  licenseNumber: string;
  brand: string;
  model: string;
  year?: number | null;
  color?: string | null;
  status: VehicleStatus;
  note?: string | null;
}

interface VehicleFormPageProps {
  vehicles: Vehicle[];
  onCreateVehicle: (values: VehicleFormValues) => void;
  onUpdateVehicle: (id: number, values: VehicleFormValues) => void;
}

export function VehicleFormPage({
  vehicles,
  onCreateVehicle,
  onUpdateVehicle,
}: VehicleFormPageProps) {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form] = Form.useForm<VehicleFormValues>();

  useEffect(() => {
    if (!isEdit || !id) {
      form.setFieldsValue({ status: "AVAILABLE" });
      return;
    }

    const found = vehicles.find((v) => v.id === Number(id));
    if (!found) {
      message.error("ไม่พบข้อมูลรถยนต์ที่ต้องการแก้ไข");
      navigate("/vehicles");
      return;
    }

    form.setFieldsValue({
      licenseLetters: found.licensePlate.split("-")[0],
      licenseNumber: found.licensePlate.split("-")[1],
      brand: found.brand,
      model: found.model,
      year: found.year,
      color: found.color,
      status: found.status,
      note: found.note,
    });
  }, [id, isEdit, vehicles, form, navigate]);

  const handleFinish = (values: VehicleFormValues) => {
    const normalized = {
      licensePlate: `${values.licenseLetters.trim()}-${values.licenseNumber.trim()}`,
      brand: values.brand.trim(),
      model: values.model.trim(),
      year: values.year ?? null,
      color: values.color?.trim() || null,
      status: values.status ?? "AVAILABLE",
      note: values.note?.trim() || null,
    };

    if (isEdit && id) {
      onUpdateVehicle(Number(id), normalized);
      message.success("อัปเดตข้อมูลรถยนต์เรียบร้อยแล้ว");
    } else {
      onCreateVehicle(normalized);
      message.success("เพิ่มข้อมูลรถยนต์เรียบร้อยแล้ว");
    }

    navigate("/vehicles");
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
            {isEdit ? "แก้ไขข้อมูลรถยนต์" : "เพิ่มข้อมูลรถยนต์ใหม่"}
          </Typography.Title>
        </Space>
      }
      style={{ maxWidth: "50%", margin: "0 auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ status: "AVAILABLE" }}
      >
        <Form.Item label="ทะเบียนรถ" required style={{marginBottom: 10}}>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="licenseLetters"
              rules={[{ required: true, message: "กรุณาระบุหมวดอักษรทะเบียน" }]}
              style={{ width: "40%" }}
            >
              <Input placeholder="อักษร เช่น กข" maxLength={3} />
            </Form.Item>

            <Form.Item
              name="licenseNumber"
              rules={[
                { required: true, message: "กรุณาระบุเลขทะเบียน" },
                {
                  pattern: /^\d{1,4}$/,
                  message: "กรุณาระบุตัวเลข 1-4 หลัก",
                },
              ]}
              style={{ width: "60%" }}
            >
              <Input placeholder="ตัวเลข เช่น 1234" maxLength={4} />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="ยี่ห้อรถ"
          name="brand"
          rules={[{ required: true, message: "กรุณาระบุยี่ห้อรถ" }]}
          style={{marginBottom: 30}}
        >
          <Input placeholder="เช่น Toyota, Honda, Isuzu" />
        </Form.Item>

        <Form.Item
          label="รุ่นรถ"
          name="model"
          rules={[{ required: true, message: "กรุณาระบุรุ่นรถ" }]}
          style={{marginBottom: 30}}
        >
          <Input placeholder="เช่น Hilux Revo, Civic FE" />
        </Form.Item>

        <Space style={{ display: "flex" }} wrap>
          <Form.Item label="ปีที่ผลิต" name="year" style={{ minWidth: 180 }}>
            <InputNumber
              min={1950}
              max={2100}
              placeholder="เช่น 2024"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="สีรถ" name="color" style={{ minWidth: 180 }}>
            <Input placeholder="เช่น ขาว, เทา, ดำ" />
          </Form.Item>

          <Form.Item label="สถานะ" name="status" style={{ minWidth: 200 }}>
            <Select
              options={[
                { value: "AVAILABLE", label: "พร้อมใช้งาน" },
                { value: "IN_USE", label: "กำลังใช้งาน" },
                { value: "MAINTENANCE", label: "ซ่อมบำรุง / เข้าศูนย์" },
              ]}
            />
          </Form.Item>
        </Space>

        <Form.Item label="หมายเหตุ" name="note">
          <Input.TextArea
            rows={3}
            placeholder="ระบุรายละเอียดเพิ่มเติม เช่น แผนกที่ใช้งาน หรือจุดสังเกต"
          />
        </Form.Item>

        <Space style={{ marginTop:20, marginBottom:20 }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            บันทึกข้อมูล
          </Button>
          <Button onClick={() => navigate("/vehicles")}>ยกเลิก</Button>
        </Space>
      </Form>
    </Card>
  );
}