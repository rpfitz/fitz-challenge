# Frontend do Projeto de Registro de Ponto Eletrônico

Este projeto é a parte frontend do desafio do sistema de Registro de Ponto Eletrônico. Ele foi desenvolvido utilizando o framework Angular.

## Rotas

Página Inicial (/): Página principal.

Registro de Ponto (/NOMEDOCOLABORADOR/registrar): Esta rota permite que os colaboradores acessem o formulário de registro de ponto eletrônico. Eles devem preencher informações obrigatórias, como nome, email e CPF, além de selecionar seus conhecimentos. Esta página é acessada por meio de um link único para cada colaborador.

Lista de Registros (/registros): Os administradores acessam esta rota para visualizar todos os registros enviados pelos colaboradores. Os registros são listados em ordem alfabética de nome. A partir desta lista, os administradores podem clicar em registros individuais para visualizar detalhes e validar ou não validar o registro.

Detalhes e Validação de Registro (/NOMEDOCOLABORADOR/validar): Os administradores podem acessar esta rota clicando em registros individuais na lista de registros. Aqui, eles podem visualizar todos os detalhes do registro e têm a opção de validá-lo ou não validá-lo. A data e a hora da validação são registradas quando a validação é concluída com sucesso.

## Requisitos do Sistema

-  Node.js

## Como Iniciar o Servidor de Desenvolvimento

1. Instalar as dependências:

```bash npm install```

Servidor de desenvolvimento:

```bash npm start```

Iniciará o servidor em http://localhost:4200/.

## Estrutura do Projeto
A estrutura de diretórios deste projeto é organizada da seguinte forma:

- src/: Contém todo o código-fonte do projeto.
- app/: Contém os componentes, serviços e módulos principais.
- assets/: Contém arquivos estáticos, como imagens e arquivos CSS.
- environments/: Contém os arquivos de variáveis de ambiente.

## Build do Projeto
Criará uma pasta dist/ na raiz do projeto com os arquivos de build:

```bash npm run build```

## Testes
Para executar os testes unitários utlizando o Karma., use o seguinte comando:

```bash npm test```
