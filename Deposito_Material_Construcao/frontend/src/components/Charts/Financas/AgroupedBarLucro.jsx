import React from 'react';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

export const ChartCard = styled.div`
  background: #fffff0;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 20px;
  width: 98%;
  height: 98%;
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

export default function GraficoLucroMensal() {
  const series = [
    {
      name: 'Lucro Bruto',
      data: [35000, 42000, 38500, 49000],
    },
    {
      name: 'Lucro Líquido',
      data: [14500, 18200, 15100, 22000],
    },
  ];

  const options = {
    chart: {
      id: 'lucro-bruto-liquido',
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
    colors: ['#004787', '#16aea3'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          colors: '#4a4a4a',
          fontWeight: 500,
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
          colors: '#252525',
        },
        formatter: function (val) {
          return 'R$' + val.toLocaleString('pt-BR');
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
            'R$' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
          );
        },
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
      <ChartTitle>Lucro Bruto x Lucro Líquido</ChartTitle>

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
