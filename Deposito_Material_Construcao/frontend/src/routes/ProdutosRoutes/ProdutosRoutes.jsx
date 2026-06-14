import { Route, Routes, Navigate } from 'react-router';
import Index from '../../pages/Produtos/Index/Index';
import NotFound from '../../pages/404/404';
import Cadastro from '../../pages/Produtos/Cadastro/Cadastro';

export default function ProdutosRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="index" replace />} />
      <Route path="index" element={<Index />} />
      <Route path="cadastro" element={<Cadastro />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
