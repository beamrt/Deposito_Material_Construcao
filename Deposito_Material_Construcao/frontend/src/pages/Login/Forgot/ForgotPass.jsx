import React, { useState } from 'react';
import * as forg from './styled';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { forgetSchema } from '../../../services/validator';
import axios from '../../../services/axios';
import { toast } from 'react-toastify';

export default function ForgotPass() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(forgetSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('api/auth/recuperar-senha/', data);

      toast.success(response.data.message);
      navigate('/login');
      reset();
    } catch (e) {
      if (e.response) {
        return toast.error(e.response.data.error);
      }

      return toast.error('Não foi possível conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid = (validationErrors) => {
    Object.values(validationErrors).forEach((e) => {
      toast.error(e.message);
    });
  };

  return (
    <forg.Background>
      <forg.ContainerLogo />

      <forg.TitleContainer>
        <forg.Title>Esqueceu a sua senha?</forg.Title>
        <forg.Subtitle>Valide os campos abaixo</forg.Subtitle>
      </forg.TitleContainer>

      <forg.ContainerForm>
        <forg.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
        >
          <forg.InputEmail
            type="email"
            placeholder="Digite o seu e-mail"
            {...register('email')}
          />
          <forg.InputSenha
            type="password"
            placeholder="Digite a nova senha"
            {...register('senha')}
          />
          <forg.InputConfirmar
            type="password"
            placeholder="Confirme a nova senha"
            {...register('confirmar_senha')}
          />

          <forg.ButtonSubmit disable={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </forg.ButtonSubmit>
        </forg.Form>

        <forg.InformationContainer>
          <forg.Informations onClick={() => navigate('/login')}>
            Deseja voltar? <span>Clique aqui</span>
          </forg.Informations>
        </forg.InformationContainer>
      </forg.ContainerForm>
    </forg.Background>
  );
}
