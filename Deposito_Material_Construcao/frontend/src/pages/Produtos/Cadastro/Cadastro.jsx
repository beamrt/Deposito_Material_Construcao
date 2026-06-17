import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as cad from './styled';

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco_compra: '',
    preco_venda: '',
    tipo: '',
    unidade: '',
    descricao: ''
  });

  const [categorias, setCategorias] = useState([]);
  const tiposOpcoes = ['Material de Construção', 'Ferramenta', 'Equipamento', 'EPI', 'Acabamento', 'Outros'];

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        const resposta = await fetch('http://localhost:8000/api/produtos/categorias/listar/'); 
        if (resposta.ok) {
          const dados = await resposta.json();
          setCategorias(dados.categorias || dados || []);
        }
      } catch (error) {
        console.log("Ainda sem rota de categorias ou erro ao buscar: ", error);
      }
    };
    carregarCategorias();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const resposta = await fetch('http://localhost:8000/api/produtos/cadastro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (resposta.ok) {
        alert("Produto cadastrado com sucesso!");
        
        setFormData({
          nome: '', categoria: '', preco_compra: '', preco_venda: '', tipo: '', unidade: '', descricao: ''
        });
      } else {
        alert("Erro ao cadastrar. Verifique se o backend aceitou os dados.");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Erro de conexão com o servidor. O backend está ligado?");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      <cad.Background />

      <cad.ContainerTitle>
        <cad.Title>Cadastro de Produtos</cad.Title>
        <cad.ContainerArrow>
          <FaArrowLeft
            className="arrow"
            onClick={() => navigate('/constrular/produtos/index')}
          />
        </cad.ContainerArrow>
      </cad.ContainerTitle>

      <cad.ContainerForm>
        <cad.Form onSubmit={handleSubmit}>
          <cad.ContainerLabel>
            <cad.Label>Nome</cad.Label>
            <cad.Input type="text" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required />
          </cad.ContainerLabel>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Categoria</cad.Label>
              <cad.Select name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="">Selecione...</option>
                {categorias.map(cat => (
                  <option key={cat.id_categoria || cat.id} value={cat.id_categoria || cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </cad.Select>           
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Compra</cad.Label>
              <cad.Input type="number" step="0.01" placeholder='0,00'
                name="preco_compra" 
                value={formData.preco_compra} 
                onChange={handleChange}
                 />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Venda</cad.Label>
              <cad.Input type="number" step="0.01" placeholder='0,00' 
                name="preco_venda" 
                value={formData.preco_venda} 
                onChange={handleChange}
                />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Tipo</cad.Label>
              <cad.Select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="">Selecione o tipo...</option>
                {tiposOpcoes.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </cad.Select>            
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Unidade</cad.Label>
              <cad.Input 
                type="text" 
                name="unidade" 
                value={formData.unidade} 
                onChange={handleChange}
              />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerLabel>
            <cad.Label>Descrição</cad.Label>
            <cad.Obs 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange}
              />
          </cad.ContainerLabel>

          <cad.DivButton>
            <cad.Button type="submit">Cadastrar</cad.Button>
          </cad.DivButton>
        </cad.Form>
      </cad.ContainerForm>
    </>
  );
}
