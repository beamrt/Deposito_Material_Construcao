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

export default function GraficoMovimentacao() {
  const series = [
    {
      name: 'Vendas (Saídas)',
      data: [120, 150, 90, 180],
    },
    {
      name: 'Transferências (Filiais)',
      data: [80, 110, 130, 95],
    },
  ];

  const options = {
    chart: {
      id: 'movimentacao-semanal',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    colors: ['#df6c01', '#004787'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          colors: '#4a4a4a',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Quantidade de Produtos',
        style: {
          fontFamily: 'Poppins, sans-serif',
          color: '#4a4a4a',
          fontWeight: 500,
        },
      },
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          colors: '#252525',
        },
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
          return val + ' unidades';
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
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
      <ChartTitle>Comparativo: Vendas x Transferências</ChartTitle>

      <Chart options={options} series={series} type="bar" height={380} />
    </ChartCard>
  );
}
