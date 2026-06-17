import { FaFile } from 'react-icons/fa';
import { FaCartArrowDown } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa6';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';

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

export default arrayIcons;
