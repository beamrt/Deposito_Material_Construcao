import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

import * as estq from './styled';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';

export default function IndexEstoque() {
  const [boxAtiva, setBoxAtiva] = useState('');

  const handleConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <estq.ContainerExclude>
            <estq.DivTitle>
              <estq.TitleAdd>Excluir Produto</estq.TitleAdd>
            </estq.DivTitle>
            <estq.TitleExclude>
              Tem certeza que deseja excluir este produto?
            </estq.TitleExclude>
            <estq.ContainerAlerts>
              <estq.TitleExclude className="exclude">Atenção</estq.TitleExclude>
              <estq.SubtitleExclude>
                Essa ação não poderá ser desfeita
              </estq.SubtitleExclude>
            </estq.ContainerAlerts>
            <estq.ButtonAlerts>
              <estq.ButtonAdd onClick={onClose}>Excluir</estq.ButtonAdd>
              <estq.ButtonCancel onClick={onClose}>Cancelar</estq.ButtonCancel>
            </estq.ButtonAlerts>
          </estq.ContainerExclude>
        );
      },
    });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <estq.ContainerTitle>
        <estq.Title>Controle de Estoque</estq.Title>
        <estq.Subtitle>
          Acompanhe entradas, saídas e disponibilidade dos produtos em um só
          lugar.
        </estq.Subtitle>
      </estq.ContainerTitle>

      <estq.DivButtonsTop>
        <estq.Buttons>
          <estq.ButtonAdd onClick={() => setBoxAtiva('ModalAdd')}>
            Adicionar Produto
          </estq.ButtonAdd>
          <estq.ButtonAdd>Exportar CSV</estq.ButtonAdd>
        </estq.Buttons>
        <estq.OrderedDiv>
          <estq.DivLabel className="order">
            <estq.Label>Ordenar Por:</estq.Label>
            <estq.Select>
              <option selected>Maior Qtd</option>
            </estq.Select>
          </estq.DivLabel>
        </estq.OrderedDiv>
      </estq.DivButtonsTop>

      <estq.DivContainer>
        <estq.DivCards>
          <estq.DivSelects>
            <estq.DivLabel>
              <estq.Label>Categoria</estq.Label>
            </estq.DivLabel>
            <estq.Select />
          </estq.DivSelects>
          <estq.DivSelects>
            <estq.DivLabel>
              <estq.Label>Status</estq.Label>
            </estq.DivLabel>
            <estq.Select />
          </estq.DivSelects>
        </estq.DivCards>

        <estq.DivCards>
          <estq.Input placeholder="Buscar Produto" />
          <estq.DivSearch>
            <FaSearch className="search" />
          </estq.DivSearch>
        </estq.DivCards>

        <estq.DivCards>
          <estq.ButtonClear>
            Limpar Filtros <FaFilter className="filter" />
          </estq.ButtonClear>
        </estq.DivCards>
      </estq.DivContainer>

      <estq.ContainerTable>
        <estq.StyledTable>
          <estq.TableHead>
            <tr>
              <th>Produto</th>
              <th>Fornecedor</th>
              <th>Qnt. Atual</th>
              <th>Est. Mínimo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </estq.TableHead>

          <estq.TableBody>
            <tr>
              <td>Cimento CP-II</td>
              <td>GlobalCimento Distribuição</td>
              <td>25 un.</td>
              <td>10 un.</td>
              <td style={{ color: '#16AEA3' }}>Estável</td>
              <td>
                <estq.IconWrapper>
                  <FaEdit
                    className="edit"
                    onClick={() => setBoxAtiva('ModalEdit')}
                  />
                  <FaTruck
                    className="truck"
                    onClick={() => setBoxAtiva('ModalTransfer')}
                  />
                  <MdDelete
                    className="delete"
                    onClick={() => handleConfirm()}
                  />
                </estq.IconWrapper>
              </td>
            </tr>
          </estq.TableBody>
        </estq.StyledTable>
        <estq.TableFooter>
          <span>Mostrando 0 de 0 Produtos</span>

          <estq.Pagination>
            <estq.PaginationArrow>
              <IoIosArrowBack />
            </estq.PaginationArrow>

            <estq.PageButton active>1</estq.PageButton>

            <estq.PaginationArrow>
              <IoIosArrowForward />
            </estq.PaginationArrow>
          </estq.Pagination>
        </estq.TableFooter>
      </estq.ContainerTable>

      {boxAtiva === 'ModalAdd' && (
        <>
          <estq.BackgroundOpacity onClick={() => setBoxAtiva('')}>
            <estq.DivAdd onClick={(e) => e.stopPropagation()}>
              <estq.AddWrapper>
                <estq.DivClose>
                  <FaArrowLeft
                    className="close"
                    onClick={() => setBoxAtiva('')}
                  />
                </estq.DivClose>

                <estq.DivTitle>
                  <estq.TitleAdd>Adicionar Produto</estq.TitleAdd>
                </estq.DivTitle>

                <estq.SearchProduct>
                  <span>Produto</span>

                  <estq.SelectOrder>
                    <estq.Select>
                      <option selected disabled>
                        Inicia com
                      </option>
                    </estq.Select>
                    <estq.Select>
                      <option selected disabled>
                        Contém
                      </option>
                    </estq.Select>
                  </estq.SelectOrder>
                  <estq.InputWrapper>
                    <estq.Input placeholder="Buscar Produto" />
                    <estq.DivSearch className="searchAdd">
                      <FaSearch className="search" />
                    </estq.DivSearch>
                  </estq.InputWrapper>
                </estq.SearchProduct>

                <estq.SearchProduct>
                  <span>Fornecedor</span>

                  <estq.InputWrapper>
                    <estq.Input placeholder="Buscar Fornecedor" />
                    <estq.DivSearch className="searchAdd">
                      <FaSearch className="search" />
                    </estq.DivSearch>
                  </estq.InputWrapper>
                </estq.SearchProduct>

                <estq.SearchProduct>
                  <span>Quantidade</span>
                  <estq.SelectOrder>
                    <estq.Input type="number" />
                  </estq.SelectOrder>
                </estq.SearchProduct>
                <estq.SearchProduct>
                  <span>Estoque Mínimo</span>
                  <estq.SelectOrder>
                    <estq.Input type="number" />
                  </estq.SelectOrder>
                </estq.SearchProduct>

                <estq.DivButtonsAdd>
                  <estq.ButtonAdd>Salvar</estq.ButtonAdd>
                  <estq.ButtonCancel onClick={() => setBoxAtiva('')}>
                    Cancelar
                  </estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.AddWrapper>
            </estq.DivAdd>
          </estq.BackgroundOpacity>
        </>
      )}

      {boxAtiva === 'ModalTransfer' && (
        <>
          <estq.BackgroundOpacity onClick={() => setBoxAtiva('')}>
            <estq.DivBox onClick={(e) => e.stopPropagation()}>
              <estq.DivCloseX>
                <IoMdCloseCircle
                  className="closeX"
                  onClick={() => setBoxAtiva('')}
                />
              </estq.DivCloseX>

              <estq.DivTitle>
                <estq.TitleAdd>Transferir Produto</estq.TitleAdd>
              </estq.DivTitle>

              <estq.Form>
                <estq.Input placeholder="Nome do Produto" />
                <estq.Input placeholder="Filial" />
                <estq.Input type="number" placeholder="Quantidade" />

                <estq.DivButtonsAdd>
                  <estq.ButtonAdd>Transferir</estq.ButtonAdd>
                  <estq.ButtonCancel>Cancelar</estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.Form>
            </estq.DivBox>
          </estq.BackgroundOpacity>
        </>
      )}

      {boxAtiva === 'ModalEdit' && (
        <estq.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <estq.DivBoxEdit onClick={(e) => e.stopPropagation()}>
            <estq.DivCloseX>
              <IoMdCloseCircle
                className="closeX"
                onClick={() => setBoxAtiva('')}
              />
            </estq.DivCloseX>

            <estq.DivTitle>
              <estq.TitleAdd>Editar Estoque</estq.TitleAdd>
            </estq.DivTitle>

            <estq.Form>
              <estq.FormEdit>
                <estq.FormWrapper>
                  <estq.DivLabelInput>
                    <estq.Label>Fornecedor</estq.Label>
                    <estq.InputEdit />
                  </estq.DivLabelInput>
                  <estq.DivLabelInput>
                    <estq.Label>Quantidade</estq.Label>
                    <estq.InputEdit />
                  </estq.DivLabelInput>
                  <estq.DivLabelInput>
                    <estq.Label>Estoque Mínimo</estq.Label>
                    <estq.InputEdit />
                  </estq.DivLabelInput>
                </estq.FormWrapper>

                <estq.DivButtonsAdd>
                  <estq.ButtonAdd>Salvar</estq.ButtonAdd>
                  <estq.ButtonCancel>Cancelar</estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.FormEdit>
            </estq.Form>
          </estq.DivBoxEdit>
        </estq.BackgroundOpacity>
      )}
    </>
  );
}
