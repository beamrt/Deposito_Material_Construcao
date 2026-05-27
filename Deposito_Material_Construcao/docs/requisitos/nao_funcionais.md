# Requisitos Não Funcionais

## RNF001 — Acesso

| Campo | Descrição |
|---|---|
| **Título** | Acesso |
| **Descrição** | O sistema deve ser acessado por meio de um navegador moderno. |
| **Prioridade** | Alta |
| **Objetivo** | Garantir que o sistema seja completamente acessível de qualquer navegador moderno e que todas as funcionalidades funcionem independentemente do browser utilizado. |
| **Dependências** | O sistema deve ser hospedado em um servidor de acordo com a necessidade do cliente. |
| **Compatibilidade** | Google Chrome, Edge, Safari, Opera, entre outros. |

---

## RNF002 — Interface Responsiva

| Campo | Descrição |
|---|---|
| **Título** | Interface responsiva |
| **Descrição** | O sistema deve funcionar corretamente em diferentes tamanhos de tela. |
| **Prioridade** | Alta |
| **Objetivo** | Garantir que o sistema seja acessível e utilizável em computadores, tablets e smartphones. |
| **Dependências** | O layout deve se adaptar automaticamente às diferentes resoluções de tela. |
| **Compatibilidade** | Qualquer aparelho que tenha acesso à internet. |
| **Usabilidade** | O sistema deve apresentar navegação intuitiva e boa experiência de uso em qualquer dispositivo. |

---

## RNF003 — Armazenamento em Banco de Dados

| Campo | Descrição |
|---|---|
| **Título** | Armazenamento em banco de dados |
| **Descrição** | O sistema deve utilizar um SGBD relacional ou não relacional (ex.: MySQL ou MongoDB) para armazenamento das informações. |
| **Prioridade** | Alta |
| **Objetivo** | O sistema deve armazenar todos os dados necessários de forma segura e organizada, facilitando a integração entre as funcionalidades. |
| **Dependências** | O servidor de banco de dados deve estar corretamente configurado e disponível para acesso. |
| **Métrica** | O tempo de resposta das requisições deve ser de até 2 segundos. |
| **Critérios de Aceitação** | O sistema deve suportar múltiplas requisições simultâneas sem perda de desempenho ou inconsistência nos dados. |
| **Segurança** | O sistema deve criptografar dados sensíveis, como senhas e CPF, utilizando algoritmos de segurança reconhecidos pelo mercado. |

---

## RNF004 — Facilidade de Uso

| Campo | Descrição |
|---|---|
| **Título** | Facilidade de Uso |
| **Descrição** | O sistema deve ser fácil de utilizar, mesmo por usuários com pouca experiência em tecnologia. |
| **Prioridade** | Média |
| **Objetivo** | Garantir uma navegação simples e intuitiva para facilitar o uso do sistema. |
| **Usabilidade** | As principais operações do sistema devem ser realizadas em no máximo 3 cliques. |
| **Dependências** | O sistema deve possuir interface intuitiva, organizada e visualmente agradável. |

---

## RNF005 — Manutenibilidade

| Campo | Descrição |
|---|---|
| **Título** | Manutenibilidade |
| **Descrição** | O sistema deve possuir código organizado e documentação adequada para facilitar futuras manutenções e atualizações. |
| **Prioridade** | Alta |
| **Objetivo** | Garantir que o sistema possa ser corrigido, atualizado e expandido de forma simples e compreensível pelos desenvolvedores. |
| **Dependências** | O código deve seguir padrões de organização e boas práticas de desenvolvimento. |

---

## RNF006 — Arquitetura

| Campo | Descrição |
|---|---|
| **Título** | Arquitetura |
| **Descrição** | O sistema deve ser desenvolvido utilizando Django com Python no backend, seguindo uma arquitetura modular de separação entre frontend e backend. |
| **Prioridade** | Alta |
| **Objetivo** | Garantir uma estrutura organizada, escalável e de fácil manutenção, permitindo maior desempenho, flexibilidade no armazenamento de dados e independência entre as camadas do sistema. |
| **Dependências** | Framework Django e linguagem Python. |

---

## RNF007 — Segurança

| Campo | Descrição |
|---|---|
| **Título** | Segurança |
| **Descrição** | O sistema deve exigir autenticação para o acesso, as senhas devem ser armazenadas de forma criptografada, além de restringir o acesso com base no perfil do usuário. |
| **Prioridade** | Alta |
| **Objetivo** | Garantir a proteção dos dados do sistema e dos usuários, evitando acessos não autorizados e assegurando que cada usuário tenha acesso apenas às funcionalidades permitidas pelo seu perfil. |
| **Dependências** | Sistema de autenticação de usuários, banco de dados para armazenamento seguro das credenciais, métodos de criptografia de senhas, controle de permissões e níveis de acesso por perfil de usuário. |

---