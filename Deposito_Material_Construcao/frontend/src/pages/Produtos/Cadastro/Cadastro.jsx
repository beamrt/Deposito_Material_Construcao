import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as cad from './styled';

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Sidebar />

      <cad.Background />

      <cad.ContainerTitle>
        <cad.Title>Cadastro de Produtos</cad.Title>
        <cad.ContainerArrow>
          <FaArrowLeft
            className="arrow"
            onClick={() => navigate('/constrular/produtos/index')}
          />
        </cad.ContainerArrow>
      </cad.ContainerTitle>

      <cad.ContainerForm>
        <cad.Form>
          <cad.ContainerLabel>
            <cad.Label>Nome</cad.Label>
            <cad.Input type="text" />
          </cad.ContainerLabel>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Categoria</cad.Label>
              <cad.Select />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Lucro</cad.Label>
              <cad.Select />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Venda</cad.Label>
              <cad.Select />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Tipo</cad.Label>
              <cad.Select />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Unidade</cad.Label>
              <cad.Input />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerLabel>
            <cad.Obs />
          </cad.ContainerLabel>

          <cad.DivButton>
            <cad.Button>Cadastrar</cad.Button>
          </cad.DivButton>
        </cad.Form>
      </cad.ContainerForm>
    </>
  );
}
