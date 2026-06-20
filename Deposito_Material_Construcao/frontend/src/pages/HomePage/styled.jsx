import styled from 'styled-components';

export const Background = styled.div`
  min-height: 100vh;
  height: 150vh;
`;

export const DivNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 40px auto;
  width: 1000px;
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  width: 90%;
  height: 75px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 6px 10px 12px rgba(0, 0, 0, 0.3);
`;

export const Unorderedlist = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export const List = styled.li`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: ${(props) => (props.$isActive ? '#fffff0' : '#252525')};
  list-style: none;
  font-size: 20px;
  padding: 5px 15px;
  border: 2px solid ${(props) => (props.$isActive ? '#004787' : '#d9d9d9')};
  border-radius: 22px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: ${(props) => (props.$isActive ? '#DF6C01' : 'transparent')};
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const DivTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  flex-direction: column;
  gap: 27px;
`;

export const Title = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  color: #252525;
  font-size: 32px;
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

export const DivSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SubtitleUser = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #002e58;
  font-size: 29px;

  &.sub {
    font-size: 17px;
    font-weight: 300;
  }
`;

export const DivBoxes = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 1600px;
  gap: 40px;
  height: 390px;
  margin: 30px auto;
  padding: 10px;

  &:hover > div {
    opacity: 0.5;
  }
`;

export const Boxes = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #df6c01;
  border-radius: 12px;
  gap: 35px;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &&:hover {
    transform: translateY(-5px) translateX(5px);
    opacity: 1;
  }

  .Relat,
  .Dash,
  .Box,
  .Settings {
    font-size: 95px;
    color: #df6c01;
  }

  p {
    color: rgba(0, 0, 0, 0.7);
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 27px;
  }
`;

export const SecondDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 1600px;
  height: 390px;
  gap: 40px;
  padding: 10px;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  border: 2px solid #df6c01;
  width: 45%;
  height: 250px;
  box-shadow: 8px 10px 12px rgba(0, 0, 0, 0.3);
  position: relative;
  background: #fff4e6;
`;

export const DivMiniTitle = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0%;
`;

export const MiniTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 27px;
  color: #002e58;

  &.Sub-mini-title {
    font-size: 19px;
    color: #002e58;
    font-weight: 500;
  }
`;

export const Divinformation = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #df6c01;
  border-radius: 17px;
  height: 120px;
  margin: 0 auto;
  gap: 10px;
  margin-top: 30px;
  background: #fffff0;
`;
