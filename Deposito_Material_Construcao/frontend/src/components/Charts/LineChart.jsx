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
`;

export const ChartTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #002e58;
  font-size: 20px;
  margin-bottom: 15px;
  text-align: center;
`;

export default function GraficoEvolucaoVendas() {
  const series = [
    {
      name: 'Faturamento',
      data: [35000, 38200, 36500, 42000, 48500, 46000, 52000, 58000, 64500],
    },
  ];

  const options = {
    chart: {
      id: 'evolucao-vendas',
      type: 'line',
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 14,
        left: 0,
        blur: 8,
        opacity: 0.5,
      },
    },
    colors: ['#004787'],
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    markers: {
      size: 5,
      colors: ['#fffff0'],
      strokeColors: '#df6c01',
      strokeWidth: 3,
      hover: {
        size: 8,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
      ],
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          colors: '#4a4a4a',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          colors: '#252525',
        },
        formatter: function (val) {
          return 'R$ ' + val.toLocaleString('pt-BR');
        },
      },
    },

    grid: {
      borderColor: '#d9d9d9',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
      },
      y: {
        formatter: function (val) {
          return (
            'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
          );
        },
      },
      marker: {
        show: false,
      },
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Evolução de Vendas: (Últimos Trimestres)</ChartTitle>

      <Chart options={options} series={series} type="line" height={380} />
    </ChartCard>
  );
}
