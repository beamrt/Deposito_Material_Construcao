# Versão SLIM do python e oficial
FROM python:3.11-slim

# Definindo o diretorio de trabalho dentro do container
WORKDIR /app

# Evita que o python grave arquivos .pyc do disco
ENV PYTHONDONTWRITEBYCODE=1

# Garante o envio de logs do python direto no terminal do docker
ENV PYTHONUNBUFFERED=1

# Instalando as dependencias do sistema operacional necessárias para o MYSQL e MONGODB
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos de dependências do Python para o container
COPY requirements.txt .

# Atualiza o PIP e instala as bibliotecas
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Copiando o restante do código do backend para dentro do container
COPY . .

# Expondo a porta que o Django utiliza
EXPOSE 8000
