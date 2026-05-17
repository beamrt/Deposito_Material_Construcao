import * as log from './styled';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';

export default function Login() {
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
          <log.InputSenha type="passoword" placeholder="Senha" />

          <log.ButtonSubmit>Entrar</log.ButtonSubmit>
        </log.Form>

        <log.InformationContainer>
          <log.Informations>
            É novo por aqui? <span>Cadastre-se</span>
          </log.Informations>
          <log.Informations>
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
