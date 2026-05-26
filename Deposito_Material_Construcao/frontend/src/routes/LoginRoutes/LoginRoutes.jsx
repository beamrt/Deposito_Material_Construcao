import { Routes, Route } from 'react-router';
import Login from '../../pages/Login/LoginPage';

export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
