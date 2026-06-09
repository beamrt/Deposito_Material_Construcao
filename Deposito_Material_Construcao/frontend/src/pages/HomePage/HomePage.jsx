import { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaDropbox } from 'react-icons/fa';
import { TbSettingsCog } from 'react-icons/tb';

import * as home from './styled';
import Footer from '../../components/Footer/Footer';

export default function HomePage() {
  const [abaAtiva, setAbaAtiva] = useState('Home');
  const arrayBoxes = [
    {
      id: 1,
      icon: <FaFile className="Relat" />,
      title: 'Relatório',
    },

    {
      id: 2,
      icon: <FaChartLine className="Dash" />,
      title: 'Dashboard',
    },
    {
      id: 3,
      icon: <FaDropbox className="Box" />,
      title: 'Estoque',
    },
    {
      id: 4,
      icon: <TbSettingsCog className="Settings" />,
      title: 'Configurações',
    },
  ];

  return (
    <>
      <home.Background>
        <home.Footer>
          <home.Logo>Construshop</home.Logo>
          <home.Subtitle>Matriz - Constrular</home.Subtitle>
        </home.Footer>

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
                onClick={() => setAbaAtiva('Dashboard')}
              >
                Dashboard
              </home.List>
              <home.List
                $isActive={abaAtiva === 'Estoque'}
                onClick={() => setAbaAtiva('Estoque')}
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
                onClick={() => setAbaAtiva('Produtos')}
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
