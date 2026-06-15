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

export default function GraficoTicketMedio() {
  const series = [
    {
      name: 'Ticket Médio',
      data: [185.5, 210.2, 195.0, 240.8],
    },
  ];

  const options = {
    chart: {
      id: 'ticket-medio-semanal',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        vertical: true,
        borderRadius: 6,
        barHeight: '50%',
        distributed: true,
      },
    },
    colors: ['#002e58', '#004787', '#0063be', '#df6c01'],

    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return 'R$ ' + val.toFixed(2).replace('.', ',');
      },
      style: {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        colors: ['#fffff0'],
      },
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
      labels: {
        style: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          colors: '#252525',
        },
        formatter: function (val) {
          return 'R$ ' + val.toFixed(2).replace('.', ',');
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
          return 'R$ ' + val.toFixed(2).replace('.', ',');
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <ChartCard>
      <ChartTitle>Ticket Médio Semanal</ChartTitle>

      <Chart options={options} series={series} type="bar" height={380} />
    </ChartCard>
  );
}
