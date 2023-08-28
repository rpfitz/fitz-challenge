# Backend do Projeto

Este é o backend que permite que os colaboradores registrem seu ponto eletrônico e os administradores validem esses registros.

## Frameworks:

- NestJS
- TypeORM (PostgreSQL ou MySQL).

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (ou [yarn](https://yarnpkg.com/))
- PostgreSQL ou MySQL

## Instalação

1. Clone o repositório:

```git clone https://seurepositorio.com/xxz-backend.git```

2. Instale as dependências:

```cd backend```
```npm install```

3. Configure o banco de dados:

4. Crie um banco de dados no PostgreSQL ou MySQL.

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente para conexão com o banco de dados.
Execute as migrações para criar as tabelas no banco de dados:

```bash npm run migration:run```

5. Inicie o servidor:

```bash npm run start:dev```

# Funcionalidades
- Registro de ponto eletrônico para colaboradores.
- Validação de registros por administradores.
- Listagem de registros em ordem alfabética de nome.
- Pesquisa de registros por informações específicas.

# Arquitetura
O projeto segue a arquitetura do NestJS, que promove a separação de preocupações em módulos, controladores e serviços.

Além disso, o TypeORM é usado para a interação com o banco de dados.

- src/controllers: Contém os controladores que lidam com as requisições HTTP.
- src/entities: Define as entidades de banco de dados usando o TypeORM.
- src/services: Implementa a lógica de negócios e validações.
- src/modules: Cada módulo encapsula controladores, serviços e configurações relacionadas.
