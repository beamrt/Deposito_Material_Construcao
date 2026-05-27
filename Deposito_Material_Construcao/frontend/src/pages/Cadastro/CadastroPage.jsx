import React from 'react';
import { useNavigate } from 'react-router';
import * as cad from './styled';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();

  return (
    <cad.Background>
      <cad.ContainerLogo />

      <cad.TitleContainer>
        <cad.Title>Vamos criar a sua conta?</cad.Title>
        <cad.Subtitle>Preencha as informações abaixo</cad.Subtitle>
      </cad.TitleContainer>

      <cad.ContainerForm>
        <cad.Form>
          <cad.InputNome type="text" placeholder="Nome Completo" />
          <cad.InputEmail type="email" placeholder="E-mail" />
          <cad.InputSenha type="password" placeholder="Senha" />
          <cad.InputConfirmar type="password" placeholder="Confirmar Senha" />

          <cad.ButtonSubmit>Cadastrar</cad.ButtonSubmit>
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
