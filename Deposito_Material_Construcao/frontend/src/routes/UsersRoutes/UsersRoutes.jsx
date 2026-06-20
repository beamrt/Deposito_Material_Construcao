import { Routes, Route, Navigate } from 'react-router';
import IndexUsers from '../../pages/Usuarios/Index/IndexUser';
import NotFound from '../../pages/404/404';

export default function UsersRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="index" replace />} />
      <Route path="index" element={<IndexUsers />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
