import styled from 'styled-components';

export const Footer = styled.div`
  width: 100%;
  background: #004787;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
`;

export const Logo = styled.h1`
  color: #fffff0;
  font-family: 'Montserrat', sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-size: 16px;
`;

export const Subtitle = styled.h3`
  color: #fffff0;
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  font-style: normal;
  font-size: 16px;
`;

export const DivIcon = styled.div`
  width: 10%;
  right: 40px;
  top: 115px;
  height: 75px;
  position: absolute;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;

  .logout,
  .user {
    font-size: 45px;
    color: #004787;
    cursor: pointer;
  }
`;
