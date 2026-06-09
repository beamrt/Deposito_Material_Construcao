import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
  const [abaAtiva, setAbaAtiva] = useState('home');

  return (
    <side.ContainerSide>
      <side.DivIcon />
      <side.MenuItem
        $isActive={abaAtiva === 'home'}
        onClick={() => {
          setAbaAtiva('home');
          navigate('/constrular');
        }}
      >
        <FaHome className="home" />
        <side.MenuText>Home</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'chart'}
        onClick={() => setAbaAtiva('chart')}
      >
        <FaChartLine className="chart" />
        <side.MenuText>Dashboard</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'drop'}
        onClick={() => setAbaAtiva('drop')}
      >
        <FaDropbox className="drop" />
        <side.MenuText>Estoque</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'sett'}
        onClick={() => setAbaAtiva('sett')}
      >
        <TbSettingsCog className="sett" />
        <side.MenuText>Configurações</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'file'}
        onClick={() => setAbaAtiva('file')}
      >
        <FaFile className="file" />
        <side.MenuText>Relatórios</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'cart'}
        onClick={() => setAbaAtiva('cart')}
      >
        <FaCartArrowDown className="cart" />
        <side.MenuText>Vendas</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'money'}
        onClick={() => setAbaAtiva('money')}
      >
        <FaMoneyBill className="money" />
        <side.MenuText>Finanças</side.MenuText>
      </side.MenuItem>
      <side.MenuItem
        $isActive={abaAtiva === 'product'}
        onClick={() => setAbaAtiva('product')}
      >
        <FaProductHunt className="product" />
        <side.MenuText>Produtos</side.MenuText>
      </side.MenuItem>
    </side.ContainerSide>
  );
}
