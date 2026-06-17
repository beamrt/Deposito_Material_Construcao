import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/404/404';
import Relatorios from '../../pages/Relatorios/Relatorios';

export default function RelatorioRoutes() {
  return (
    <Routes>
      <Route index element={<Relatorios />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
