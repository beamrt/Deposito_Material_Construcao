import { useNavigate } from 'react-router';
import { FaFilter } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { confirmAlert } from 'react-confirm-alert';
import { useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as prod from './styled';

export default function Index() {
  const navigate = useNavigate();
  const [boxAtiva, setBoxAtiva] = useState('');

  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const buscarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/produtos/listar');
      if (response.ok) {
        const dados = await response.json();
        setListaProdutos(dados); 
      } else {
        console.error("Erro ao buscar produtos. Status:", response.status);
      }
    } catch (error) {
      console.error("Erro de conexão com o servidor:", error);
    }
  };

  const excluirProduto = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/produtos/deletar/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      buscarProdutos(); 
    } else {
      alert("Erro ao excluir produto.");
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
  }
};

  const salvarEdicao = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/produtos/editar/${produtoEditando.id_produto}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produtoEditando)
    });

    if (response.ok) {
      alert("Produto atualizado com sucesso!");
      setBoxAtiva('');
      buscarProdutos();
    } else {
      alert("Erro ao editar produto.");
    }
  } catch (error) {
    console.error("Erro na edição:", error);
  }
};

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleConfirm = (id) => {
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
              <prod.ButtonAdd onClick={() => {
                excluirProduto(id);
                onClose();
              }}>Confirmar</prod.ButtonAdd>
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
        <prod.ButtonsWrapper>
          <prod.ButtonAdd
            onClick={() => navigate('/constrular/produtos/cadastro')}
          >
            Cadastrar Produto
          </prod.ButtonAdd>
          <prod.ButtonAdd onClick={() => setBoxAtiva('ModalCategory')}>
            Cadastrar Categoria
          </prod.ButtonAdd>
        </prod.ButtonsWrapper>
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
            {listaProdutos.length > 0 ? (
              listaProdutos.map((produto) => (
                <tr key={produto.id_produto}>
                  <td>{produto.nome}</td>

                  <td>
                    <prod.CategoryBadge
                      style={{
                        background: '#CFE3FF',
                      }}
                    >
                      {produto.id_categoria || '1'} 
                    </prod.CategoryBadge>
                  </td>

                  <td>{produto.marca}</td>

                  <td>R$ {produto.preco_venda}</td>

                  <prod.DescriptionCell>
                    {produto.descricao}
                  </prod.DescriptionCell>

                  <td>
                    <prod.IconWrapper>
                      <FaEdit
                        className="edit"
                        onClick={() => {
                          setProdutoEditando(produto);
                          setBoxAtiva('ModalEdit')}
                        } 
                      />
                      <FaEye
                        className="eye"
                        onClick={() => setBoxAtiva('ModalView')}
                      />
                      <MdDelete
                        className="delete"
                        onClick={() => {                          
                          handleConfirm(produto.id_produto)
                        }
                        }
                      />
                    </prod.IconWrapper>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum produto cadastrado no banco de dados ainda.
                </td>
              </tr>
            )}
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

      {boxAtiva === 'ModalEdit' && (
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
                  <prod.InputEdit
                    value={produtoEditando ? produtoEditando.nome : ''} 
                    onChange={(e) => setProdutoEditando({...produtoEditando, nome: e.target.value})}
                   />
                </prod.ContainerLabel>

                <prod.ContainerWrapper>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Categoria</prod.LabelEdit>
                    <prod.InputEdit 
                      value={produtoEditando ? produtoEditando.id_categoria : ''} 
                      onChange={(e) => setProdutoEditando({...produtoEditando, id_categoria: e.target.value})}
                    />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Preço de Compra</prod.LabelEdit>
                    <prod.InputEdit 
                      value={produtoEditando ? produtoEditando.preco_compra : ''} 
                      onChange={(e) => setProdutoEditando({...produtoEditando, preco_compra: e.target.value})}
                    />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.LabelEdit>Preço de Venda</prod.LabelEdit>
                    <prod.InputEdit 
                      value={produtoEditando ? produtoEditando.preco_venda : ''} 
                      onChange={(e) => setProdutoEditando({...produtoEditando, preco_venda: e.target.value})}
                    />
                  </prod.ContainerLabel>
                </prod.ContainerWrapper>

                <prod.ContainerWrapper>
                  <prod.ContainerLabel>
                    <prod.Label>Marca</prod.Label>
                    <prod.InputEdit 
                      value={produtoEditando ? produtoEditando.marca : ''} 
                      onChange={(e) => setProdutoEditando({...produtoEditando, marca: e.target.value})}
                    />
                  </prod.ContainerLabel>
                  <prod.ContainerLabel>
                    <prod.Label>Unidade</prod.Label>
                    <prod.InputEdit 
                      value={produtoEditando ? produtoEditando.unidade_medida : ''} 
                      onChange={(e) => setProdutoEditando({...produtoEditando, unidade_medida: e.target.value})}
                    />
                  </prod.ContainerLabel>
                </prod.ContainerWrapper>

                <prod.ContainerLabel>
                  <prod.Label>Descrição</prod.Label>
                  <prod.Obs 
                    value={produtoEditando ? produtoEditando.descricao : ''} 
                    onChange={(e) => setProdutoEditando({...produtoEditando, descricao: e.target.value})}
                  />
                </prod.ContainerLabel>

                <prod.DivButtonEdit>
                  <prod.ButtonEdit onClick={salvarEdicao}>Atualizar</prod.ButtonEdit>
                  <prod.ButtonCancel onClick={() => setBoxAtiva('')}>
                    Cancelar
                  </prod.ButtonCancel>
                </prod.DivButtonEdit>
              </prod.Form>
            </prod.DivBox>
          </prod.BackgroundOpacity>
        </>
      )}

      {boxAtiva === 'ModalView' && (
        <prod.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <prod.DivView onClick={(e) => e.stopPropagation()}>
            <prod.DivClose>
              <IoMdCloseCircle
                className="close"
                onClick={() => setBoxAtiva('')}
              />
            </prod.DivClose>

            <prod.DivTitleEdit>
              <prod.TitleEdit>Informações</prod.TitleEdit>
            </prod.DivTitleEdit>

            <prod.InfoModal>
              <prod.BoxInfo>
                <prod.Informations>
                  Nome: <span>Cimento CP-II</span>
                </prod.Informations>
                <prod.Informations>
                  Categoria: <span>Construção</span>
                </prod.Informations>
                <prod.Informations>
                  Tipo: <span>Material</span>
                </prod.Informations>
                <prod.Informations>
                  Unidades: <span>22</span>
                </prod.Informations>
                <prod.Informations>
                  Preço de Venda: <span>R$ 42,90</span>{' '}
                </prod.Informations>
                <prod.Informations>
                  Preço de Compra: <span>R$ 32,90</span>
                </prod.Informations>
                <prod.Informations>
                  Descrição:{' '}
                  <span>
                    Cimento portland composto CP-II, uso geral em obras e
                    construções
                  </span>{' '}
                </prod.Informations>
              </prod.BoxInfo>
            </prod.InfoModal>

            <prod.DivButtonEdit>
              <prod.ButtonBack onClick={() => setBoxAtiva('')}>
                Voltar
              </prod.ButtonBack>
            </prod.DivButtonEdit>
          </prod.DivView>
        </prod.BackgroundOpacity>
      )}

      {boxAtiva === 'ModalCategory' && (
        <prod.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <prod.DivCategory onClick={(e) => e.stopPropagation()}>
            <prod.CategoryWrapper>
              <prod.DivClose>
                <IoMdCloseCircle
                  className="close"
                  onClick={() => setBoxAtiva('')}
                />
              </prod.DivClose>

              <prod.CategoryGridWrapper>
                <prod.DivTitleEdit className="category">
                  <prod.TitleEdit>Cadastrar Categoria</prod.TitleEdit>
                </prod.DivTitleEdit>

                <prod.FormCategory>
                  <prod.ContainerLabel>
                    <prod.Label>Nome</prod.Label>
                    <prod.InputEdit />
                  </prod.ContainerLabel>

                  <prod.DivButtonEdit>
                    <prod.ButtonAdd>Cadastrar</prod.ButtonAdd>
                  </prod.DivButtonEdit>
                </prod.FormCategory>
              </prod.CategoryGridWrapper>

              <prod.CategoryGridWrapper>
                <prod.DivTitleEdit>
                  <prod.TitleEdit>Categorias Cadastradas</prod.TitleEdit>
                </prod.DivTitleEdit>

                <prod.ContainerTableCategory>
                  <prod.StyledTable>
                    <prod.TableHead>
                      <tr>
                        <th>Categoria</th>
                        <th>Ações</th>
                      </tr>
                    </prod.TableHead>

                    <prod.TableBody>
                      <tr>
                        <td>
                          <prod.CategoryBadge
                            style={{ background: '#CFE3FF' }}
                          >
                            Construção
                          </prod.CategoryBadge>
                        </td>

                      </tr>
                    </prod.TableBody>
                  </prod.StyledTable>
                </prod.ContainerTableCategory>
              </prod.CategoryGridWrapper>
            </prod.CategoryWrapper>
          </prod.DivCategory>
        </prod.BackgroundOpacity>
      )}
    </>
  );
}
