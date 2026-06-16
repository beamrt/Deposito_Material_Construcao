import styled from 'styled-components';
import bgConstruction from '../../assets/images/backgroundConstruction.png';
import bg404 from '../../assets/images/Frame_3.svg';

export const Background = styled.div`
  background-image: url(${bgConstruction});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: calc(100vh - 45px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ContainerImage = styled.div`
  width: 1250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bg404});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 860px;
`;
