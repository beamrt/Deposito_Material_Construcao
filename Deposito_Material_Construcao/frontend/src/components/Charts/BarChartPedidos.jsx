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

export default function GraficoPedidosDiarios() {
  const series = [
    {
      name: 'Total de Pedidos',
      data: [34, 45, 23, 56, 78, 89, 30],
    },
  ];

  const options = {
    chart: {
      id: 'pedidos-diarios',
      toolbal: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columWidth: '45%',
        borderRadius: 6,
      },
    },
    colors: ['#004787'],

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['#0063be'],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },

    dataLabels: {
      enabled: true,
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 600,
        colors: ['#002e58'],
      },
      offsetY: -20,
    },
    xaxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
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
          colors: '#252525',
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
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
          return val + ' pedidos fechados';
        },
      },
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Volume de Pedidos Diários</ChartTitle>

      <Chart options={options} series={series} type="bar" height={380} />
    </ChartCard>
  );
}
