import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaSearch, FaFilter, FaTruck, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoMdCloseCircle } from 'react-icons/io';
import * as estq from './styled';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';

export default function IndexEstoque() {
  const [boxAtiva, setBoxAtiva] = useState('');
  
  const [listaEstoque, setListaEstoque] = useState([]);

  const [transferLojaDestino, setTransferLojaDestino] = useState('');
  const [transferProdutoId, setTransferProdutoId] = useState('');
  const [transferProdutoNome, setTransferProdutoNome] = useState('');
  const [transferQtd, setTransferQtd] = useState('');

  const [addProdutoId, setAddProdutoId] = useState('');
  const [addFornecedor, setAddFornecedor] = useState('');
  const [addQtd, setAddQtd] = useState('');
  const [addMinimo, setAddMinimo] = useState('');

  const [editEstoqueId, setEditEstoqueId] = useState('');
  const [editProdutoNome, setEditProdutoNome] = useState('');
  const [editFornecedor, setEditFornecedor] = useState('');
  const [editQtd, setEditQtd] = useState('');
  const [listaProdutosCatalogo, setListaProdutosCatalogo] = useState([]);
  const [editProdutoId, setEditProdutoId] = useState('');
  const [editMinimo, setEditMinimo] = useState('');
  
  const [itemParaExcluir, setItemParaExcluir] = useState(null);

  const carregarEstoque = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/api/estoque/');
      const dados = await resposta.json();
      if (resposta.ok) {
        setListaEstoque(dados.estoque || []);
      }
    } catch (erro) {
      console.error("Erro ao buscar estoque do backend:", erro);
    }
  };

  const carregarProdutosCatalogo = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/api/produtos/listar/');   
      const dados = await resposta.json();
      if (resposta.ok) {
        setListaProdutosCatalogo(dados.produtos || dados || []);
      }
    } catch (erro) {
      console.log("Erro ao buscar produtos do catálogo: ", erro);
      
    }
  }

  useEffect(() => {
    carregarEstoque();
    carregarProdutosCatalogo();
  }, []);

  const handleAdicionarAoEstoque = async (e) => {
    e.preventDefault();
    
    const payload = {
      id_loja: 1, 
      id_produto: Number(addProdutoId),
      quantidade: Number(addQtd),
      estoque_minimo: Number(addMinimo),
      fornecedor: addFornecedor, 
      id_usuario: 1
    };

    try {
      const resposta = await fetch('http://localhost:8000/api/estoque/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert('Produto adicionado ao estoque com sucesso!'); 
        setBoxAtiva('');
        carregarEstoque(); 
        setAddProdutoId('');
        setAddFornecedor('');
        setAddQtd('');
        setAddMinimo('');
      } else {
        alert('Erro: ' + dados.error);
      }
    } catch (erro) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const abrirModalTransferencia = (item) => {
    setTransferProdutoId(item.id_produto);
    setTransferProdutoNome(item.nome_produto); 
    setTransferLojaDestino('');
    setTransferQtd('');
    setBoxAtiva('ModalTransfer');
  };

  const handleTransferir = async (e) => {
    e.preventDefault();
    
    if (!transferLojaDestino || !transferQtd) {
      alert('Por favor, preencha a filial de destino e a quantidade.');
      return;
    }

    const payload = {
      loja_origem: 1, 
      loja_destino: parseInt(transferLojaDestino),
      produtos: [
        { id_produto: parseInt(transferProdutoId), qtd: parseInt(transferQtd) }
      ]
    };

    try {
      const resposta = await fetch('http://localhost:8000/api/transferencias/criar/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert('🎉 ' + dados.message); 
        setBoxAtiva('');
        carregarEstoque(); 
      } else {
        alert('❌ Erro: ' + dados.error);
      }
    } catch (erro) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleConfirm = (id_estoque) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <estq.ContainerExclude>
            <estq.DivTitle>
              <estq.TitleAdd>Excluir Produto</estq.TitleAdd>
            </estq.DivTitle>
            <estq.TitleExclude>
              Tem certeza que deseja excluir este produto do estoque?
            </estq.TitleExclude>
            <estq.ContainerAlerts>
              <estq.TitleExclude className="exclude">Atenção</estq.TitleExclude>
              <estq.SubtitleExclude>
                Essa ação não poderá ser desfeita
              </estq.SubtitleExclude>
            </estq.ContainerAlerts>
            <estq.ButtonAlerts>
              <estq.ButtonAdd onClick={() => { handleExcluir(id_estoque); onClose();}}>Excluir</estq.ButtonAdd>
              <estq.ButtonCancel onClick={onClose}>Cancelar</estq.ButtonCancel>
            </estq.ButtonAlerts>
          </estq.ContainerExclude>
        );
      },
    });
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:8000/api/estoque/editar/${editEstoqueId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            fornecedor: editFornecedor, 
            quantidade: parseInt(editQtd), 
            estoque_minimo: parseInt(editMinimo) 
        })
      });
      if (resposta.ok) {
        alert('Alterado com sucesso!');
        setBoxAtiva('');
        carregarEstoque();
      } else { alert('Erro na edição'); }
    } catch (erro) { alert('Erro de conexão'); }
  };

  const handleExcluir = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:8000/api/estoque/deletar/${id}/`, { method: 'DELETE' });
      if (resposta.ok) {
        alert('Excluído do estoque!');
        carregarEstoque();
      } else { alert('Erro na exclusão'); }
    } catch (erro) { alert('Erro de conexão'); }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <estq.ContainerTitle>
        <estq.Title>Controle de Estoque</estq.Title>
        <estq.Subtitle>
          Acompanhe entradas, saídas e disponibilidade dos produtos em um só lugar.
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
              <option>Maior Qtd</option>
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
              <th>Categoria</th>
              <th>Qnt. Atual</th>
              <th>Est. Mínimo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </estq.TableHead>

          <estq.TableBody>
            {listaEstoque.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum produto em estoque.
                </td>
              </tr>
            ) : (
              listaEstoque.map((item) => (
                <tr key={item.id_estoque}>
                  <td>{item.nome_produto}</td>
                  <td>{item.categoria}</td>
                  <td>{item.quantidade} un.</td>
                  <td>{item.estoque_minimo} un.</td>
                  <td style={{ color: item.status_critico ? 'red' : '#16AEA3' }}>
                    {item.status_critico ? 'Crítico' : 'Estável'}
                  </td>
                  <td>
                    <estq.IconWrapper>
                    <FaEdit className="edit" onClick={() => { 
                        setEditEstoqueId(item.id_estoque); 
                        setEditProdutoId(item.id_produto); 
                        setEditFornecedor(item.fornecedor || ''); 
                        setEditQtd(item.quantidade); 
                        setEditMinimo(item.estoque_minimo); 
                        setBoxAtiva('ModalEdit'); 
                      }} />                      <FaTruck className="truck" onClick={() => abrirModalTransferencia(item)} />
                      <MdDelete className="delete" onClick={() => handleConfirm(item.id_estoque)} />
                    </estq.IconWrapper>
                  </td>
                </tr>
              ))
            )}
          </estq.TableBody>
        </estq.StyledTable>
        <estq.TableFooter>
          <span>Mostrando {listaEstoque.length} de {listaEstoque.length} Produtos</span>
          <estq.Pagination>
            <estq.PaginationArrow><IoIosArrowBack /></estq.PaginationArrow>
            <estq.PageButton active>1</estq.PageButton>
            <estq.PaginationArrow><IoIosArrowForward /></estq.PaginationArrow>
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
                    <estq.Select defaultValue="inicia">
                      <option value="inicia" disabled>
                        Inicia com
                      </option>
                    </estq.Select>
                    <estq.Select defaultValue="contem">
                      <option value="contem" disabled>
                        Contém
                      </option>
                    </estq.Select>
                  </estq.SelectOrder>
                  <estq.InputWrapper>
                    <estq.Select 
                      value={addProdutoId}
                      onChange={(e) => setAddProdutoId(e.target.value)}
                      style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
                    >
                      <option value="" disabled>Selecione do Catálogo...</option>
                      {listaProdutosCatalogo.map((prod) => (
                        <option key={prod.id_produto} value={prod.id_produto}>
                          {prod.nome_produto}
                        </option>
                      ))}
                    </estq.Select>
                    
                    <estq.DivSearch className="searchAdd">
                      <FaSearch className="search" />
                    </estq.DivSearch>
                  </estq.InputWrapper>
                </estq.SearchProduct>

                <estq.SearchProduct>
                  <span>Fornecedor</span>

                  <estq.InputWrapper>
                    <estq.Input 
                      placeholder="Buscar Fornecedor" 
                      value={addFornecedor}
                      onChange={(e) => setAddFornecedor(e.target.value)}
                    />
                    <estq.DivSearch className="searchAdd">
                      <FaSearch className="search" />
                    </estq.DivSearch>
                  </estq.InputWrapper>
                </estq.SearchProduct>

                <estq.SearchProduct>
                  <span>Quantidade</span>
                  <estq.SelectOrder>
                    <estq.Input 
                      type="number" 
                      value={addQtd}
                      onChange={(e) => setAddQtd(e.target.value)}
                    />
                  </estq.SelectOrder>
                </estq.SearchProduct>

                <estq.SearchProduct>
                  <span>Estoque Mínimo</span>
                  <estq.SelectOrder>
                    <estq.Input 
                      type="number" 
                      value={addMinimo}
                      onChange={(e) => setAddMinimo(e.target.value)}
                    />
                  </estq.SelectOrder>
                </estq.SearchProduct>

                <estq.DivButtonsAdd>
                  <estq.ButtonAdd onClick={handleAdicionarAoEstoque}>Salvar</estq.ButtonAdd>
                  <estq.ButtonCancel onClick={() => setBoxAtiva('')}>
                    Cancelar
                  </estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.AddWrapper>
            </estq.DivAdd>
          </estq.BackgroundOpacity>
        </>
      )}

      {boxAtiva === 'ModalEdit' && (
        <>
          <estq.BackgroundOpacity onClick={() => setBoxAtiva('')}>
            <estq.DivAdd onClick={(e) => e.stopPropagation()}>
              <estq.AddWrapper>
                <estq.DivClose>
                  <FaArrowLeft className="close" onClick={() => setBoxAtiva('')} />
                </estq.DivClose>

                <estq.DivTitle>
                  <estq.TitleAdd>Editar Estoque</estq.TitleAdd>
                </estq.DivTitle>

                <estq.Form onSubmit={handleEditar}>
                  <estq.SearchProduct>
                    <span>Fornecedor</span>
                    <estq.InputWrapper>
                      <estq.Input 
                        placeholder="Nome do Fornecedor" 
                        value={editFornecedor}
                        onChange={(e) => setEditFornecedor(e.target.value)}
                        style={{width: '100%', border: 'none', outline: 'none', background: 'transparent'}}
                      />
                    </estq.InputWrapper>
                  </estq.SearchProduct>

                  <estq.SearchProduct>
                    <span>Quantidade</span>
                    <estq.SelectOrder>
                      <estq.Input 
                        type="number" 
                        value={editQtd}
                        onChange={(e) => setEditQtd(e.target.value)}
                      />
                    </estq.SelectOrder>
                  </estq.SearchProduct>

                  <estq.SearchProduct>
                    <span>Estoque Mínimo</span>
                    <estq.SelectOrder>
                      <estq.Input 
                        type="number" 
                        value={editMinimo}
                        onChange={(e) => setEditMinimo(e.target.value)}
                      />
                    </estq.SelectOrder>
                  </estq.SearchProduct>

                  <estq.DivButtonsAdd>
                    <estq.ButtonAdd type="submit">Salvar Alterações</estq.ButtonAdd>
                    <estq.ButtonCancel onClick={() => setBoxAtiva('')} type="button">Cancelar</estq.ButtonCancel>
                  </estq.DivButtonsAdd>
                </estq.Form>
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
                <IoMdCloseCircle className="closeX" onClick={() => setBoxAtiva('')} style={{ cursor: 'pointer' }} />
              </estq.DivCloseX>

              <estq.DivTitle>
                <estq.TitleAdd>Transferir Produto</estq.TitleAdd>
              </estq.DivTitle>

              <estq.Form>
                <estq.Input 
                  value={`Produto: ${transferProdutoNome}`} 
                  disabled 
                  style={{ backgroundColor: '#f0f0f0', color: '#555', cursor: 'not-allowed' }}
                />
                
                <estq.Select
                  value={transferLojaDestino}
                  onChange={(e) => setTransferLojaDestino(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}
                >
                  <option value="" disabled>Selecione a Filial de Destino</option>
                  <option value="2">Loja Filial (ID: 2)</option>
                </estq.Select>

                <estq.Input 
                  type="number" 
                  placeholder="Quantidade a Transferir" 
                  value={transferQtd}
                  onChange={(e) => setTransferQtd(e.target.value)}
                />

                <estq.DivButtonsAdd>
                  <estq.ButtonAdd onClick={handleTransferir}>Transferir</estq.ButtonAdd>
                  <estq.ButtonCancel onClick={() => setBoxAtiva('')} type="button">Cancelar</estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.Form>
            </estq.DivBox>
          </estq.BackgroundOpacity>
        </>
      )}
    </>
  );
}