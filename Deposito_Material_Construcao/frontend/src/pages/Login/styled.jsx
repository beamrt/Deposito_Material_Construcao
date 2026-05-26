import styled from 'styled-components';
import backgroundSvg from '../../assets/images/background.svg';
import logo from '../../assets/images/logoazul.png';

export const Background = styled.div`
  background-image: url(${backgroundSvg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 800px;
`;

export const Title = styled.h1`
  font-size: 60px;
  color: #fff4e6;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  margin-top: 40px;
  text-align: center;
`;

export const Subtitle = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 27px;
  color: #fff4e6;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  margin-top: 7px;
  text-align: center;
  opacity: 0.7;
  background: rgba(0, 0, 0, 0.7);
  width: 500px;
  border-radius: 20px;
  border: 2px solid #df6c01;
  padding: 5px;
`;

export const ContainerLogo = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  transform: translateX(-50%, -50%);
  top: 37%;
  left: 42.5%;
  background-image: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ContainerForm = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 650px;
  margin: 60px 50px;
  padding: 10px;
`;

export const Form = styled.form`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const InputEmail = styled.input`
  width: 60%;
  padding: 12px;
  border: 2px solid #ccc;
  background: #d9d9d9;
  border-radius: 7px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 15px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #df6c01;
  }
`;

export const InputSenha = styled.input`
  width: 60%;
  padding: 12px;
  border: 2px solid #ccc;
  background: #d9d9d9;
  border-radius: 7px;
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #df6c01;
  }
`;

export const ButtonSubmit = styled.button`
  padding: 10px;
  width: 170px;
  border: 1px solid #d9d9d9;
  background: #0f766e;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #fff4e6;
  border-radius: 8px;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-left: 10px;
  box-shadow: 6px 8px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05);
    filter: brightness(90%);
  }
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100px;
  margin-left: 10px;
  gap: 20px;
  margin-top: 20px;
`;

export const Informations = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  font-style: normal;
  color: #fff4e6;

  span {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-style: normal;
    color: #df6c01;
    cursor: pointer;
    transition: all 0.3s ease-in;

    &:hover {
      transform: scale(1.06);
    }
  }
`;

export const WrapperIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 50%;
  padding: 20px;
  margin-top: 5px;
  margin-left: 10px;
  border-top: 1px solid #fffff0;

  .google,
  .apple,
  .face {
    color: #fff4e6;
    font-size: 50px;
    transition: all 0.2s ease-in;
    cursor: pointer;
    padding: 12px;
    border-radius: 50%;
    border: 1px solid #fffff0;

    &:hover {
      transform: scale(1.08);
    }
  }
`;
