import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import * as cad from './styled';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import axios from '../../services/axios';
import { userSchema } from '../../services/validator';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post('api/usuarios/', data);

      toast.success(response.data.message);
      navigate('/login');
      reset();
    } catch (e) {
      if (e.response) {
        toast.error(e.response.data.error);
        return;
      }

      return toast.error('Não foi possível se conectar com o servidor');
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
    <cad.Background>
      <cad.ContainerLogo />

      <cad.TitleContainer>
        <cad.Title>Vamos criar a sua conta?</cad.Title>
        <cad.Subtitle>Preencha as informações abaixo</cad.Subtitle>
      </cad.TitleContainer>

      <cad.ContainerForm>
        <cad.Form
          method="POST"
          action=""
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          noValidate
        >
          <cad.InputNome
            type="text"
            placeholder="Nome Completo"
            {...register('nome')}
          />
          <cad.InputEmail
            type="text"
            placeholder="E-mail"
            {...register('email')}
          />
          <cad.InputCPF type="text" placeholder="CPF" {...register('cpf')} />
          <cad.InputSenha
            type="password"
            placeholder="Senha"
            {...register('senha')}
          />
          <cad.InputConfirmar
            type="password"
            placeholder="Confirmar Senha"
            {...register('confirmacao_senha')}
          />

          <cad.ButtonSubmit disabled={isLoading}>
            {isLoading ? 'Carregando...' : 'Cadastrar'}
          </cad.ButtonSubmit>
        </cad.Form>

        <cad.InformationContainer>
          <cad.Informations onClick={() => navigate('/login')}>
            Já possui login? <span>Entrar</span>
          </cad.Informations>
        </cad.InformationContainer>

        <cad.WrapperIcons>
          <FaGoogle className="google" />
          <FaApple className="apple" />
          <FaFacebook className="face" />
        </cad.WrapperIcons>
      </cad.ContainerForm>
    </cad.Background>
  );
}
