import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { FaSearch, FaFilter, FaTruck, FaEdit } from 'react-icons/fa';
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

  useEffect(() => {
    carregarEstoque();
  }, []);

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
                  <td style={{ color: item.status_critico ? '#RED' : '#16AEA3' }}>
                    {item.status_critico ? 'Crítico' : 'Estável'}
                  </td>
                  <td>
                    <estq.IconWrapper>
                      <FaEdit className="edit" onClick={() => setBoxAtiva('ModalEdit')} />
                      
                      <FaTruck className="truck" onClick={() => abrirModalTransferencia(item)} />
                      
                      <MdDelete className="delete" onClick={() => handleConfirm()} />
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

      {boxAtiva === 'ModalTransfer' && (
        <>
          <estq.BackgroundOpacity onClick={() => setBoxAtiva('')}>
            <estq.DivBox onClick={(e) => e.stopPropagation()}>
              <estq.DivCloseX>
                <IoMdCloseCircle className="closeX" onClick={() => setBoxAtiva('')} />
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
                  <estq.ButtonCancel onClick={() => setBoxAtiva('')}>Cancelar</estq.ButtonCancel>
                </estq.DivButtonsAdd>
              </estq.Form>
            </estq.DivBox>
          </estq.BackgroundOpacity>
        </>
      )}
    </>
  );
}