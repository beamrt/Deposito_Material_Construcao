import { Routes, Route } from 'react-router';
import Cadastro from '../../pages/Cadastro/CadastroPage';

export default function CadastroRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
    </Routes>
  );
}
