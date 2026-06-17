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

export const ContainerKPIS = styled.div`
  width: 90%;
  margin-left: 7.5%;
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  margin-top: 10px;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px;
`;

export const KPIS = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  gap: 8px;
  background: #fffff0;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }

  span {
    color: #df6c01;
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-style: normal;
    line-height: 1.1;
  }

  .subtitle {
    color: #16aea3;
    font-size: 15px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    background: rgba(22, 174, 163, 0.15);
    padding: 4px 8px;
    border-radius: 6px;
    display: inline-block;
    margin-top: 4px;
  }
`;

export const TitleKPI = styled.h3`
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #004787;
`;

export const ContainerFilter = styled.div`
  width: 75%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 12px;
  border: 1px solid #df6c01;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.1);
  margin: 5px auto;
  gap: 20px;
  padding: 10px;
`;

export const ContainerTitleFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 0;
  width: 350px;
  height: 50px;
`;

export const TitleFilter = styled.h3`
  font-size: 25px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: #df6c01;
  text-transform: uppercase;
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

export const ContainerIcons = styled.div`
  width: 90%;
  margin-left: 7.5%;
  height: 550px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fffff0;
  border: 1px solid #004787;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  padding: 20px;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover > div {
    opacity: 0.5;
  }
`;

export const DivIcon = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #df6c01;
  background: #fffff0;
  border-radius: 14px;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  &&:hover {
    transform: translateY(-5px);
    opacity: 1;
  }
`;

export const Icon = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  .estoque,
  .vendas,
  .users,
  .filiais,
  .forn,
  .prod,
  .fin,
  .move {
    color: #df601c;
    width: 100%;
    height: 100%;
  }
`;

export const NameRelatorio = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #df6c01;
  font-size: 25px;
`;

export const ExportMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #002e58;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.4);
  z-index: 10;
  width: 85%;
`;

export const ExportOption = styled.button`
  background: #fffff0;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #df6c01;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #df6c01;
    color: #fffff0;
    transform: scale(1.05);
  }
`;
