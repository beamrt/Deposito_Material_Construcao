import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import GlobalStyles from './GlobalStyles/GlobalStyles';
import LoginRoutes from './routes/LoginRoutes/LoginRoutes';
import CadastroRoutes from './routes/CadastroRoutes/CadastroRoutes';
import NotFound from './pages/404/404';

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        {/* Authentication Routes */}
        <Route path="/login/*" element={<LoginRoutes />} />
        <Route path="/cadastro" element={<CadastroRoutes />} />

        {/* Open Routes */}

        {/* Nested Routes */}

        <Route path="*" element={<NotFound />} />
        {/* Closed Routes */}
      </Routes>

      {/* ToastContainer */}
      <ToastContainer autoclose={4000} theme="dark" />
    </>
  );
}

export default App;
