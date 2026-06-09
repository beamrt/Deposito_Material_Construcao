import styled from 'styled-components';
import Icon from '../../assets/images/logolaranja.png';

export const ContainerSide = styled.div`
  background: #002e58;
  height: 100vh;
  width: 90px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  padding: 20px 0 20px 16px;
  transition: all 0.5s ease-in-out;
  overflow: hidden;

  &:hover {
    width: 250px;

    span {
      opacity: 1;
      transition-delay: 0.2s;
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  width: 53px;
  padding: 10px;
  border: 1px solid ${(props) => (props.$isActive ? '#d9d9d9' : 'transparent')};
  border-radius: 12px;
  transition: all 0.2s ease-in;
  background: ${(props) =>
    props.$isActive ? 'rgba(0, 0, 0, 0.1)' : 'transparent'};

  .home,
  .chart,
  .drop,
  .sett,
  .file,
  .cart,
  .money,
  .product,
  .bars {
    color: #df6c01e5;
    font-size: 30px;
    cursor: pointer;
    min-width: 30px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid #d9d9d9;
    border-radius: 12px;
  }

  ${ContainerSide}:hover & {
    width: 200px;
    transition-delay: 0.1s;
  }
`;

export const MenuText = styled.span`
  color: #d9d9d9;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 300;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

export const DivIcon = styled.div`
  background-image: url(${Icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 2px;
  transition: all 0.2s ease-in-out;

  ${ContainerSide}:hover & {
    margin-left: 75px;
    transition-delay: 0.1s;
    width: 75px;
    height: 75px;
  }
`;
