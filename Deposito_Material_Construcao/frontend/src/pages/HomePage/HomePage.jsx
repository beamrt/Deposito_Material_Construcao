import { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaDropbox } from 'react-icons/fa';
import { TbSettingsCog } from 'react-icons/tb';
import { useNavigate } from 'react-router';

import * as home from './styled';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function HomePage() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('Home');
  const arrayBoxes = [
    {
      id: 1,
      icon: (
        <FaFile
          className="Relat"
          onClick={() => navigate('/constrular/relatorios')}
        />
      ),
      title: 'Relatório',
    },

    {
      id: 2,
      icon: (
        <FaChartLine
          className="Dash"
          onClick={() => navigate('/constrular/dashboard')}
        />
      ),
      title: 'Dashboard',
    },
    {
      id: 3,
      icon: (
        <FaDropbox
          className="Box"
          onClick={() => navigate('/constrular/estoque')}
        />
      ),
      title: 'Estoque',
    },
    {
      id: 4,
      icon: (
        <TbSettingsCog
          className="Settings"
          onClick={() => navigate('/constrular/usuarios/index')}
        />
      ),
      title: 'Configurações',
    },
  ];

  return (
    <>
      <home.Background>
        <Header />

        <home.DivNav>
          <home.Navbar>
            <home.Unorderedlist>
              <home.List
                $isActive={abaAtiva === 'Home'}
                onClick={() => setAbaAtiva('Home')}
              >
                Home
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Dashboard'}
                onClick={() => {
                  setAbaAtiva('Dashboard');
                  navigate('/constrular/dashboard');
                }}
              >
                Dashboard
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Estoque'}
                onClick={() => {
                  setAbaAtiva('Estoque');
                  navigate('/constrular/estoque');
                }}
              >
                Estoque
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Venda'}
                onClick={() => setAbaAtiva('Venda')}
              >
                Venda
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Produtos'}
                onClick={() =>
                  setAbaAtiva('Produtos') &
                  navigate('/constrular/produtos/index')
                }
              >
                Produtos
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Finanças'}
                onClick={() => setAbaAtiva('Finanças')}
              >
                Finanças
              </home.List>
            </home.Unorderedlist>
          </home.Navbar>
        </home.DivNav>

        <home.DivTitle>
          <home.Title>Gerencie sua loja de forma simples</home.Title>

          <home.DivSubtitle>
            <home.SubtitleUser>Olá, Usuário!</home.SubtitleUser>
            <home.SubtitleUser className="sub">Administrador</home.SubtitleUser>
          </home.DivSubtitle>
        </home.DivTitle>

        <home.DivBoxes>
          {arrayBoxes.map((card) => (
            <home.Boxes key={card.id}>
              {card.icon}
              <p>{card.title}</p>
            </home.Boxes>
          ))}
        </home.DivBoxes>

        <home.SecondDiv>
          <home.Card>
            <home.DivMiniTitle>
              <home.MiniTitle>Atividades Recentes</home.MiniTitle>

              <home.Divinformation>
                <home.MiniTitle className="Sub-mini-title">
                  Novo produto cadastrado
                </home.MiniTitle>
                <home.MiniTitle className="Sub-mini-title">
                  Estoque atualizado
                </home.MiniTitle>
              </home.Divinformation>
            </home.DivMiniTitle>
          </home.Card>

          <home.Card>
            <home.DivMiniTitle>
              <home.MiniTitle>Alertas!</home.MiniTitle>

              <home.Divinformation>
                <home.MiniTitle className="Sub-mini-title">
                  Cimento CP-II estoque baixo
                </home.MiniTitle>
                <home.MiniTitle className="Sub-mini-title">
                  Venda cancelada recentemente
                </home.MiniTitle>
              </home.Divinformation>
            </home.DivMiniTitle>
          </home.Card>
        </home.SecondDiv>

        <Footer />
      </home.Background>
    </>
  );
}
