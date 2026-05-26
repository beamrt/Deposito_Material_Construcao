import * as forg from './styled';
import { useNavigate } from 'react-router';

export default function ForgotPass() {
  const navigate = useNavigate();

  return (
    <forg.Background>
      <forg.ContainerLogo />

      <forg.TitleContainer>
        <forg.Title>Esqueceu a sua senha?</forg.Title>
        <forg.Subtitle>Valide os campos abaixo</forg.Subtitle>
      </forg.TitleContainer>

      <forg.ContainerForm>
        <forg.Form>
          <forg.InputSenha type="password" placeholder="Digite a nova senha" />
          <forg.InputConfirmar
            type="password"
            placeholder="Confirme a nova senha"
          />

          <forg.ButtonSubmit>Enviar</forg.ButtonSubmit>
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
