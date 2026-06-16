import { FaUsers } from 'react-icons/fa';
import { FaUserClock } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { FaUserAltSlash } from 'react-icons/fa';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';

import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import * as users from './styled';

export default function IndexUsers() {
  const [boxAtiva, setBoxAtiva] = useState('');

  const handleConfirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <users.ContainerExclude>
            <users.DivTitleEdit>
              <users.TitleEdit>Excluir Usuário</users.TitleEdit>
            </users.DivTitleEdit>

            <users.TitleExclude>
              Tem certeza que deseja excluir este usuário?
            </users.TitleExclude>
            <users.ContainerAlerts>
              <users.TitleExclude className="exclude">
                Atenção
              </users.TitleExclude>
              <users.SubtitleExclude>
                Essa ação não poderá ser desfeita.
              </users.SubtitleExclude>
            </users.ContainerAlerts>
            <users.ButtonAlerts>
              <users.ButtonEdit onClick={onClose}>Excluir</users.ButtonEdit>
              <users.ButtonCancel onClick={onClose}>
                Cancelar
              </users.ButtonCancel>
            </users.ButtonAlerts>
          </users.ContainerExclude>
        );
      },
    });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <users.DivTitle>
        <users.Title>Gestão de Usuários</users.Title>
        <users.Subtitle>
          Cadastre, edite e gerencie os usuários que terão acesso ao sistema.
        </users.Subtitle>
      </users.DivTitle>

      <users.ContainerKPIS>
        <users.KPIS>
          <users.DivIcon>
            <FaUsers className="users" />
          </users.DivIcon>
          <users.DivWrapperKPI>
            <users.TitleKPI>Usuários Ativos</users.TitleKPI>
            <span>36</span>
            <users.Subtitle>Total de usuários ativos.</users.Subtitle>
          </users.DivWrapperKPI>
        </users.KPIS>
        <users.KPIS>
          <users.DivIcon>
            <FaUserClock className="usersInativos" />
          </users.DivIcon>
          <users.DivWrapperKPI>
            <users.TitleKPI>Usuários Inativos</users.TitleKPI>
            <span>5</span>
            <users.Subtitle>Total de usuários inativos.</users.Subtitle>
          </users.DivWrapperKPI>
        </users.KPIS>
        <users.KPIS>
          <users.DivIcon>
            <FaShop className="filial" />
          </users.DivIcon>
          <users.DivWrapperKPI>
            <users.TitleKPI>Filiais</users.TitleKPI>
            <span>2</span>
            <users.Subtitle>Cadastradas.</users.Subtitle>
          </users.DivWrapperKPI>
        </users.KPIS>
      </users.ContainerKPIS>

      <users.DivContainer>
        <users.DivCards>
          <users.Input placeholder="Pesquisar usuário" />
          <users.DivSearch>
            <FaSearch className="search" />
          </users.DivSearch>
        </users.DivCards>

        <users.DivSelects>
          <users.Button>Ordernar de A a Z</users.Button>
          <users.Select>
            <option>Status</option>
          </users.Select>
        </users.DivSelects>

        <users.DivCards>
          <users.ButtonClear>
            Limpar Filtros <FaFilter className="filter" />{' '}
          </users.ButtonClear>
        </users.DivCards>
      </users.DivContainer>

      <users.ContainerTable>
        <users.StyledTable>
          <users.TableHead>
            <tr>
              <th>Nome</th>
              <th>Filial</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </users.TableHead>

          <users.TableBody>
            <tr>
              <td>João Castro</td>
              <td>Araras</td>
              <td>Administrador</td>
              <td>
                {' '}
                <users.CategoryBadge style={{ background: '#8ACE8480' }}>
                  Ativo
                </users.CategoryBadge>{' '}
              </td>
              <td>
                <users.IconWrapper>
                  <FaEdit
                    className="edit"
                    onClick={() => setBoxAtiva('ModalEdit')}
                  />
                  <FaUserAltSlash
                    className="inative"
                    onClick={() => setBoxAtiva('ModalStatus')}
                  />
                  <MdDelete
                    className="delete"
                    onClick={() => handleConfirm()}
                  />
                </users.IconWrapper>
              </td>
            </tr>
          </users.TableBody>
        </users.StyledTable>
        <users.TableFooter>
          <span>Mostrando 0 a 0 de 0 Produtos</span>

          <users.Pagination>
            <users.PaginationArrow></users.PaginationArrow>

            <users.PageButton active>1</users.PageButton>

            <users.PaginationArrow></users.PaginationArrow>
          </users.Pagination>
        </users.TableFooter>
      </users.ContainerTable>

      {boxAtiva === 'ModalEdit' && (
        <users.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <users.DivBox
            onClick={(e) => e.stopPropagation()}
            className="BoxEdit"
          >
            <users.DivClose>
              <IoMdCloseCircle
                className="close"
                onClick={() => setBoxAtiva('')}
              />
            </users.DivClose>
            <users.DivTitleEdit>
              <users.TitleEdit>Editar Usuário</users.TitleEdit>
            </users.DivTitleEdit>

            <users.Form>
              <users.InputEdit placeholder="Nome" />
              <users.InputEdit placeholder="Filial" />
              <users.SelectEdit>
                <option disabled selected>
                  Tipo
                </option>
              </users.SelectEdit>

              <users.DivButtonEdit>
                <users.ButtonEdit>Atualizar</users.ButtonEdit>
                <users.ButtonCancel onClick={() => setBoxAtiva('')}>
                  Cancelar
                </users.ButtonCancel>
              </users.DivButtonEdit>
            </users.Form>
          </users.DivBox>
        </users.BackgroundOpacity>
      )}

      {boxAtiva === 'ModalStatus' && (
        <users.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <users.DivBox onClick={(e) => e.stopPropagation()}>
            <users.DivClose>
              <IoMdCloseCircle
                className="close"
                onClick={() => setBoxAtiva('')}
              />
            </users.DivClose>

            <users.DivTitleEdit>
              <users.TitleEdit>Status Usuário</users.TitleEdit>
              <users.Subtitle>Defina o status do usuário.</users.Subtitle>
            </users.DivTitleEdit>

            <users.SelectEdit>
              <option selected disabled>
                Status
              </option>
            </users.SelectEdit>

            <users.DivButtonEdit>
              <users.ButtonEdit>Salvar</users.ButtonEdit>
              <users.ButtonCancel onClick={() => setBoxAtiva('')}>
                Cancelar
              </users.ButtonCancel>
            </users.DivButtonEdit>
          </users.DivBox>
        </users.BackgroundOpacity>
      )}
    </>
  );
}
