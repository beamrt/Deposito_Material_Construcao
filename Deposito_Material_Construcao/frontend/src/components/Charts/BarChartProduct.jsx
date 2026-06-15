import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

export const ChartCard = styled.div`
  background: #fffff0;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  width: 100%;
  padding-top: 10px;
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

export default function GraficoProdutos() {
  const series = [
    {
      name: 'Unidades Vendidas',
      data: [420, 360, 290, 210, 150],
    },
  ];

  const options = {
    chart: {
      id: 'produtos-mais-vendidos',
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
    colors: ['#002e58', '#004787', '#0063be', '#df6c01', '#e67e00'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + ' un';
      },
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        colors: ['#fffff0'],
      },
    },
    xaxis: {
      categories: [
        'Cimento CP-II',
        'Argamassa AC-III',
        'Tijolo Baiano',
        'Telha Romana',
        'Tubo PVC',
      ],
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
          fontWeigth: 500,
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
          return val + ' unidades vendidas neste mês';
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Produtos Mais Vendidos</ChartTitle>

      <Chart options={options} series={series} type="bar" height={400} />
    </ChartCard>
  );
}
