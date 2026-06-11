import { useNavigate } from 'react-router';
import { FaFilter } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { confirmAlert } from 'react-confirm-alert';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as prod from './styled';

export default function Index() {
  const navigate = useNavigate();
  const [boxAtiva, setBoxAtiva] = useState('');

  const handleConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <prod.ContainerExclude>
            <prod.DivTitleEdit>
              <prod.TitleEdit>Excluir Produto</prod.TitleEdit>
            </prod.DivTitleEdit>
            <prod.TitleExclude>
              Tem certeza que deseja excluir este produto?
            </prod.TitleExclude>
            <prod.ContainerAlerts>
              <prod.TitleExclude className="exclude">
                Atenção!
              </prod.TitleExclude>
              <prod.SubtitleExclude>
                Essa ação não pode ser desfeita.
              </prod.SubtitleExclude>
            </prod.ContainerAlerts>

            <prod.ButtonAlerts>
              <prod.ButtonAdd onClick={onClose}>Confirmar</prod.ButtonAdd>
              <prod.ButtonCancel onClick={onClose}>Cancelar</prod.ButtonCancel>
            </prod.ButtonAlerts>
          </prod.ContainerExclude>
        );
      },
    });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <prod.ContainerTitle>
        <prod.Title>Gerenciamento de Produtos</prod.Title>
      </prod.ContainerTitle>

      <prod.DivContainer>
        <prod.DivCards>
          <prod.DivLabel>
            <prod.Label>Categoria</prod.Label>
          </prod.DivLabel>
          <prod.Select>
            <option>Primeira opção</option>
          </prod.Select>
        </prod.DivCards>
        <prod.DivCards>
          <prod.DivLabel>
            <prod.Label>Tipo</prod.Label>
          </prod.DivLabel>
          <prod.Select>
            <option>Primeira opção</option>
          </prod.Select>
        </prod.DivCards>
        <prod.DivCards>
          <prod.DivLabel>
            <prod.Label>Pesquisar Produto</prod.Label>
          </prod.DivLabel>
          <prod.Input />
        </prod.DivCards>
        <prod.DivButton>
          <prod.Button>
            Limpar Filtros <FaFilter className="filter" />
          </prod.Button>
        </prod.DivButton>
      </prod.DivContainer>

      <prod.DivButtons>
        <prod.ButtonAdd
          onClick={() => navigate('/constrular/produtos/cadastro')}
        >
          Cadastrar Produto
        </prod.ButtonAdd>
        <prod.DivButtonOrder>
          <prod.Subtitle>Ordenar por:</prod.Subtitle>
          <prod.Select>
            <option>Mais recente</option>
          </prod.Select>
        </prod.DivButtonOrder>
      </prod.DivButtons>

      <prod.ContainerTable>
        <prod.StyledTable>
          <prod.TableHead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </prod.TableHead>

          <prod.TableBody>
            <tr>
              <td>Cimento CP-II</td>

              <td>
                <prod.CategoryBadge
                  style={{
                    background: '#CFE3FF',
                  }}
                >
                  Construção
                </prod.CategoryBadge>
              </td>

              <td>Material</td>

              <td>R$ 42,90</td>

              <prod.DescriptionCell>
                Cimento portland composto CP-II, uso geral em obras e
                construções
              </prod.DescriptionCell>

              <td>
                <prod.IconWrapper>
                  <FaEdit
                    className="edit"
                    onClick={() => setBoxAtiva('active')}
                  />
                  <FaEye className="eye" />
                  <MdDelete
                    className="delete"
                    onClick={() => handleConfirm()}
                  />
                </prod.IconWrapper>
              </td>
            </tr>
          </prod.TableBody>
        </prod.StyledTable>

        <prod.TableFooter>
          <span>Mostrando 0 a 0 de 0 Produtos</span>

          <prod.Pagination>
            <prod.PaginationArrow></prod.PaginationArrow>

            <prod.PageButton active>1</prod.PageButton>

            <prod.PaginationArrow></prod.PaginationArrow>
          </prod.Pagination>
        </prod.TableFooter>
        <prod.ContainerExport>
          <prod.ButtonExport>Exportar</prod.ButtonExport>
        </prod.ContainerExport>
      </prod.ContainerTable>

      {boxAtiva === 'active' && (
        <>
          <prod.BackgroundOpacity onClick={() => setBoxAtiva('')}>
            <prod.DivBox onClick={(e) => e.stopPropagation()}>
              <prod.DivClose>
                <IoMdCloseCircle
                  className="close"
                  onClick={() => setBoxAtiva('')}
                />
              </prod.DivClose>

              <prod.DivTitleEdit>
                <prod.TitleEdit>Editar Produto</prod.TitleEdit>
              </prod.DivTitleEdit>

              <prod.Form>
                <prod.ContainerLabel>
                  <prod.LabelEdit>Nome</prod.LabelEdit>
                  <prod.InputEdit />
                </prod.ContainerLabel>

                <prod.ContainerWrapper>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Categoria</prod.LabelEdit>
                    <prod.SelectEdit />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Preço de Compra</prod.LabelEdit>
                    <prod.InputEdit />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Preço de Venda</prod.LabelEdit>
                    <prod.InputEdit />
                  </prod.ContainerLabel>
                </prod.ContainerWrapper>

                <prod.ContainerWrapper>
                  <prod.ContainerLabel>
                    <prod.Label>Tipo</prod.Label>
                    <prod.SelectEdit />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.Label>Unidade</prod.Label>
                    <prod.InputEdit />
                  </prod.ContainerLabel>
                </prod.ContainerWrapper>

                <prod.ContainerLabel>
                  <prod.Label>Descrição</prod.Label>
                  <prod.Obs />
                </prod.ContainerLabel>

                <prod.DivButtonEdit>
                  <prod.ButtonEdit>Atualizar</prod.ButtonEdit>
                  <prod.ButtonCancel onClick={() => setBoxAtiva('')}>
                    Cancelar
                  </prod.ButtonCancel>
                </prod.DivButtonEdit>
              </prod.Form>
            </prod.DivBox>
          </prod.BackgroundOpacity>
        </>
      )}
    </>
  );
}
