import { FaFilter } from 'react-icons/fa';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as prod from './styled';

export default function Index() {
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
        <prod.ButtonAdd>Criar Produto</prod.ButtonAdd>
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
    </>
  );
}
