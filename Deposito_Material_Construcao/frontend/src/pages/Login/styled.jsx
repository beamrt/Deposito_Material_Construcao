import styled from 'styled-components';
import backgroundSvg from '../../assets/images/background.svg';

export const Background = styled.div`
  background-image: url(${backgroundSvg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
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
  border: 2px solid #252525;
  padding: 5px;
`;
