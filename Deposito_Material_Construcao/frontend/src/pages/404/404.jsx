import { Background, ContainerImage } from './styled';
import Header from '../../components/Header/Header';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info(
      'Você será redirecionado para a página principal em 5 segundos...',
    );

    const timer = setTimeout(() => {
      navigate('/constrular');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Header />

      <Background>
        <ContainerImage />
      </Background>
    </>
  );
}
