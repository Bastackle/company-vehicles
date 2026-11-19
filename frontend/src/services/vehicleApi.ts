import axios from "axios";

export type VehicleStatus = "AVAILABLE" | "IN_USE" | "MAINTENANCE";

export interface Vehicle {
  id: number;
  carNumber: string;
  carBrand: string;
  carModel: string;
  year: number | null;
  color: string | null;
  status: VehicleStatus;
  note: string | null;
  createdAt: string;
  updatedAt: string;
}



export interface VehiclePayload {
  carNumber: string;
  carBrand: string;
  carModel: string;
  year?: number | null;
  color?: string | null;
  status?: VehicleStatus;
  note?: string | null;
}

export interface PaginatedVehicles {
  data: Vehicle[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

const vehicleService = {
  getVehicles: async (params: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await api.get<PaginatedVehicles>("/vehicles", { params });
    return data;
  },

  getVehicleById: async (id: number) => {
    const { data } = await api.get<Vehicle>(`/vehicles/${id}`);
    return data;
  },

  createVehicle: async (payload: VehiclePayload) => {
    const { data } = await api.post<Vehicle>('/vehicles', payload);
    return data;
  },

  updateVehicle: async (id: number, payload: VehiclePayload) => {
    const { data } = await api.patch<Vehicle>(`/vehicles/${id}`, payload);
    return data
  },

  deleteVehicle: async (id: number) => {
    await api.delete(`/vehicles/${id}`);
  }
};

export default vehicleService;
