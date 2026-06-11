import styled from 'styled-components';
import bgConstruction from '../../../assets/images/construction.svg';

export const Background = styled.div`
  width: 450px;
  height: 450px;
  background-image: url(${bgConstruction});
  background-repeat: no-repeat;
  position: absolute;
  bottom: 0;
  right: 0;
  pointer-events: none;
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 550px;
  height: 100px;
  margin: 90px auto 0;
  position: relative;
`;

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 40px;
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

export const ContainerArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 15px;
  left: -130px;

  .arrow {
    color: #df6c01;
    font-size: 35px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const ContainerForm = styled.div`
  width: 750px;
  min-height: 550px;
  border: 1px solid #004787;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  padding: 10px;
  height: 100%;
  gap: 30px;
`;

export const ContainerLabel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 19px;
  color: #252525;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #df6c01;
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #0063be;
  }
`;

export const ContainerWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 20px;
`;

export const Obs = styled.textarea`
  width: 100%;
  border: 1px solid #df6c01;
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  height: 100px;
  outline: none;

  &:focus {
    border-color: #0063be;
  }
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid #df6c01;
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #0063be;
  }
`;

export const DivButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  margin: 10px auto;
`;

export const Button = styled.button`
  gap: 20px;
  background: #04325b;
  background: linear-gradient(
    90deg,
    rgba(4, 50, 91, 1) 0%,
    rgba(2, 70, 130, 1) 75%,
    rgba(5, 100, 185, 1) 100%
  );
  border: none;
  width: 210px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 12px;
  color: #fffff0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.97);
    border-color: #df6e0199;
  }
`;
