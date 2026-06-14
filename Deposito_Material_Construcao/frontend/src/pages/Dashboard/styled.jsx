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

export const ContainerFilters = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 75%;
  height: 75px;
  margin-left: 15%;
  background: #fffff0;
  border: 1px solid #df6c01;
  border-radius: 12px;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 5px;
`;

export const DivCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

export const DivSearch = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  top: 8px;
  right: 40px;

  .search {
    font-size: 20px;
    color: #df6c01;
    cursor: pointer;
  }
`;

export const DivSelects = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 20px;

  span {
    color: #df6c01;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: italic;
  }
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

export const ContainerKPIS = styled.div`
  width: 90%;
  margin-left: 7.5%;
  display: grid;
  align-items: center;
  justify-content: center;
  height: 150px;
  margin-top: 10px;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 10px;
`;

export const KPIS = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  border: 2px solid #df6c01;
  border-radius: 12px;
  gap: 5px;

  span {
    color: #df6c01;
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  .subtitle {
    color: #16aea3;
    font-size: 15px;
  }
`;

export const TitleKPI = styled.h3`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #004787;
`;

export const ContainerCharts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 20px;
  width: 90%;
  margin-left: 7.5%;
  padding: 10px;
  padding-bottom: 300px;
`;

export const Charts = styled.div`
  width: 100%;
  height: 450px;
  background: #fffff0;
  border: 2px solid #df6c01;
  border-radius: 12px;
  box-shadow: 8px 12px 12px rgba(0, 0, 0, 0.1);
`;

export const LineCharts = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  align-items: center;
  grid-column: 1 / -1;
  background: #fffff0;
  border: 2px solid #df6c01;
  border-radius: 12px;
  box-shadow: 8px 12px 12px rgba(0, 0, 0, 0.1);
`;
