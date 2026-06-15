import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';
import NotFound from '../../pages/404/404';

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
