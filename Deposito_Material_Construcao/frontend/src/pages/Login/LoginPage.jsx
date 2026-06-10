import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as log from './styled';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { loginSchema } from '../../services/validator';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lojas, setLojas] = useState([]);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('api/lojas/index');
        setLojas(response.data.all);
        console.log(response.data.all);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const handleFormSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post('api/auth/login/', data);

      toast.success(response.data.message);
      navigate('/');
      reset();
    } catch (e) {
      if (e.response) {
        return toast.error(e.response.data.error);
      }

      return toast.error('Não foi possível conectar no servidor', e);
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
    <log.Background>
      <log.ContainerLogo />

      <log.TitleContainer>
        <log.Title>Olá, Seja bem-vindo(a)!</log.Title>
        <log.Subtitle>Faça login para continuar</log.Subtitle>
      </log.TitleContainer>

      <log.ContainerForm>
        <log.Form
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          method="POST"
          action=""
          noValidate
        >
          <log.InputEmail
            type="email"
            placeholder="E-mail"
            {...register('email')}
          />
          <log.InputSenha
            type="password"
            placeholder="Senha"
            {...register('senha')}
          />

          <log.Select {...register('id_loja')} defaultValue="">
            <option disabled value="">
              Selecione uma unidade
            </option>
            {lojas ? (
              lojas.map((loj) => (
                <option key={loj.id_loja} value={loj.id_loja}>
                  {loj.nome}
                </option>
              ))
            ) : (
              <option>Nenhuma loja cadastrada</option>
            )}
          </log.Select>

          <log.ButtonSubmit disabled={isLoading}>
            {isLoading ? 'Acessando...' : 'Entrar'}
          </log.ButtonSubmit>
        </log.Form>

        <log.InformationContainer>
          <log.Informations onClick={() => navigate('/cadastro')}>
            É novo por aqui? <span>Cadastre-se</span>
          </log.Informations>
          <log.Informations onClick={() => navigate('/login/forgot')}>
            Esqueceu a sua senha? Clique <span>AQUI</span>
          </log.Informations>
        </log.InformationContainer>

        <log.WrapperIcons>
          <FaGoogle className="google" />
          <FaApple className="apple" />
          <FaFacebook className="face" />
        </log.WrapperIcons>
      </log.ContainerForm>
    </log.Background>
  );
}
