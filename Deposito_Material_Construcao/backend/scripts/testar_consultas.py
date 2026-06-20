from pymongo import MongoClient
from datetime import datetime, timedelta

def executar_consultas():
    client = MongoClient('mongodb://localhost:27017/')
    db = client['constrular_dashboard']
    vendas = db['vendas']

    print("=== INICIANDO CONSULTAS ANALÍTICAS (AGGREGATION FRAMEWORK) ===\n")

    # ---------------------------------------------------------
    # CONSULTA 1: KPIs Gerais (Faturamento Total e Ticket Médio)
    # Pergunta de negócio: Qual o faturamento total e a média de gasto por venda?
    # Operadores: $group, $sum, $avg, $project
    # ---------------------------------------------------------
    print("1. KPIs GERAIS:")
    pipeline_kpis = [
        {"$group": {
            "_id": None,
            "faturamento_total": {"$sum": "$valor_total_venda"},
            "ticket_medio": {"$avg": "$valor_total_venda"},
            "total_pedidos": {"$sum": 1}
        }},
        {"$project": {
            "_id": 0,
            "faturamento_total": {"$round": ["$faturamento_total", 2]},
            "ticket_medio": {"$round": ["$ticket_medio", 2]},
            "total_pedidos": 1
        }}
    ]
    for doc in vendas.aggregate(pipeline_kpis): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 2: Ranking de Produtos Mais Vendidos (Top 5)
    # Pergunta de negócio: Quais são os 5 produtos que mais saem do estoque em quantidade?
    # Operadores: $unwind, $group, $sum, $sort, $limit
    # ---------------------------------------------------------
    print("2. TOP 5 PRODUTOS MAIS VENDIDOS:")
    pipeline_top_produtos = [
        {"$unwind": "$itens"}, # Abre o array de itens (exigência da rubrica)
        {"$group": {
            "_id": "$itens.nome",
            "quantidade_vendida": {"$sum": "$itens.quantidade"}
        }},
        {"$sort": {"quantidade_vendida": -1}},
        {"$limit": 5}
    ]
    for doc in vendas.aggregate(pipeline_top_produtos): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 3: Faturamento por Categoria (Gráfico de Pizza)
    # Pergunta de negócio: Como o faturamento está distribuído entre as categorias (Básico, Acabamento, etc)?
    # Operadores: $unwind, $group, $sum, $multiply
    # ---------------------------------------------------------
    print("3. FATURAMENTO POR CATEGORIA:")
    pipeline_categorias = [
        {"$unwind": "$itens"},
        {"$group": {
            "_id": "$itens.categoria",
            "receita_gerada": {"$sum": {"$multiply": ["$itens.quantidade", "$itens.valor_unitario"]}}
        }},
        {"$sort": {"receita_gerada": -1}}
    ]
    for doc in vendas.aggregate(pipeline_categorias): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 4: Evolução de Vendas (Série Temporal Diária)
    # Pergunta de negócio: Qual foi o faturamento diário para plotar no gráfico de linha?
    # Operadores: $group, dateToString (operador de data)
    # ---------------------------------------------------------
    print("4. SÉRIE TEMPORAL (FATURAMENTO DIÁRIO):")
    pipeline_serie = [
        {"$group": {
            "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$data_venda"}},
            "faturamento_dia": {"$sum": "$valor_total_venda"}
        }},
        {"$sort": {"_id": -1}}, # Ordena da data mais recente para a mais antiga
        {"$limit": 5} # Mostrando apenas os últimos 5 dias para não poluir o terminal
    ]
    for doc in vendas.aggregate(pipeline_serie): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 5: Desempenho por Filial
    # Pergunta de negócio: Qual filial traz o maior volume financeiro e quantidade de clientes?
    # Operadores: $group, $sum, $addToSet (distintos)
    # ---------------------------------------------------------
    print("5. DESEMPENHO POR FILIAL (COM CONTAGEM DE CLIENTES ÚNICOS):")
    pipeline_filiais = [
        {"$group": {
            "_id": "$filial",
            "faturamento": {"$sum": "$valor_total_venda"},
            "clientes_unicos": {"$addToSet": "$cliente_id"} # Agrupa IDs sem repetir
        }},
        {"$project": {
            "faturamento": {"$round": ["$faturamento", 2]},
            "total_clientes_unicos": {"$size": "$clientes_unicos"} # Conta o tamanho do array gerado
        }},
        {"$sort": {"faturamento": -1}}
    ]
    for doc in vendas.aggregate(pipeline_filiais): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 6: Análise de Preço Médio por Categoria
    # Pergunta de negócio: Qual o valor médio dos produtos vendidos em cada categoria?
    # Operadores: $unwind, $group, $avg
    # ---------------------------------------------------------
    print("6. PREÇO MÉDIO DOS ITENS POR CATEGORIA:")
    pipeline_preco_medio = [
        {"$unwind": "$itens"},
        {"$group": {
            "_id": "$itens.categoria",
            "preco_medio_venda": {"$avg": "$itens.valor_unitario"}
        }},
        {"$project": {
            "preco_medio_venda": {"$round": ["$preco_medio_venda", 2]}
        }}
    ]
    for doc in vendas.aggregate(pipeline_preco_medio): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 7: Ranking de Melhores Clientes do Mês Atual
    # Pergunta de negócio: Quais os 3 clientes que mais gastaram no mês atual (Junho/2026)?
    # Operadores: $match (data), $group, $sum, $sort, $limit
    # ---------------------------------------------------------
    print("7. TOP 3 CLIENTES DO MÊS (FILTRO DE DATA):")
    data_inicio = datetime(2026, 6, 1)
    data_fim = datetime(2026, 6, 30, 23, 59, 59)
    
    pipeline_clientes = [
        {"$match": {
            "data_venda": {"$gte": data_inicio, "$lte": data_fim}
        }},
        {"$group": {
            "_id": "$cliente_nome",
            "total_gasto": {"$sum": "$valor_total_venda"},
            "compras_feitas": {"$sum": 1}
        }},
        {"$sort": {"total_gasto": -1}},
        {"$limit": 3}
    ]
    for doc in vendas.aggregate(pipeline_clientes): print(doc)
    print("-" * 50)


    # ---------------------------------------------------------
    # CONSULTA 8: Consulta Complexa com Múltiplos Estágios
    # Pergunta de negócio: Quais as categorias mais lucrativas exclusivamente na 'Matriz - Araras'?
    # Operadores: $match (antes), $unwind, $group, $project, $sort
    # ---------------------------------------------------------
    print("8. CONSULTA COMPLEXA (FILTRO -> UNWIND -> AGRUPAMENTO -> ORDENAÇÃO):")
    pipeline_complexo = [
        {"$match": {"filial": "Matriz - Araras"}}, # Poda os documentos primeiro
        {"$unwind": "$itens"}, # Abre o array
        {"$group": {
            "_id": "$itens.categoria",
            "receita": {"$sum": {"$multiply": ["$itens.quantidade", "$itens.valor_unitario"]}}
        }},
        {"$project": {
            "receita_total": {"$round": ["$receita", 2]}
        }},
        {"$sort": {"receita_total": -1}}
    ]
    for doc in vendas.aggregate(pipeline_complexo): print(doc)
    print("===========================================================================")

if __name__ == '__main__':
    executar_consultas()