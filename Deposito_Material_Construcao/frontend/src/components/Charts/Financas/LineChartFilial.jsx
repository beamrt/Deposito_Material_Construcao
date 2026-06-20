import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

export const ChartCard = styled.div`
  background: #fffff0;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.05);
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

export default function GraficoComparativoFiliais() {
  const series = [
    {
      name: 'Matriz (Constrular)',
      data: [85000, 92000, 88000, 95000, 102000, 98000, 105000, 112000, 120000],
    },
    {
      name: 'Filial Araras',
      data: [45000, 48000, 46000, 52000, 55000, 53000, 58000, 62000, 67000],
    },
    {
      name: 'Filial Limeira',
      data: [38000, 41000, 39000, 44000, 47000, 45000, 49000, 53000, 56000],
    },
  ];

  const options = {
    chart: {
      id: 'comparativo-filiais',
      type: 'line',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 10,
        left: 0,
        blur: 5,
        opacity: 0.15,
      },
    },

    colors: ['#002e58', '#df6c01', '#16aea3'],

    stroke: {
      curve: 'smooth',
      width: 3,
    },

    markers: {
      size: 4,
      colors: ['#252525'],
      strokeWidth: 2,
      hover: {
        size: 7,
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
      shared: true,
      intersect: false,
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
        show: true, // Mostra a bolinha da cor correspondente dentro do balão
      },
    },

    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500,
      labels: {
        colors: '#252525',
      },
      markers: {
        radius: 12,
      },
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Comparativo de Lucro Bruto (Filiais)</ChartTitle>

      <ChartWrapper>
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height="100%"
        />
      </ChartWrapper>
    </ChartCard>
  );
}
