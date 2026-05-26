import React from 'react';
import { useNavigate } from 'react-router';
import * as log from './styled';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();

  return (
    <log.Background>
      <log.ContainerLogo />

      <log.TitleContainer>
        <log.Title>Olá, Seja bem-vindo(a)!</log.Title>
        <log.Subtitle>Faça login para continuar</log.Subtitle>
      </log.TitleContainer>

      <log.ContainerForm>
        <log.Form>
          <log.InputEmail type="email" placeholder="E-mail" />
          <log.InputSenha type="password" placeholder="Senha" />

          <log.ButtonSubmit>Entrar</log.ButtonSubmit>
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
