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

export default function GraficoEstoque() {
  const series = [450, 320, 210, 120];

  const options = {
    chart: {
      id: 'categorias-estoque',
    },

    labels: ['Construção', 'Acabamento', 'Pintura', 'Ferramentas'],
    colors: ['#002e58', '#004787', '#df6c01', '#e67e00'],

    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        colors: ['#fffff0'],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      labels: {
        colors: '#252525',
      },
    },
    tooltip: {
      theme: 'light',
      style: {
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
      },
      y: {
        formatter: function (val) {
          return val + ' produtos em estoque';
        },
      },
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Distribuição do Estoque</ChartTitle>

      <Chart options={options} series={series} type="pie" height={395} />
    </ChartCard>
  );
}
