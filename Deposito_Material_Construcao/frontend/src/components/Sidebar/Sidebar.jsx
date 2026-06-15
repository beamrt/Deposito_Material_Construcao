import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FaHome } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';
import { FaDropbox } from 'react-icons/fa';
import { TbSettingsCog } from 'react-icons/tb';
import { FaFile } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaMoneyBill } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';

import * as side from './styled';

export default function Sidebar() {
  const navigate = useNavigate();
  // const [abaAtiva, setAbaAtiva] = useState('');
  const location = useLocation();

  const abaAtiva = location.pathname;

  return (
    <side.ContainerSide>
      <side.DivIcon />
      <side.MenuItem
        $isActive={abaAtiva === 'home'}
        onClick={() => {
          navigate('/constrular');
        }}
      >
        <FaHome className="home" />
        <side.MenuText>Home</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva.includes('/constrular/dashboard')}
        onClick={() => navigate('/constrular/dashboard')}
      >
        <FaChartLine className="chart" />
        <side.MenuText>Dashboard</side.MenuText>
      </side.MenuItem>
      <side.MenuItem $isActive={abaAtiva === 'drop'}>
        <FaDropbox className="drop" />
        <side.MenuText>Estoque</side.MenuText>
      </side.MenuItem>
      <side.MenuItem $isActive={abaAtiva === 'sett'}>
        <TbSettingsCog className="sett" />
        <side.MenuText>Configurações</side.MenuText>
      </side.MenuItem>
      <side.MenuItem $isActive={abaAtiva === 'file'}>
        <FaFile className="file" />
        <side.MenuText>Relatórios</side.MenuText>
      </side.MenuItem>
      <side.MenuItem $isActive={abaAtiva === 'cart'}>
        <FaCartArrowDown className="cart" />
        <side.MenuText>Vendas</side.MenuText>
      </side.MenuItem>
      <side.MenuItem $isActive={abaAtiva === 'money'}>
        <FaMoneyBill className="money" />
        <side.MenuText>Finanças</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva.includes('/constrular/produtos/')}
        onClick={() => navigate('/constrular/produtos/index')}
      >
        <FaProductHunt className="product" />
        <side.MenuText>Produtos</side.MenuText>
      </side.MenuItem>
    </side.ContainerSide>
  );
}
