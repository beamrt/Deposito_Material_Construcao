import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';

import * as rel from './styled';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { toast } from 'react-toastify';

export default function Relatorios() {
  const [menuAberto, setMenuAberto] = useState(null);

  const handleToggleMenu = (nomeRelatorio) => {
    if (menuAberto === nomeRelatorio) {
      setMenuAberto(null);
    } else {
      setMenuAberto(nomeRelatorio);
    }
  };

  const handleExport = (relatorio, formato) => {
    toast.success(
      `O relatório de ${relatorio} em ${formato} está sendo extraído...`,
    );
    setMenuAberto(null);
  };

  const dashKPIS = [
    {
      id: 1,
      title: 'Total de Vendas',
      content: 'R$ 120.000,00',
    },
    {
      id: 2,
      title: 'Total Produtos Vendidos',
      content: '45',
    },
    {
      id: 3,
      title: 'Quantidade de Pedidos',
      content: '32',
    },
    {
      id: 4,
      title: 'Ticket Médio',
      content: 'R$ 342,50',
    },
  ];

  const arrayIcons = [
    {
      id: 1,
      icon: <FaFile className="estoque" />,
      name: 'Estoque',
    },
    {
      id: 2,
      icon: <FaCartArrowDown className="vendas" />,
      name: 'Vendas',
    },
    {
      id: 3,
      icon: <FaUsers className="users" />,
      name: 'Usuários',
    },
    {
      id: 4,
      icon: <FaStore className="filiais" />,
      name: 'Filiais',
    },
    {
      id: 5,
      icon: <FaUser className="forn" />,
      name: 'Fornecedores',
    },
    {
      id: 6,
      icon: <FaProductHunt className="prod" />,
      name: 'Produtos',
    },
    {
      id: 7,
      icon: <FaMoneyBillWave className="fin" />,
      name: 'Financeiro',
    },
    {
      id: 8,
      icon: <MdOutlineInventory className="move" />,
      name: 'Movimentações',
    },
  ];

  return (
    <>
      <Header />
      <Sidebar />

      <rel.ContainerTitle>
        <rel.Title>Relatórios</rel.Title>
        <rel.Subtitle>
          Gere e acompanhe relatórios pertinentes ao seu sistema.
        </rel.Subtitle>
      </rel.ContainerTitle>

      <rel.ContainerKPIS>
        {dashKPIS.map((kpi) => (
          <rel.KPIS key={kpi.id}>
            <rel.TitleKPI>{kpi.title}</rel.TitleKPI>
            <span>{kpi.content}</span>
          </rel.KPIS>
        ))}
      </rel.ContainerKPIS>

      <rel.ContainerTitleFilter>
        <rel.TitleFilter>Filtros</rel.TitleFilter>
      </rel.ContainerTitleFilter>
      <rel.ContainerFilter>
        <rel.ContainerLabel>
          <rel.Label>Período</rel.Label>
          <rel.FilterDates>
            <rel.Input type="date" placeholder="Ex: 16/06/2026" />
            <rel.Input type="date" placeholder="Ex: 26/06/2026" />
          </rel.FilterDates>
        </rel.ContainerLabel>
        <rel.ContainerLabel>
          <rel.Label>Comparar com (Opcional)</rel.Label>
          <rel.FilterDates>
            <rel.Input type="date" />
          </rel.FilterDates>
        </rel.ContainerLabel>
        <rel.ContainerLabel>
          <rel.Label>Fornecedor</rel.Label>
          <rel.FilterDates>
            <rel.Input type="text" placeholder="Fornecedor" />
          </rel.FilterDates>
        </rel.ContainerLabel>
      </rel.ContainerFilter>

      <rel.ContainerIcons>
        {arrayIcons.map((ic) => (
          <rel.DivIcon key={ic.id} onClick={() => handleToggleMenu(ic.name)}>
            <rel.Icon>{ic.icon}</rel.Icon>
            <rel.NameRelatorio>{ic.name}</rel.NameRelatorio>

            {menuAberto === ic.name && (
              <rel.ExportMenu onClick={(e) => e.stopPropagation()}>
                <rel.ExportOption onClick={() => handleExport(ic.name, '.CSV')}>
                  Gerar .CSV
                </rel.ExportOption>
                <rel.ExportOption onClick={() => handleExport(ic.name, 'PDF')}>
                  Gerar PDF
                </rel.ExportOption>
              </rel.ExportMenu>
            )}
          </rel.DivIcon>
        ))}
      </rel.ContainerIcons>
    </>
  );
}
