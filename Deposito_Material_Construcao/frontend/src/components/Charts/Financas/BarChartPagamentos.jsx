import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

export const ChartCard = styled.div`
  background: #fffff0;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 100%;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.05);
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #002e58;
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
  flex-shrink: 0;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
`;

export default function GraficoMetodoPagamentos() {
  const series = [
    {
      name: 'Transações',
      data: [450, 380, 120, 45],
    },
  ];

  const options = {
    chart: {
      id: 'metodos-pagamentos',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '55%',
        distributed: true,
      },
    },
    colors: ['#f473d4', '#1cdccd', '#1abc12', '#c566d4'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + ' tx';
      },
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        colors: ['#fffff0'],
        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ['Pix', 'Cartão', 'Dinheiro', 'Outros'],
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          colors: '#4a4a4a',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          colors: '#252525',
        },
      },
    },
    tooltip: {
      theme: 'light',
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
      },
      y: {
        formatter: function (val) {
          return val + ' transações registradas';
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Métodos de Pagamento</ChartTitle>

      <ChartWrapper>
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      </ChartWrapper>
    </ChartCard>
  );
}
