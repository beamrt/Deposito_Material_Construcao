import { Route, Routes, Navigate } from 'react-router';
import Index from '../../pages/Produtos/Index/Index';

export default function ProdutosRoutes() {
  return (
    <Routes>
      <Route
        path="/constrular/produtos"
        element={<Navigate to="/produtos/index" replace />}
      />
      <Route path="/index" element={<Index />} />
    </Routes>
  );
}
