# T5 - Pet Lovers 5

Sistema de gerenciamento para pet shop com arquitetura cliente-servidor (front-end e back-end).

## Tecnologias

### Back-end
- Node.js
- TypeScript
- ExpressJS
- API REST + Fetch API

### Front-end
- React
- TypeScript
- Bootstrap
- CSS

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Back-end (`/Back`)
- API RESTful para gerenciar clientes, pets, produtos e serviços
- Estrutura MVC
- Operações CRUD completas

### Front-end (`/Front`)
- Interface de usuário responsiva em React
- Componentes para cadastro e visualização de dados
- Integração com a API do back-end

## Como executar

### Back-end
```bash
cd Back
npm install
# Executa em modo de desenvolvimento com hot-reload
npm run dev     
# ou
npm run start   # Compila e executa a aplicação
```

### Front-end
```bash
cd Front
npm install
npm start       # Inicia o servidor de desenvolvimento
```

## Principais funcionalidades

- Cadastro de clientes
- Gerenciamento de pets
- Controle de produtos e serviços
- Registro de consumo
- Listagens e relatórios
  
### Portas
O Back-End está rodando na porta 3001 e o Front-end na porta 3000.
