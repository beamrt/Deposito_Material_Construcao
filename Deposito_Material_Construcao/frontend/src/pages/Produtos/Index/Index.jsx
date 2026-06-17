import { useNavigate } from 'react-router';
import { FaFilter } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
import { confirmAlert } from 'react-confirm-alert';
import { useState, useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as prod from './styled';

export default function Index() {
  const navigate = useNavigate();
  const [boxAtiva, setBoxAtiva] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const carregarProdutos = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/api/produtos/listar/');
      if (resposta.ok) {
        const dados = await resposta.json();
        setProdutos(dados.produtos || dados || []);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  const executarExclusao = async (id_produto, onClose) => {
    try {
      const resposta = await fetch(`http://localhost:8000/api/produtos/deletar/${id_produto}/`, {
        method: 'DELETE', // talvez mudar para POST
        headers: { 'Content-Type': 'application/json' }
      });

      if (resposta.ok) {
        alert("Produto excluído com sucesso!");
        carregarProdutos(); 
        onClose(); 
      } else {
        alert("Erro ao excluir o produto no servidor.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro de conexão ao tentar excluir.");
    }
  };

  const handleConfirm = (id) => {
    console.log("ID recebido para exclusão:", id); 
    if (!id) {
       alert("Erro: ID do produto não encontrado!");
       return;
    }
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
            <prod.ButtonAdd onClick={() => executarExclusao(id, onClose)}>Confirmar</prod.ButtonAdd>              <prod.ButtonCancel onClick={onClose}>Cancelar</prod.ButtonCancel>
            </prod.ButtonAlerts>
          </prod.ContainerExclude>
        );
      },
    });
  };

  const handleAtualizar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:8000/api/produtos/editar/${produtoSelecionado.id_produto}/`, {
        method: 'PUT', // talvez mudar para POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoSelecionado)
      });

      if (resposta.ok) {
        alert("Produto atualizado com sucesso!");
        setBoxAtiva('');
        carregarProdutos();
      } else {
        alert("Erro ao atualizar o produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const abrirModalComProduto = (produto, tipoModal) => {
    console.log("Produto selecionado:", produto); 
    if (!produto || !produto.id_produto) {
       alert("Erro: Produto sem ID!");
       return;
    }
    setProdutoSelecionado(produto);
    setBoxAtiva(tipoModal);
  };

  const carregarCategorias = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/api/produtos/categorias/listar/');
      if (resposta.ok) {
        const dados = await resposta.json();
        setCategorias(dados.categorias || dados || []);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

const handleCadastrarCategoria = async (e) => {
    e.preventDefault();
    if (!novaCategoria.trim()) return alert("Digite um nome para a categoria!");

    try {
      const isEdicao = categoriaSelecionada !== null;
      const url = isEdicao 
        ? `http://localhost:8000/api/produtos/categorias/editar/${categoriaSelecionada.id_categoria || categoriaSelecionada.id}/`
        : 'http://localhost:8000/api/produtos/categorias/cadastro/';
      
      const method = isEdicao ? 'PUT' : 'POST';

      const resposta = await fetch(url, { 
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novaCategoria })
      });

      if (resposta.ok) {
        alert(isEdicao ? "Categoria atualizada com sucesso!" : "Categoria cadastrada com sucesso!");
        setNovaCategoria('');
        setCategoriaSelecionada(null); 
        carregarCategorias(); 
      } else {
        alert("Erro ao salvar categoria no servidor.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const prepararEdicaoCategoria = (cat) => {
    setCategoriaSelecionada(cat);
    setNovaCategoria(cat.nome);
  };

  const executarExclusaoCategoria = async (id_categoria, onClose) => {
    try {
      const resposta = await fetch(`http://localhost:8000/api/produtos/categorias/deletar/${id_categoria}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (resposta.ok) {
        alert("Categoria excluída com sucesso!");
        carregarCategorias();
        onClose();
      } else {
        alert("Erro ao excluir categoria no servidor.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão ao tentar excluir.");
    }
  };

  const handleConfirmCategoria = (cat) => {
    const id = cat.id_categoria || cat.id;
    if (!id) {
       alert("Erro: ID da categoria não encontrado!");
       return;
    }
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <prod.ContainerExclude>
            <prod.DivTitleEdit>
              <prod.TitleEdit>Excluir Categoria</prod.TitleEdit>
            </prod.DivTitleEdit>
            <prod.TitleExclude>Tem certeza que deseja excluir a categoria "{cat.nome}"?</prod.TitleExclude>
            <prod.ContainerAlerts>
              <prod.TitleExclude className="exclude">Atenção!</prod.TitleExclude>
              <prod.SubtitleExclude>Essa ação não pode ser desfeita.</prod.SubtitleExclude>
            </prod.ContainerAlerts>
            <prod.ButtonAlerts>
              <prod.ButtonAdd onClick={() => executarExclusaoCategoria(id, onClose)}>Confirmar</prod.ButtonAdd>
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
            {produtos.length > 0 ? (
              produtos.map((prodItem) => (
                <tr key={prodItem.id}>
                  <td>{prodItem.nome || prodItem.descricao || 'Sem Nome'}</td>
                  <td>
                    <prod.CategoryBadge style={{ background: '#CFE3FF' }}>
                      {prodItem.categoria || 'Sem Categoria'}
                    </prod.CategoryBadge>
                  </td>
                  <td>{prodItem.tipo || '-'}</td>
                  <td>R$ {Number(prodItem.preco_venda || 0).toFixed(2).replace('.', ',')}</td>
                  <prod.DescriptionCell>{prodItem.descricao || '-'}</prod.DescriptionCell>
                  <td>
                    <prod.IconWrapper>
                      <FaEdit
                        className="edit"
                        onClick={() => abrirModalComProduto(prodItem, 'ModalEdit')}
                      />
                      <FaEye
                        className="eye"
                        onClick={() => abrirModalComProduto(prodItem, 'ModalView')}
                      />
                      <MdDelete
                        className="delete"
                        onClick={() => handleConfirm(prodItem.id_produto)}
                      />
                    </prod.IconWrapper>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </prod.TableBody>
        </prod.StyledTable>

        <prod.TableFooter>
          <span>Mostrando 1 a {produtos.length} de {produtos.length} Produtos</span>
          <prod.Pagination>
            <prod.PaginationArrow></prod.PaginationArrow>

            <prod.PageButton active='true'>1</prod.PageButton>

            <prod.PaginationArrow></prod.PaginationArrow>
          </prod.Pagination>
        </prod.TableFooter>
        <prod.ContainerExport>
          <prod.ButtonExport>Exportar</prod.ButtonExport>
        </prod.ContainerExport>
      </prod.ContainerTable>

      {boxAtiva === 'ModalEdit' && produtoSelecionado && (
        <prod.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <prod.DivBox onClick={(e) => e.stopPropagation()}>
            <prod.DivClose>
              <IoMdCloseCircle className="close" onClick={() => setBoxAtiva('')} />
            </prod.DivClose>

            <prod.DivTitleEdit>
              <prod.TitleEdit>Editar Produto</prod.TitleEdit>
            </prod.DivTitleEdit>

            <prod.Form onSubmit={handleAtualizar}>
              <prod.ContainerLabel>
                <prod.LabelEdit>Nome</prod.LabelEdit>
                <prod.InputEdit 
                  type="text"
                  value={produtoSelecionado.nome || ''} 
                  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, nome: e.target.value})}
                />
              </prod.ContainerLabel>

              <prod.ContainerWrapper>
                <prod.ContainerLabel>
                  <prod.LabelEdit>Categoria</prod.LabelEdit>
                  <prod.SelectEdit 
                    value={produtoSelecionado.categoria || ''}
                    onChange={(e) => setProdutoSelecionado({...produtoSelecionado, categoria: e.target.value})}
                  />
                </prod.ContainerLabel>
                <prod.ContainerLabel>
                  <prod.LabelEdit>Preço de Compra</prod.LabelEdit>
                  <prod.InputEdit 
                    type="number" step="0.01"
                    value={produtoSelecionado.preco_compra || ''} 
                    onChange={(e) => setProdutoSelecionado({...produtoSelecionado, preco_compra: e.target.value})}
                  />
                </prod.ContainerLabel>
                <prod.ContainerLabel>
                  <prod.LabelEdit>Preço de Venda</prod.LabelEdit>
                  <prod.InputEdit 
                    type="number" step="0.01"
                    value={produtoSelecionado.preco_venda || ''} 
                    onChange={(e) => setProdutoSelecionado({...produtoSelecionado, preco_venda: e.target.value})}
                  />
                </prod.ContainerLabel>
              </prod.ContainerWrapper>

              <prod.ContainerLabel>
                <prod.Label>Descrição</prod.Label>
                <prod.Obs 
                  value={produtoSelecionado.descricao || ''} 
                  onChange={(e) => setProdutoSelecionado({...produtoSelecionado, descricao: e.target.value})}
                />
              </prod.ContainerLabel>

              <prod.DivButtonEdit>
                <prod.ButtonEdit type="submit">Atualizar</prod.ButtonEdit>
                <prod.ButtonCancel type="button" onClick={() => setBoxAtiva('')}>Cancelar</prod.ButtonCancel>
              </prod.DivButtonEdit>
            </prod.Form>
          </prod.DivBox>
        </prod.BackgroundOpacity>
      )}  

      {boxAtiva === 'ModalView' && produtoSelecionado && (
        <prod.BackgroundOpacity onClick={() => setBoxAtiva('')}>
          <prod.DivView onClick={(e) => e.stopPropagation()}>
            <prod.DivClose>
              <IoMdCloseCircle className="close" onClick={() => setBoxAtiva('')} />
            </prod.DivClose>

            <prod.DivTitleEdit>
              <prod.TitleEdit>Informações</prod.TitleEdit>
            </prod.DivTitleEdit>

            <prod.InfoModal>
              <prod.BoxInfo>
                <prod.Informations>Nome: <span>{produtoSelecionado.nome || 'Sem nome'}</span></prod.Informations>
                <prod.Informations>Categoria: <span>{produtoSelecionado.categoria || 'Sem categoria'}</span></prod.Informations>
                <prod.Informations>Tipo: <span>{produtoSelecionado.tipo || '-'}</span></prod.Informations>
                <prod.Informations>Unidades: <span>{produtoSelecionado.quantidade || '0'}</span></prod.Informations>
                <prod.Informations>Preço de Venda: <span>R$ {Number(produtoSelecionado.preco_venda || 0).toFixed(2).replace('.', ',')}</span></prod.Informations>
                <prod.Informations>Preço de Compra: <span>R$ {Number(produtoSelecionado.preco_compra || 0).toFixed(2).replace('.', ',')}</span></prod.Informations>
                <prod.Informations>Descrição: <span>{produtoSelecionado.descricao || '-'}</span></prod.Informations>
              </prod.BoxInfo>
            </prod.InfoModal>

            <prod.DivButtonEdit>
              <prod.ButtonBack onClick={() => setBoxAtiva('')}>Voltar</prod.ButtonBack>
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
                  <prod.TitleEdit>
                    {categoriaSelecionada ? 'Editar Categoria' : 'Cadastrar Categoria'}
                  </prod.TitleEdit>
                </prod.DivTitleEdit>

                <prod.FormCategory onSubmit={handleCadastrarCategoria}>
                  <prod.ContainerLabel>
                    <prod.Label>Nome</prod.Label>
                    <prod.InputEdit 
                      type="text"
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      required
                    />
                  </prod.ContainerLabel>

                  <prod.DivButtonEdit>
                    <prod.ButtonAdd type="submit" onClick={handleCadastrarCategoria}>
                      {categoriaSelecionada ? 'Atualizar' : 'Cadastrar'}
                    </prod.ButtonAdd>
                    
                    {categoriaSelecionada && (
                      <prod.ButtonCancel type="button" onClick={() => { setCategoriaSelecionada(null); setNovaCategoria(''); }}>
                        Cancelar
                      </prod.ButtonCancel>
                    )}
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
                        {categorias.length > 0 ? (
                        categorias.map((cat) => (
                      <tr key={cat.id_categoria || cat.id}>
                        <td>
                          <prod.CategoryBadge
                            style={{
                              background: '#CFE3FF',
                            }}
                          >
                            {cat.nome}
                          </prod.CategoryBadge>
                        </td>

                        <td>
                          <prod.IconWrapper>
                            <FaEdit
                              className="edit"
                              onClick={() => prepararEdicaoCategoria(cat)}
                            />
                            <MdDelete
                              className="delete"
                              onClick={() => handleConfirmCategoria(cat)}
                            />
                          </prod.IconWrapper>
                        </td>
                      </tr>
                      ))
                    ) : null}
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
