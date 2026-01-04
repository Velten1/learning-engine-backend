# Learning Engine - Backend

Backend da aplicação Learning Engine, uma plataforma para estudos usando a técnica Pomodoro e sistema de revisão espaçada (spaced repetition) inspirado no AnkiApp.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [API Endpoints](#-api-endpoints)
- [Autenticação](#-autenticação)
- [Banco de Dados](#-banco-de-dados)
- [Desenvolvimento](#-desenvolvimento)

## 🛠 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset JavaScript com tipagem estática
- **Prisma** - ORM para gerenciamento de banco de dados
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Configuração de Cross-Origin Resource Sharing

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 18 ou superior)
- npm ou yarn
- MySQL (versão 8.0 ou superior)
- Git

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Learning-Engine/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (veja [Configuração](#-configuração))

4. Configure o banco de dados:
```bash
# Gerar o Prisma Client
npm run prisma:generate

# Executar as migrações
npm run prisma:migrate

# (Opcional) Popular o banco com dados iniciais
npm run prisma:seed
```

5. Inicie o servidor:
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do diretório `backend` com as seguintes variáveis:

```env
# Porta do servidor
PORT=3001

# URL do frontend (para CORS)
FRONTEND_URL=http://localhost:3000

# URL de conexão com o banco de dados MySQL
DATABASE_URL="mysql://usuario:senha@localhost:3306/learning_engine"

# Secret para assinatura de tokens JWT
JWT_SECRET=seu_jwt_secret_aqui
```

### Exemplo de DATABASE_URL:
```
DATABASE_URL="mysql://root:senha123@localhost:3306/learning_engine"
```

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/          # Configurações (Prisma, etc.)
│   ├── controllers/     # Controladores (lógica de requisições/respostas)
│   ├── middleware/      # Middlewares (autenticação, etc.)
│   ├── repository/      # Repositórios (acesso ao banco de dados)
│   ├── routes/          # Rotas da API
│   ├── services/        # Serviços (lógica de negócio)
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Utilitários (JWT, etc.)
│   └── server.ts        # Arquivo principal do servidor
├── prisma/
│   ├── migrations/      # Migrações do banco de dados
│   ├── schema.prisma    # Schema do Prisma
│   └── seed.ts          # Seed para popular banco
├── dist/                # Código compilado (TypeScript → JavaScript)
├── package.json
├── tsconfig.json
└── README.md
```

### Arquitetura

O projeto segue o padrão de arquitetura em camadas:

1. **Routes** - Define os endpoints da API
2. **Controllers** - Processa requisições e respostas HTTP
3. **Services** - Contém a lógica de negócio
4. **Repository** - Abstrai o acesso ao banco de dados
5. **Middleware** - Intercepta requisições (autenticação, validação, etc.)

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor em modo watch (recompila automaticamente)

# Build
npm run build            # Compila TypeScript para JavaScript
npm start                # Inicia o servidor em modo produção

# Prisma
npm run prisma:generate  # Gera o Prisma Client
npm run prisma:migrate   # Executa as migrações do banco
npm run prisma:studio    # Abre o Prisma Studio (interface visual do banco)
npm run prisma:seed      # Popula o banco com dados iniciais
```

## 🔌 API Endpoints

### Autenticação (`/api/auth`)

- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter perfil do usuário autenticado
- `PUT /api/auth/me` - Editar perfil do usuário
- `POST /api/auth/renew-token` - Renovar token de autenticação
- `POST /api/auth/logout` - Logout do usuário

### Pomodoro (`/api/pomodoro`)

- `POST /api/pomodoro` - Criar nova sessão Pomodoro
- `GET /api/pomodoro` - Listar sessões Pomodoro do usuário
- `GET /api/pomodoro/:id` - Obter sessão Pomodoro específica
- `PUT /api/pomodoro/:id/complete` - Completar sessão Pomodoro
- `PUT /api/pomodoro/:id/abandon` - Abandonar sessão Pomodoro

### Reflexões (`/api/reflections`)

- `POST /api/reflections` - Criar nova reflexão
- `GET /api/reflections` - Listar reflexões do usuário
- `GET /api/reflections/:id` - Obter reflexão específica
- `PUT /api/reflections/:id` - Atualizar reflexão
- `DELETE /api/reflections/:id` - Deletar reflexão

### Histórico (`/api/history`)

- `GET /api/history` - Obter histórico de sessões Pomodoro

### Perguntas (`/api/questions`)

- `GET /api/questions` - Listar perguntas disponíveis
- `GET /api/questions/:id` - Obter pergunta específica

### Decks (`/api/decks`)

- `POST /api/decks` - Criar novo deck
- `GET /api/decks` - Listar decks do usuário
- `GET /api/decks/:id` - Obter deck específico
- `PUT /api/decks/:id` - Atualizar deck
- `DELETE /api/decks/:id` - Deletar deck

### Cards (`/api/cards`)

- `POST /api/cards` - Criar novo card
- `GET /api/cards/deck/:deckId` - Listar cards de um deck
- `GET /api/cards/:id` - Obter card específico
- `PUT /api/cards/:id` - Atualizar card
- `DELETE /api/cards/:id` - Deletar card
- `GET /api/cards/stats/new` - Obter cards novos do usuário
- `GET /api/cards/stats/learning` - Obter cards em aprendizagem
- `GET /api/cards/stats/due` - Obter cards para revisar
- `GET /api/cards/decks/stats` - Obter estatísticas de todos os decks
- `GET /api/cards/decks/:deckId/stats` - Obter estatísticas de um deck específico

### Revisões (`/api/reviews`)

- `POST /api/reviews` - Criar nova revisão de card
- `GET /api/reviews/card/:cardId` - Obter histórico de revisões de um card
- `GET /api/reviews/deck/:deckId` - Obter cards para revisar de um deck

### Health Check

- `GET /health` - Verificar status do servidor

## 🔐 Autenticação

A API utiliza autenticação baseada em JWT (JSON Web Tokens). A maioria dos endpoints requer autenticação através do middleware `authMiddleware`.

### Como funciona:

1. O usuário faz login através de `POST /api/auth/login`
2. O servidor retorna um token JWT que deve ser enviado em requisições subsequentes
3. O token pode ser enviado de duas formas:
   - **Cookie**: `token` (httpOnly)
   - **Header**: `Authorization: Bearer <token>`

### Endpoints protegidos:

Todos os endpoints, exceto `/api/auth/register`, `/api/auth/login` e `/health`, requerem autenticação.

## 🗄️ Banco de Dados

O projeto utiliza **Prisma** como ORM e **MySQL** como banco de dados.

### Modelos principais:

- **User** - Usuários do sistema
- **Pomodoro** - Sessões Pomodoro
- **Reflection** - Reflexões sobre sessões Pomodoro
- **Question** - Perguntas para reflexões
- **Deck** - Baralhos de cards
- **Card** - Cards de estudo (frente/verso)
- **ReviewHistory** - Histórico de revisões dos cards

### Migrações:

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy
```

### Prisma Studio:

Visualize e edite dados do banco através de uma interface gráfica:

```bash
npm run prisma:studio
```

Acesse: `http://localhost:5555`

## 💻 Desenvolvimento

### Modo Watch

Durante o desenvolvimento, use o modo watch para recompilação automática:

```bash
npm run dev
```

### Estrutura de Código

- **TypeScript** - Todo o código é escrito em TypeScript
- **ESLint/Prettier** - (Configure conforme necessário)
- **Padrão de nomenclatura**: camelCase para variáveis/funções, PascalCase para classes

### Adicionando Nova Funcionalidade

1. Crie o modelo no `prisma/schema.prisma` (se necessário)
2. Execute a migração: `npm run prisma:migrate`
3. Crie o repository em `src/repository/`
4. Crie o service em `src/services/`
5. Crie o controller em `src/controllers/`
6. Crie as rotas em `src/routes/`
7. Registre as rotas em `src/server.ts`

### Logs

O servidor utiliza `console.log` para logs. Em produção, considere usar uma biblioteca de logging como Winston ou Pino.

## 📝 Notas

- O servidor roda na porta `3001` por padrão
- O CORS está configurado para aceitar requisições do frontend em `http://localhost:3000`
- As senhas são hasheadas usando `bcryptjs` antes de serem armazenadas
- Os tokens JWT expiram após um período determinado (configure no código)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

