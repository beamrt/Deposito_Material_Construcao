import styled from 'styled-components';

export const DivTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  margin: 80px auto 20px;
  flex-direction: column;
  gap: 10px;
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
  width: 85%;
  margin-left: 10%;
  display: grid;
  align-items: center;
  justify-content: center;
  height: 200px;
  border-radius: 12px;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 30px;
  grid-template-columns: repeat(3, 1fr);
  gap: 100px;
  border: 1px solid #d9d9d9;
`;

export const KPIS = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #df6e0199;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  padding: 5px;
  gap: 10px;
`;

export const TitleKPI = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 22px;
  color: #004787;
`;

export const DivWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-template-columns: auto 1fr;
  gap: 10px;
`;

export const DivIcon = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .users,
  .usersInativos,
  .filial {
    font-size: 60px;
    color: #004787;
  }
`;

export const DivWrapperKPI = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  span {
    color: #df6c01;
    font-size: 40px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-style: normal;
  }
`;

export const DivContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  border: 1px solid #df6e0199;
  border-radius: 14px;
  width: 85%;
  margin-left: 10%;
  margin-top: 15px;
  height: 100px;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.1);
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
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

export const DivCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

export const DivSearch = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  top: 15px;
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

export const Button = styled.button`
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
  font-weight: 300;
  font-style: italic;
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

export const ContainerTable = styled.div`
  border-radius: 14px;
  width: 85%;
  margin-left: 10%;
  gap: 20px;
  margin-top: 15px;
  background: #fffff0;
  border: 1px solid #004787;
  height: 450px;
  overflow: hidden;
  margin-bottom: 30px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Poppins', sans-serif;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid #004787;

  th {
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 600;
    color: #4a4a4a;
    text-align: left;
    background: #f8f8f8;
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #d9d9d9;
    transition: background 0.2s ease;

    &:hover {
      background: #fafafa;
    }
  }

  td {
    padding: 10px 16px;
    font-size: 14px;
    color: #4a4a4a;
    vertical-align: middle;
    text-align: center;
  }
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 115px;
  height: 30px;

  padding: 0 12px;

  border-radius: 8px;

  font-size: 13px;
  font-weight: 500;

  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export const DescriptionCell = styled.td`
  max-width: 280px;
  line-height: 1.35;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
    color: #e67e00;
    transition: 0.2s;

    &:hover {
      opacity: 0.75;
    }
  }
`;

export const TableFooter = styled.div`
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  border-top: 1px solid #004787;

  background: #fff;

  font-size: 14px;
  color: #666;

  span {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PageButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #bfc8d4;
  background: ${({ active }) => (active ? '#004787' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#4a4a4a')};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  font-size: 14px;
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    border-color: #004787;
  }
`;

export const PaginationArrow = styled.button`
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #7a7a7a;
  cursor: pointer;

  &:hover {
    color: #004787;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .edit,
  .eye,
  .delete,
  .inative {
    color: #df6c01;
    font-size: 22px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1) rotate(12deg);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const DivBox = styled.div`
  min-width: 550px;
  min-height: 400px;
  border: 1px solid #004787;
  border-radius: 12px;
  margin: 200px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  box-shadow: 8px 12px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;

export const DivClose = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 20px;

  .close {
    color: #df6c01;
    font-size: 45px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: rotate(170deg);
    }
  }
`;

export const BackgroundOpacity = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999;
`;

export const DivTitleEdit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin: 0 auto;
  flex-direction: column;

  &.category {
    margin-top: 60px;
  }
`;

export const TitleEdit = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 30px;
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

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 100%;
  padding: 10px;
  gap: 20px;
`;

export const InputEdit = styled.input`
  width: 100%;
  border: 1px solid #df6c01;
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  outline: none;
  font-size: 18px;

  &:focus {
    border-color: #0063be;
  }
`;

export const SelectEdit = styled.select`
  width: 100%;
  border: 1px solid #df6c01;
  padding: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 8px;
  outline: none;
  font-size: 18px;
  color: #7d7d7d;

  &:focus {
    border-color: #0063be;
  }
`;

export const DivButtonEdit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin: 10px auto;
  gap: 30px;
`;

export const ButtonEdit = styled.button`
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

export const ButtonCancel = styled.button`
  gap: 20px;
  background: #7f1d1d;
  background: linear-gradient(90deg, #8b0000 0%, #c62828 50%, #ef5350 100%);
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

export const ContainerExclude = styled.div`
  width: 650px;
  min-height: 350px;
  background: #fffff0;
  border: 1px solid #04325b;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const TitleExclude = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #252525;
  font-size: 25px;

  &.exclude {
    color: #f42b2bb2;
  }
`;

export const SubtitleExclude = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #252525;
  font-size: 17px;
`;

export const ContainerAlerts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonAlerts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 450px;
`;
