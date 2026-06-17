import styled from 'styled-components';

export const ContainerTitle = styled.div`
  width: 750px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 90px auto 10px;
  position: relative;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 35px;
  text-transform: uppercase;
  background-image: linear-gradient(
    to right,
    #002e58 4%,
    #004788 15%,
    #00509a 39%,
    #0063be 72%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-repeat: no-repeat;
`;

export const Subtitle = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #252525;
  font-size: 18px;
`;

export const ContainerFilter = styled.div`
  width: 75%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 12px;
  border: 1px solid #df6c01;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  margin-left: 14.5%;
  gap: 20px;
  padding: 10px;
`;

export const FilterDates = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

export const ContainerLabel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: #252525;
`;

export const Select = styled.select`
  width: 80%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: italic;

  &:focus {
    border-color: #df6e01;
  }
`;

export const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: italic;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    border-color: #df6e01;
  }
`;

export const ButtonClear = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fffff0;
  border: none;
  width: 80%;
  border: 1px solid #d9d9d9;
  padding: 12px;
  font-size: 17px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  border-radius: 12px;
  color: #252525;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
    border-color: #df6e0199;
  }

  .filter {
    color: #df6e0199;
    font-size: 20px;
  }
`;

export const ContainerChartsTop = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 85%;
  margin-left: 9%;
  padding: 5px;
  margin-top: 30px;
  height: 400px;
  grid-template-columns: repeat(2, 1fr);
`;

export const Charts = styled.div`
  width: 100%;
  height: 100%;
  background: #fffff0;
  border: 1px solid #df6c01;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.05);
`;

export const ContainerLineChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin-left: 9%;
  padding: 5px;
  height: 400px;
  border: 1px solid #df6c01;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 30px;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.15);
`;
