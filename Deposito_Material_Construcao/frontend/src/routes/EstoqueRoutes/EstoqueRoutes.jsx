import { Routes, Route, Navigate } from 'react-router';
import IndexEstoque from '../../pages/Estoque/Index/IndexEstoque';
import NotFound from '../../pages/404/404';

export default function EstoqueRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="index" replace />} />
      <Route path="index" element={<IndexEstoque />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
