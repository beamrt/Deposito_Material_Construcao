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

export default function GraficoSituacaoEstoque() {
  const series = [150, 45, 12];

  const options = {
    chart: {
      id: 'situacao-estoque',
    },
    labels: ['Estoque Alto', 'Estoque Baixo', 'Esgotado'],
    colors: ['#004787', '#df6c01', '#d32f2f'],

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
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
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
          return val + ' itens nesta situação';
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: 'Poppins, sans-serif',
              color: '#4a4a4a',
            },
            value: {
              show: true,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              color: '#00e258',
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Cadastrado',
              color: '#4a4a4a',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Status Geral do Estoque</ChartTitle>

      <Chart options={options} series={series} type="donut" height={380} />
    </ChartCard>
  );
}
