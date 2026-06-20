import random
from datetime import datetime, timedelta
from pymongo import MongoClient

def gerar_carga():
    client = MongoClient('mongodb://localhost:27017/')
    
    db = client['constrular_dashboard'] 
    
    colecao_vendas = db['vendas']

    colecao_vendas.delete_many({})
    print("Coleção anterior limpa. Iniciando geração de dados...")

    produtos_catalogo = [
        {"id": 101, "nome": "Cimento CP-II 50kg", "categoria": "Material Básico", "preco": 32.90},
        {"id": 102, "nome": "Tijolo Baiano 8 Furos", "categoria": "Material Básico", "preco": 0.85},
        {"id": 103, "nome": "Areia Média (m³)", "categoria": "Material Básico", "preco": 120.00},
        {"id": 201, "nome": "Argamassa AC-III 20kg", "categoria": "Acabamento", "preco": 28.50},
        {"id": 202, "nome": "Piso Porcelanato 60x60", "categoria": "Acabamento", "preco": 55.90},
        {"id": 301, "nome": "Tinta Acrílica Branca 18L", "categoria": "Pintura", "preco": 189.90},
        {"id": 302, "nome": "Massa Corrida 15kg", "categoria": "Pintura", "preco": 45.00},
        {"id": 401, "nome": "Tubo PVC 100mm", "categoria": "Hidráulica", "preco": 35.00},
        {"id": 501, "nome": "Fio de Cobre 2.5mm (Rolo)", "categoria": "Elétrica", "preco": 145.00}
    ]

    filiais = ["Matriz - Araras", "Filial - Limeira", "Filial - Rio Claro"]
    vendedores = ["Carlos Souza", "Ana Paula", "Marcos Silva", "Juliana Costa"]
    clientes = ["João da Silva", "Construtora Alfa", "Maria Oliveira", "Roberto Carlos", "Fernanda Lima"]

    vendas = []
    data_atual = datetime.now()

    for i in range(1, 501):
        dias_atras = random.randint(0, 90) 
        data_venda = data_atual - timedelta(days=dias_atras)

        num_itens = random.randint(1, 5)
        itens_venda = random.sample(produtos_catalogo, num_itens)

        itens_formatados = []
        valor_total_venda = 0

        for item in itens_venda:
            quantidade = random.randint(1, 20)
            
            if item["nome"] == "Tijolo Baiano 8 Furos":
                quantidade = random.randint(100, 1000)

            subtotal = round(quantidade * item["preco"], 2)
            valor_total_venda += subtotal

            itens_formatados.append({
                "produto_id": item["id"],
                "nome": item["nome"],
                "categoria": item["categoria"],
                "quantidade": quantidade,
                "valor_unitario": item["preco"]
            })

        venda = {
            "venda_id": f"VND-{data_venda.strftime('%Y%m%d')}-{i:04d}",
            "data_venda": data_venda,
            "filial": random.choice(filiais),
            "vendedor": random.choice(vendedores),
            "cliente_id": random.randint(1000, 1999),
            "cliente_nome": random.choice(clientes),
            "itens": itens_formatados,
            "valor_total_venda": round(valor_total_venda, 2)
        }
        vendas.append(venda)

    colecao_vendas.insert_many(vendas)
    print(f"Sucesso! {len(vendas)} vendas inseridas na coleção 'vendas'. O banco está pronto para as consultas analíticas!")

if __name__ == '__main__':
    gerar_carga()