import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';

import * as dash from './styled';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import React, { useState, useEffect } from 'react'; 

import GraficoProdutos from '../../components/Charts/BarChartProduct';
import GraficoEstoque from '../../components/Charts/PizzaChartEstoque';
import GraficoSituacaoEstoque from '../../components/Charts/DonutChartEstoque';
import GraficoTicketMedio from '../../components/Charts/BarChartTicket';
import GraficoMovimentacao from '../../components/Charts/AgroupedBars';
import GraficoPedidosDiarios from '../../components/Charts/BarChartPedidos';
import GraficoEvolucaoVendas from '../../components/Charts/LineChart';

export default function Dashboard() {
  const [dadosAPI, setDadosAPI] = useState({
    faturamento_total: 0,
    total_produtos: 0, 
    total_pedidos: 0,
    filiais_ativas: 2, 
    funcionarios_ativos: 21 
  });

  useEffect(() => {
    async function buscarDadosKpis() {
      try {
        const resposta = await fetch('http://localhost:8000/api/kpis'); 
        if (resposta.ok) {
          const json = await resposta.json();
          setDadosAPI({
            faturamento_total: json.faturamento_total || 0,
            total_produtos: json.total_produtos || 207,
            total_pedidos: json.total_pedidos || 0,
            filiais_ativas: 2, 
            funcionarios_ativos: 21
          });
        }
      } catch (erro) {
        console.error('Erro ao buscar dados do Dashboard:', erro);
      }
    }

    buscarDadosKpis();
  }, []); 

  const dashKPIS = [
    {
      id: 1,
      title: 'Vendas Hoje',
      content: `R$ ${dadosAPI.faturamento_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      subtitle: 'Atualizado em tempo real',
    },
    {
      id: 2,
      title: 'Produtos Cadastrados',
      content: dadosAPI.total_produtos,
    },
    {
      id: 3,
      title: 'Pedidos Hoje',
      content: dadosAPI.total_pedidos,
    },
    {
      id: 4,
      title: 'Filiais Ativas',
      content: dadosAPI.filiais_ativas,
    },
    {
      id: 5,
      title: 'Funcionários Ativos',
      content: dadosAPI.funcionarios_ativos,
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
          <dash.Input placeholder="Buscar produtos, Estoque..." />
          <dash.DivSearch>
            <FaSearch className="search" />
          </dash.DivSearch>
        </dash.DivCards>
        <dash.DivCards>
          <dash.DivSelects>
            <dash.Select defaultValue="13/06/2026">
              <option disabled value="13/06/2026">
                13/06/2026
              </option>
            </dash.Select>
            <span>até</span>
            <dash.Select defaultValue="20/06/2026">
              <option disabled value="20/06/2026">
                20/06/2026
              </option>
            </dash.Select>
          </dash.DivSelects>
        </dash.DivCards>
        <dash.DivCards>
          <dash.DivSelects>
            <dash.Select defaultValue="Filial">
              <option disabled value="Filial">
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
        <dash.Charts>
          <GraficoProdutos />
        </dash.Charts>
        <dash.Charts>
          <GraficoEstoque />
        </dash.Charts>
        <dash.Charts>
          <GraficoSituacaoEstoque />
        </dash.Charts>
        <dash.Charts>
          <GraficoTicketMedio />
        </dash.Charts>
        <dash.Charts>
          <GraficoMovimentacao />
        </dash.Charts>
        <dash.Charts>
          <GraficoPedidosDiarios />
        </dash.Charts>
        <dash.LineCharts>
          <GraficoEvolucaoVendas />
        </dash.LineCharts>
      </dash.ContainerCharts>

      <Footer $isDashboard={true} />
    </>
  );
}