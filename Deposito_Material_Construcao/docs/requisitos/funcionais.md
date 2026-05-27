# Requisitos Funcionais

---

## RF001 — Cadastro de Produtos

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Cadastro de Produtos |
| **Descrição** | O sistema deve permitir cadastrar produtos. |
| **Atores** | Funcionário |
| **Pós-condições** | O produto é registrado no banco de dados. |
| **Dependências** | O sistema de validação de dados deve ser implementado corretamente. |

### Fluxo Principal

1. O usuário acessa a tela de cadastro.
2. O usuário preenche os campos obrigatórios:
   - Nome
   - Preço
   - Categoria
   - Descrição
   - Tipo
3. O sistema valida os dados inseridos.
4. O sistema salva os dados no banco de dados.
5. O sistema exibe uma mensagem de sucesso informando que o cadastro foi realizado.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Produto já cadastrado | O sistema exibe mensagem informando que o produto já existe. |
| Campos obrigatórios não preenchidos | O sistema exibe mensagem indicando os campos obrigatórios. |

---

## RF002 — Controle de Estoque

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Controle de Estoque |
| **Descrição** | O sistema deve permitir a gestão completa de entrada e saída de produtos do estoque. |
| **Atores** | Funcionário |
| **Pós-condições** | A entrada ou saída é registrada no banco de dados. |
| **Dependências** | O sistema de validação de dados deve ser implementado corretamente. |

### Fluxo Principal

1. O usuário acessa a tela de estoque.
2. O usuário pode selecionar:
   - Entrada de estoque
   - Saída de estoque
3. O sistema valida os dados inseridos.
4. O sistema salva os dados no banco de dados.
5. O sistema atualiza automaticamente o estoque após:
   - Venda
   - Transferência entre filiais
6. O sistema exibe a quantidade disponível de cada produto.
7. O sistema exibe mensagem de sucesso.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Quantidade igual a `0` | O sistema exibe mensagem informando que a quantidade é inexistente. |
| Saída menor ou igual a `0` | O sistema exibe mensagem de erro informando valor inválido. |

---

## RF003 — Gestão de Múltiplas Lojas

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Gestão de Múltiplas Lojas |
| **Descrição** | O sistema deve permitir a gestão completa de múltiplas lojas. |
| **Atores** | Funcionário |
| **Pós-condições** | A filial é registrada no banco de dados. |
| **Dependências** | O sistema de validação de dados deve ser implementado corretamente. |

### Fluxo Principal

1. O usuário acessa a tela de cadastro de filiais.
2. O usuário preenche os campos obrigatórios:
   - Nome
   - CNPJ
   - Telefone
   - E-mail
3. Cada loja deve possuir seu próprio estoque.
4. O sistema valida os dados inseridos.
5. O sistema salva os dados no banco de dados.
6. O sistema permite visualizar o estoque por loja.
7. O sistema exibe mensagem de sucesso.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Filial já cadastrada | O sistema exibe mensagem informando que a filial já existe. |
| Campos obrigatórios não preenchidos | O sistema exibe mensagem informando os campos obrigatórios. |
| CNPJ inválido | O sistema exibe mensagem informando que o CNPJ é inválido. |
| E-mail inválido | O sistema exibe mensagem informando que o e-mail está incorreto. |

---

## RF004 — Registro de Vendas (PDV)

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Registro de Vendas (PDV) |
| **Descrição** | O sistema deve permitir o registro de vendas no módulo PDV. |
| **Atores** | Funcionário |
| **Pós-condições** | A venda é registrada no banco de dados. |
| **Dependências** | O sistema de validação de dados deve ser implementado corretamente. |

### Fluxo Principal

1. O usuário acessa o PDV.
2. O sistema permite selecionar:
   - Produtos
   - Quantidades
3. O sistema calcula automaticamente o valor total da venda.
4. O sistema valida os dados inseridos.
5. O sistema salva os dados no banco de dados.
6. O sistema atualiza automaticamente o estoque após a venda.
7. O usuário pode:
   - Cancelar a venda
   - Solicitar reembolso
8. O sistema exibe mensagem de sucesso.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Valor ou quantidade não preenchidos | O sistema exibe mensagem de obrigatoriedade. |
| Produto não adicionado ao PDV | O sistema exibe mensagem informando ausência de produtos. |
| Usuário não autenticado | O sistema bloqueia o acesso ao PDV. |

---

## RF005 — Controle de Usuários (Funcionários)

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Controle de Usuários (Funcionários) |
| **Descrição** | O sistema deve permitir o cadastro de funcionários com usuário e senha. |
| **Atores** | Administrador |
| **Pós-condições** | O funcionário é registrado no banco de dados. |
| **Dependências** | O sistema de validação de e-mail e CPF deve ser implementado corretamente. |

### Fluxo Principal

1. O administrador acessa a tela de cadastro.
2. O administrador preenche:
   - Nome
   - E-mail
   - Senha
   - CPF
3. O sistema valida os dados inseridos.
4. O sistema salva os dados no banco de dados.
5. O sistema exibe mensagem de sucesso.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| E-mail inválido | O sistema exibe mensagem solicitando correção. |
| E-mail já cadastrado | O sistema exibe mensagem informando duplicidade. |
| CPF inválido | O sistema exibe mensagem informando CPF inexistente. |

---

## RF006 — Relatórios

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Relatórios |
| **Descrição** | O sistema deve permitir a geração de relatórios de venda e estoque. |
| **Atores** | Usuário |
| **Pós-condições** | O relatório é exibido ao usuário com as informações solicitadas. |
| **Dependências** | O banco de dados deve possuir registros de vendas e estoque cadastrados. |

### Fluxo Principal

1. O usuário acessa a tela de relatório.
2. O usuário seleciona:
   - Relatório de vendas
   - Relatório de estoque
3. O usuário informa o período desejado.
4. O sistema valida os dados inseridos.
5. O sistema exibe o relatório na tela.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Nenhum período informado | O sistema solicita preenchimento das datas. |
| Nenhum dado encontrado | O sistema exibe aviso informando ausência de dados. |
| Falha na geração do relatório | O sistema exibe mensagem de erro. |

---

## RF007 — Gestão Financeira

### Informações Gerais

| Campo | Descrição |
|---|---|
| **Título** | Gestão Financeira |
| **Descrição** | O sistema deve permitir o controle financeiro da empresa. |
| **Atores** | Usuário |
| **Pós-condições** | As informações financeiras são registradas e atualizadas no sistema. |
| **Dependências** | O sistema de vendas deve estar integrado ao módulo financeiro. |

### Fluxo Principal

1. O usuário acessa a tela de gestão financeira.
2. O usuário registra as informações financeiras.
3. O sistema associa automaticamente as vendas ao controle financeiro.
4. O sistema exibe as informações financeiras.
5. O sistema calcula:
   - Lucro
   - Prejuízo
6. O sistema valida os dados inseridos.
7. O sistema atualiza os registros financeiros.

### Fluxo Alternativo

| Cenário | Resposta do Sistema |
|---|---|
| Falha no cálculo financeiro | O sistema exibe mensagem de erro. |
| Nenhum registro financeiro | O sistema exibe mensagem informando ausência de dados. |
| Campos obrigatórios não preenchidos | O sistema solicita preenchimento das informações. |

---