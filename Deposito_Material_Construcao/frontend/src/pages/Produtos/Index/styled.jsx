import styled from 'styled-components';

export const ContainerTitle = styled.div`
  width: 750px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 120px auto 10px;
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

export const DivContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  border: 1px solid #df6e0199;
  border-radius: 14px;
  width: 85%;
  margin-left: 9%;
  height: 130px;
  box-shadow: 8px 10px 10px rgba(0, 0, 0, 0.1);
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px;
`;

export const DivCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

export const DivLabel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-left: 90px;
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  color: #252525;
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

  &:focus {
    border-color: #df6e01;
  }
`;

export const DivButton = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  font-weight: 600;
  font-style: normal;
  border-radius: 12px;
  color: #252525;
  cursor: pointer;
  margin-top: 23px;
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

export const DivButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 14px;
  padding: 10px;
  width: 85%;
  margin-left: 9%;
  gap: 20px;
  margin-top: 20px;
`;

export const ButtonAdd = styled.button`
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

export const DivButtonOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 400px;
`;

export const Subtitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  white-space: nowrap;
`;

export const ContainerTable = styled.div`
  border-radius: 14px;
  width: 85%;
  margin-left: 9%;
  gap: 20px;
  margin-top: 5px;
  background: #fffff0;
  border: 1px solid #004787;
  height: 450px;
  overflow: hidden;
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

export const ContainerExport = styled.div`
  position: absolute;
  bottom: 20px;
  right: 120px;
`;

export const ButtonExport = styled.button`
  background: #04325b;
  background: linear-gradient(
    90deg,
    rgba(4, 50, 91, 1) 0%,
    rgba(2, 70, 130, 1) 75%,
    rgba(5, 100, 185, 1) 100%
  );
  border: none;
  width: 150px;
  border: 1px solid #d9d9d9;
  padding: 8px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  border-radius: 6px;
  color: #fffff0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.97);
    border-color: #df6e0199;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .edit,
  .eye,
  .delete {
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
