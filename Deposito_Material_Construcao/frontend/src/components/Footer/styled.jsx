import styled from 'styled-components';

export const DivFooter = styled.footer`
  width: ${(props) => (props.$isDashboard ? 'calc(100% - 90px)' : '100%')};
  margin-left: ${(props) => (props.$isDashboard ? '90px' : '0')};
  position: absolute;
  bottom: 0;
  left: 0;
  height: 280px;
  background: #002e58;
  background: linear-gradient(
    to top,
    rgba(0, 46, 88, 1) 0%,
    rgba(0, 99, 190, 1) 100%
  );
  border-top: 2px solid #d9d9d9;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
`;

export const DivTop = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  height: 70%;
  align-items: center;
  padding: 10px;
  position: relative;
`;

export const Cards = styled.div`
  width: 100%;
  height: 100%;
  color: #d9d9d9;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;

  .WrapperIcons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    transition: all 0.3s ease;

    .wpp,
    .git,
    .link {
      color: #df6c01;
      font-size: 30px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

export const DivBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  padding: 10px;
`;

export const Copywrigth = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #d9d9d9;
  font-size: 16px;
`;

export const WrapperInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding-right: 20px;
`;

export const Info = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-style: normal;
  color: #d9d9d9;
  font-size: 16px;
`;

export const WrapperInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 5px;
`;

export const Logo = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  width: 100%;
`;

export const Information = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  font-style: normal;
  font-size: 15px;
`;

export const UnorderedList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  font-style: normal;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #df6c01;
  }
`;

export const LineCenter = styled.div`
  position: absolute;
  height: 2px;
  background: #d9d9d9;
  width: 90%;
  bottom: -20px;
  right: 100px;
  opacity: 0.5;
`;
