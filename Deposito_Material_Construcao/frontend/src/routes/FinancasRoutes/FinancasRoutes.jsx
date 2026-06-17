import { Routes, Route } from 'react-router-dom';
import Financas from '../../pages/Financas/Financas';
import NotFound from '../../pages/404/404';

export default function FinancasRoutes() {
  return (
    <Routes>
      <Route index element={<Financas />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
