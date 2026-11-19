import { ConfigProvider } from 'antd';
import thTH from 'antd/locale/th_TH';
import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { INITIAL_MOCK_VEHICLES, type Vehicle } from './data/mockVehicles';
import { LoginPage } from './pages/LoginPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import {
  VehicleFormPage,
  type VehicleFormValues,
} from './pages/VehicleFormPage';
import { VehicleListPage } from './pages/VehicleListPage';
import {
  clearLoginCookie,
  isLoggedInCookie,
  setLoginCookie,
} from './utils/authCookie';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    isLoggedInCookie(),
  );

  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_MOCK_VEHICLES);

  const handleLogin = useCallback(() => {
    setLoginCookie();
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    clearLoginCookie();
    setIsLoggedIn(false);
  }, []);

  const handleCreateVehicle = useCallback((values: VehicleFormValues) => {
    const now = new Date().toISOString();
    setVehicles((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((v) => v.id)) + 1 : 1;
      const created: Vehicle = {
        id: nextId,
        licensePlate: values.licensePlate,
        brand: values.brand,
        model: values.model,
        year: values.year ?? null,
        color: values.color ?? null,
        status: values.status,
        note: values.note ?? null,
        createdAt: now,
        updatedAt: now,
      };
      return [created, ...prev];
    });
  }, []);

  const handleUpdateVehicle = useCallback(
    (id: number, values: VehicleFormValues) => {
      const now = new Date().toISOString();
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === id
            ? {
                ...v,
                licensePlate: values.licensePlate,
                brand: values.brand,
                model: values.model,
                year: values.year ?? null,
                color: values.color ?? null,
                status: values.status,
                note: values.note ?? null,
                updatedAt: now,
              }
            : v,
        ),
      );
    },
    [],
  );

  const handleDeleteVehicle = useCallback((id: number) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return (
    <ConfigProvider locale={thTH}>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        ) : (
          <AppLayout
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/vehicles" replace />} />
              <Route
                path="/vehicles"
                element={
                  <VehicleListPage
                    vehicles={vehicles}
                    onDeleteVehicle={handleDeleteVehicle}
                  />
                }
              />
              <Route
                path="/vehicles/:id"
                element={
                  <VehicleDetailPage
                    vehicles={vehicles}
                    onDeleteVehicle={handleDeleteVehicle}
                  />
                }
              />
              <Route
                path="/vehicles/new"
                element={
                  <VehicleFormPage
                    vehicles={vehicles}
                    onCreateVehicle={handleCreateVehicle}
                    onUpdateVehicle={handleUpdateVehicle}
                  />
                }
              />
              <Route
                path="/vehicles/:id/edit"
                element={
                  <VehicleFormPage
                    vehicles={vehicles}
                    onCreateVehicle={handleCreateVehicle}
                    onUpdateVehicle={handleUpdateVehicle}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/vehicles" replace />} />
            </Routes>
          </AppLayout>
        )}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;