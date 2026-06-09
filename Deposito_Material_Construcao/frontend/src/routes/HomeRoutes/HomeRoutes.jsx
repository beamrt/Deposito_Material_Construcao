import { Route, Routes, Navigate } from 'react-router';

import HomePage from '../../pages/HomePage/HomePage';
import NotFound from '../../pages/404/404';

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/constrular" replace />} />

      <Route path="/constrular" element={<HomePage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
