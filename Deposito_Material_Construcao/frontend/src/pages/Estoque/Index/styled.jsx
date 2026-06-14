import styled from 'styled-components';

export const ContainerTitle = styled.div`
  width: 750px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 100px auto 10px;
  position: relative;
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

export const DivButtonsTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  height: 100px;
  margin-left: 10%;
  margin-top: 30px;
  padding: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 450px;
  height: 100%;
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
  min-width: 210px;
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

export const OrderedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 450px;
  height: 100%;
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
  outline: none;

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
  gap: 20px;

  &.order {
    justify-content: center;
    align-items: center;
  }
`;

export const DivSelects = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const DivCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  color: #252525;
  white-space: nowrap;
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
  margin-top: 20px;

  &:focus {
    border-color: #df6e01;
  }
`;

export const DivSearch = styled.div`
  position: absolute;
  top: 28px;
  right: 40px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  .search {
    font-size: 20px;
    color: #df6c01;
    cursor: pointer;
  }

  &.searchAdd {
    top: 25px;
    right: 50px;
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
  margin-top: 20px;

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
  .delete,
  .truck {
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

export const BackgroundOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 999;
`;

export const DivAdd = styled.div`
  position: fixed;
  right: 0;
  width: 500px;
  height: 100vh;
  padding: 10px;
  z-index: 999;
`;

export const DivClose = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  left: 20px;

  .close {
    color: #df6c01;
    font-size: 35px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .closeX {
    color: #df6c01;
    font-size: 35px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: rotate(170deg);
    }
  }
`;

export const DivCloseX = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 20px;

  .closeX {
    color: #df6c01;
    font-size: 45px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: rotate(170deg);
    }
  }
`;

export const AddWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 2px solid #df6c01;
  border-radius: 12px;
  background: #fffff0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const DivTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  margin: 0 auto;
`;

export const TitleAdd = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
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

export const SearchProduct = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  gap: 10px;

  span {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-style: normal;
    color: #df6c01;
    font-size: 20px;
  }
`;

export const SelectOrder = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ButtonCancel = styled.button`
  background: #7f1d1d;
  background: linear-gradient(90deg, #8b0000 0%, #c62828 50%, #ef5350 100%);
  border: none;
  min-width: 210px;
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

export const DivButtonsAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 350px;
`;

export const DivBox = styled.div`
  width: 600px;
  min-height: 500px;
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
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
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

export const FormEdit = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 40px;
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

export const DivLabelInput = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;

  label {
    color: #df6c01;
  }
`;

export const InputEdit = styled.input`
  width: 100%;
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

export const DivBoxEdit = styled.div`
  width: 850px;
  min-height: 350px;
  border: 1px solid #004787;
  border-radius: 12px;
  margin: 270px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fffff0;
  box-shadow: 8px 12px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  flex-direction: column;
  padding: 10px;
`;
