import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import Header from '../../../components/Header/Header';
import Sidebar from '../../../components/Sidebar/Sidebar';
import * as cad from './styled';

export default function Cadastro() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    id_categoria: '', 
    marca: '',
    unidade_medida: '',
    preco_custo: '',
    preco_venda: '',
    margem_lucro: '',
    descricao: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const custoLimpo = String(produto.preco_custo).replace(',', '.').trim();
    const vendaLimpa = String(produto.preco_venda).replace(',', '.').trim();

    const custo = parseFloat(custoLimpo) || 0;
    const venda = parseFloat(vendaLimpa) || 0;
    const lucro = venda - custo;

    const pacotePronto = {
      ...produto,
      preco_custo: Number(custo.toFixed(2)),
      preco_venda: Number(venda.toFixed(2)),
      margem_lucro: Number(lucro.toFixed(2))
    };

    console.log("PACOTE SENDO ENVIADO:", pacotePronto); 

    try {
      const response = await fetch('http://localhost:8000/api/produtos/cadastro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacotePronto),
      });

      if (response.status === 201) {
        alert('Produto cadastrado com sucesso!');
        navigate('/constrular/produtos/index'); 
      } else {
        const erros = await response.json();
        alert('Erro ao cadastrar. Verifique o console para mais detalhes.');
        console.log("Erros do Django:", erros);
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
      console.error(error);
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
        <cad.Form>
          <cad.ContainerLabel>
            <cad.Label>Nome</cad.Label>
            <cad.Input 
              type="text" 
              name="nome"
              value={produto.nome}
              onChange={handleChange}
            />
          </cad.ContainerLabel>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Categoria (ID)</cad.Label>
              <cad.Input 
                type="text"
                name="id_categoria"
                value={produto.id_categoria}
                onChange={handleChange}
              />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Custo</cad.Label>
              <cad.Input 
                type="text"
                name="preco_custo"
                value={produto.preco_custo}
                onChange={handleChange}
              />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Preço de Venda</cad.Label>
              <cad.Input 
                type="text"
                name="preco_venda"
                value={produto.preco_venda}
                onChange={handleChange}
              />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerWrapper>
            <cad.ContainerLabel>
              <cad.Label>Marca</cad.Label>
              <cad.Input 
                type="text"
                name="marca"
                value={produto.marca}
                onChange={handleChange}
              />
            </cad.ContainerLabel>

            <cad.ContainerLabel>
              <cad.Label>Unidade</cad.Label>
              <cad.Input 
                type="text"
                name="unidade_medida"
                value={produto.unidade_medida}
                onChange={handleChange}
              />
            </cad.ContainerLabel>
          </cad.ContainerWrapper>

          <cad.ContainerLabel>
            <cad.Label>Descrição</cad.Label>
            <cad.Obs 
              name="descricao"
              value={produto.descricao}
              onChange={handleChange}
            />
          </cad.ContainerLabel>

          <cad.DivButton>
            <cad.Button type="button" onClick={handleSubmit}>Cadastrar</cad.Button>
          </cad.DivButton>
        </cad.Form>
      </cad.ContainerForm>
    </>
  );
}