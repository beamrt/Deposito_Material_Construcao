import {
  FaArrowDown,
  FaArrowUp,
  FaCashRegister,
  FaDollarSign,
  FaFilter,
} from 'react-icons/fa';

import * as fin from './styled';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import GraficoMetodoPagamentos from '../../components/Charts/Financas/BarChartPagamentos';
import GraficoLucroMensal from '../../components/Charts/Financas/AgroupedBarLucro';
import GraficoComparativoFiliais from '../../components/Charts/Financas/LineChartFilial';

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

      <fin.ContainerLineChart>
        <GraficoComparativoFiliais />
      </fin.ContainerLineChart>

      <fin.ContainerKPIS>
        <fin.FluxoTitleSection>
          Fluxo de Caixa do Período Selecionado
        </fin.FluxoTitleSection>

        <fin.FluxoCard
          $color="#1abc12"
          $bgcolor="linear-gradient(135deg, #fffff 0%, #f0fdf4 100%)"
          $operator="+"
          $delay="0.1s"
        >
          <fin.FluxoHeader>
            <fin.FluxoLabel>Saldo Inicial</fin.FluxoLabel>
          </fin.FluxoHeader>
          <fin.FluxoBody>
            <fin.FluxoValue>R$ 10.245,84</fin.FluxoValue>
            <fin.FluxoIconWrapper $color="#1abc12">
              <FaCashRegister />
            </fin.FluxoIconWrapper>
          </fin.FluxoBody>
        </fin.FluxoCard>

        <fin.FluxoCard
          $color="#1ABC12"
          $bgColor="linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)"
          $operator="-"
          $delay="0.2s"
        >
          <fin.FluxoHeader>
            <fin.FluxoLabel>Entradas</fin.FluxoLabel>
          </fin.FluxoHeader>
          <fin.FluxoBody>
            <fin.FluxoValue>R$ 42.650,00</fin.FluxoValue>
            <fin.FluxoIconWrapper $color="#1abc12">
              <FaArrowUp />
            </fin.FluxoIconWrapper>
          </fin.FluxoBody>
        </fin.FluxoCard>

        <fin.FluxoCard
          $color="#d32f2f"
          $bgColor="linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)"
          $operator="="
          $delay="0.3s"
        >
          <fin.FluxoHeader>
            <fin.FluxoLabel>Saidas</fin.FluxoLabel>
          </fin.FluxoHeader>
          <fin.FluxoBody>
            <fin.FluxoValue>R$ 2.400,00</fin.FluxoValue>
            <fin.FluxoIconWrapper $color="#d32f2f">
              <FaArrowDown />
            </fin.FluxoIconWrapper>
          </fin.FluxoBody>
        </fin.FluxoCard>

        <fin.FluxoCard
          $color="#0063be"
          $bgColor="linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)"
          $delay="0.4s"
        >
          <fin.FluxoHeader>
            <fin.FluxoLabel>Saldo Final</fin.FluxoLabel>
          </fin.FluxoHeader>
          <fin.FluxoBody>
            <fin.FluxoValue>R$ 50.495,84</fin.FluxoValue>
            <fin.FluxoIconWrapper $color="#0063be">
              <FaDollarSign />
            </fin.FluxoIconWrapper>
          </fin.FluxoBody>
        </fin.FluxoCard>
      </fin.ContainerKPIS>
    </>
  );
}
