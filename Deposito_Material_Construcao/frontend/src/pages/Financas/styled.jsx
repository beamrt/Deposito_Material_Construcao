import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  margin-bottom: 15px;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.15);
`;

export const ContainerKPIS = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin-left: 9%;
  min-height: 200px;
  padding: 20px 30px 30px 30px;
  border: 1px solid #df6c01;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 30px;
  background: #fffff0;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.15);
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
`;

export const FluxoTitleSection = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #002e58;

  grid-column: 1 / -1;
  margin-bottom: 10px;
`;

export const FluxoCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 12px;
  min-height: 120px;
  background: ${({ $bgColor }) => $bgColor || '#fff'};
  border: 2px solid ${({ $color }) => $color || '#d9d9d9'};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  animation: ${slideUp} 0.5s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  opacity: 0;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0px 10px 20px ${({ $color }) => $color}40;
  }

  &::after {
    content: '${({ $operator }) => $operator || ''}';
    position: absolute;
    right: -28px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    font-weight: 800;
    color: #002e58;
    font-family: 'Poppins', sans-serif;
  }
`;

export const FluxoHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const FluxoLabel = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #252525;
`;

export const FluxoBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const FluxoValue = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #4a4a4a;
`;

export const FluxoIconWrapper = styled.div`
  font-size: 32px;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
`;
