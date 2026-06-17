import { FaFilter } from 'react-icons/fa';

import * as fin from './styled';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import GraficoMetodoPagamentos from '../../components/Charts/Financas/BarChartPagamentos';
import GraficoLucroMensal from '../../components/Charts/Financas/AgroupedBarLucro';

export default function Financas() {
  return (
    <>
      <Header />
      <Sidebar />

      <fin.ContainerTitle>
        <fin.Title>Gestão Financeira</fin.Title>
        <fin.Subtitle>Controle as finanças da sua empresa.</fin.Subtitle>
      </fin.ContainerTitle>

      <fin.ContainerFilter>
        <fin.ContainerLabel>
          <fin.Label>Período</fin.Label>
          <fin.FilterDates>
            <fin.Input type="date" />
            <fin.Input type="date" />
          </fin.FilterDates>
        </fin.ContainerLabel>
        <fin.ContainerLabel>
          <fin.Label>Forma de Pagamento</fin.Label>
          <fin.FilterDates>
            <fin.Select>
              <option selected disabled>
                Todas
              </option>
            </fin.Select>
          </fin.FilterDates>
        </fin.ContainerLabel>
        <fin.ContainerLabel>
          <fin.Label>Empresa</fin.Label>
          <fin.FilterDates>
            <fin.Select>
              <option selected disabled>
                Filiais
              </option>
            </fin.Select>
          </fin.FilterDates>
        </fin.ContainerLabel>
        <fin.ButtonClear>
          Limpar Filtros <FaFilter className="filter" />
        </fin.ButtonClear>
      </fin.ContainerFilter>

      <fin.ContainerChartsTop>
        <fin.Charts>
          <GraficoMetodoPagamentos />
        </fin.Charts>
        <fin.Charts>
          <GraficoLucroMensal />
        </fin.Charts>
      </fin.ContainerChartsTop>
    </>
  );
}
