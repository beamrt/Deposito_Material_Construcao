import { Routes, Route } from 'react-router';
import Login from '../../pages/Login/LoginPage';
import ForgotPass from '../../pages/Login/Forgot/ForgotPass';

export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<ForgotPass />} />
    </Routes>
  );
}
