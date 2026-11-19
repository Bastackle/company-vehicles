import { ConfigProvider } from 'antd';
import thTH from 'antd/locale/th_TH';
import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { VehicleFormPage } from './pages/VehicleFormPage';
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

  const handleLogin = useCallback(() => {
    setLoginCookie();
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    clearLoginCookie();
    setIsLoggedIn(false);
  }, []);

  return (
    <ConfigProvider 
      locale={thTH}
      theme={{
        token: {
          fontFamily: "'IBM Plex Sans Thai', -apple-system, BlinkMacSystemFont, sans-serif",
        },
      }}
    >
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
              <Route path="/vehicles" element={<VehicleListPage />} />
              <Route path="/vehicles/new" element={<VehicleFormPage />} />
              <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
              <Route path="/vehicles/:id/edit" element={<VehicleFormPage />} />
              <Route path="*" element={<Navigate to="/vehicles" replace />} />
            </Routes>
          </AppLayout>
        )}
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;