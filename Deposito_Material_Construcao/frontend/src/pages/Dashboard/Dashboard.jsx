import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';

import * as dash from './styled';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import React from 'react';

export default function Dashboard() {
  const dashKPIS = [
    {
      id: 1,
      title: 'Vendas Hoje',
      content: 'R$ 12.890,00',
      subtitle: '18% de ontem',
    },
    {
      id: 2,
      title: 'Produtos Cadastrados',
      content: '189',
    },
    {
      id: 3,
      title: 'Pedidos Hoje',
      content: '45',
    },
    {
      id: 4,
      title: 'Filiais Ativa',
      content: '2',
    },
    {
      id: 5,
      title: 'Funcionários Ativos',
      content: '21',
    },
  ];

  return (
    <>
      <Header />
      <Sidebar />

      <dash.ContainerTitle>
        <dash.Title>Dashboard</dash.Title>
        <dash.Subtitle>Aqui você encontra um resumo geral!</dash.Subtitle>
      </dash.ContainerTitle>

      <dash.ContainerFilters>
        <dash.DivCards>
          <dash.Input placeholder="Buscar produtos, estoque..." />
          <dash.DivSearch>
            <FaSearch className="search" />
          </dash.DivSearch>
        </dash.DivCards>
        <dash.DivCards>
          <dash.DivSelects>
            <dash.Select>
              <option selected disabled>
                13/06/2026
              </option>
            </dash.Select>
            <span>até</span>
            <dash.Select>
              <option selected disabled>
                20/06/2026
              </option>
            </dash.Select>
          </dash.DivSelects>
        </dash.DivCards>
        <dash.DivCards>
          <dash.DivSelects>
            <dash.Select>
              <option selected disabled>
                Filial
              </option>
            </dash.Select>
            <dash.ButtonClear>
              Limpar <FaFilter className="filter" />{' '}
            </dash.ButtonClear>
          </dash.DivSelects>
        </dash.DivCards>
      </dash.ContainerFilters>

      <dash.ContainerKPIS>
        {dashKPIS.map((board) => (
          <dash.KPIS key={board.id}>
            <dash.TitleKPI>{board.title}</dash.TitleKPI>
            <span>{board.content}</span>
            {board.subtitle && (
              <span className="subtitle">{board.subtitle}</span>
            )}
          </dash.KPIS>
        ))}
      </dash.ContainerKPIS>

      <dash.ContainerCharts>
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.Charts />
        <dash.LineCharts />
      </dash.ContainerCharts>

      <Footer $isDashboard={true} />
    </>
  );
}
