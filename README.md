# NodeNLW - API de Inscrições para Eventos

Esta é uma API desenvolvida com **Fastify**, **Drizzle ORM** e **PostgreSQL** para gerenciar inscrições de eventos. A API inclui funcionalidades como inscrição de participantes, rastreamento de convites e rankings de inscritos.

## 📁 Estrutura do Projeto

```sh
api/
├── src/
│   ├── functions/             # Lógica principal da API
│   ├── routes/                # Definição de rotas da API
│   ├── config/                # Configurações do servidor
│   ├── drizzle/               # Configuração do banco de dados e migrações
│   ├── redis/                 # Configuração do Redis
│   ├── settings/              # Variáveis de ambiente
│   ├── __test__/              # Testes automatizados
│   ├── @types/                # Definição de tipos TypeScript
│   └── server.ts              # Arquivo principal do servidor
├── .github/workflows/         # Configuração de CI/CD
├── build/                     # Arquivos compilados
├── .env                       # Arquivo de variáveis de ambiente
├── docker-compose.yml         # Configuração para Docker
├── package.json               # Dependências do projeto
└── tsconfig.json              # Configuração do TypeScript
```

## 🚀 Tecnologias Utilizadas

- **Fastify**: Framework web rápido e eficiente.
- **Drizzle ORM**: ORM moderno e leve para TypeScript.
- **PostgreSQL**: Banco de dados relacional utilizado.
- **Redis**: Utilizado para cache e otimizações de performance.
- **Jest**: Framework para testes automatizados.
- **TypeScript**: Tipagem estática para maior segurança no código.

## ⚙️ Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Docker](https://www.docker.com/) para rodar o banco de dados localmente

### Passos para Rodar o Projeto

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/nodenlw.git
   cd nodenlw
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.dev` com base no `.env.example`
   - Ajuste os valores conforme necessário

4. Suba o banco de dados com Docker:

   ```sh
   docker-compose up -d
   ```

5. Rode as migrações do banco de dados:

   ```sh
   npm run migrate
   ```

6. Inicie o servidor em modo desenvolvimento:

   ```sh
   npm run dev
   ```

7. Acesse a API:
   - Por padrão, o servidor rodará em `http://localhost:3000`
   - Documentação Swagger disponível em `http://localhost:3000/docs`

## 📖 Documentação Swagger

A API disponibiliza uma documentação interativa com **Swagger** acessível via `http://localhost:3000/docs`. As seguintes rotas estão disponíveis:

### **Rotas disponíveis**

- **`POST /subscriptions`** - Inscreve um usuário no evento.
- **`GET /invites/{subscriberId}`** - Acessa o link de convite e redireciona o usuário.
- **`GET /subscribers/{subscriberId}/ranking/clicks`** - Obtém o número de cliques no link de convite do inscrito.
- **`GET /subscribers/{subscriberId}/ranking/count`** - Obtém a contagem de convites enviados por um inscrito.
- **`GET /subscribers/{subscriberId}/ranking/position`** - Obtém a posição no ranking de um inscrito.
- **`GET /ranking`** - Obtém o ranking geral dos inscritos.
- **`GET /subscribers/{subscriberId}`** - Obtém detalhes de um inscrito específico.
- **`DELETE /subscriptions/{subscriptionId}`** - Remove a inscrição de um usuário em um evento.

## 🛠️ Comandos Disponíveis

| Comando              | Descrição                                    |
|----------------------|----------------------------------------------|
| `npm run dev`       | Inicia o servidor em modo desenvolvimento    |
| `npm run build`     | Compila o código para produção               |
| `npm run start`     | Inicia o servidor em produção                |
| `npm run generate`  | Gera schemas do Drizzle ORM                  |
| `npm run migrate`   | Aplica as migrações no banco de dados        |
| `npm run test`      | Executa os testes automatizados              |

## 🧪 Testes

Os testes utilizam **Jest** e estão localizados no diretório `src/__test__/`. Para rodá-los, utilize:

```sh
npm run test
```

## 📜 Licença

Este projeto está sob a licença **ISC**.

---

🚀 **Desenvolvido com Fastify e Drizzle ORM para máxima performance e eficiência!**

### File Tree completa

```sh
api/
├─ .github/
│  └─ workflows/
│     └─ workflow.yml
├─ .vscode/
│  └─ settings.json
├─ build/
│  └─ server.mjs
├─ src/
│  ├─ __test__/
│  │  ├─ mocks/
│  │  │  ├─ access-invite-link.mock.ts
│  │  │  ├─ constant.mock.ts
│  │  │  ├─ get-ranking.mock.ts
│  │  │  ├─ get-subscriber-invite-clicks.mock.ts
│  │  │  ├─ get-subscriber-invites-count.mock.ts
│  │  │  ├─ get-subscriber-ranking-position.mock.ts
│  │  │  ├─ index.ts
│  │  │  ├─ subscribe-to-event.mock.ts
│  │  │  └─ utils.mock.ts
│  │  ├─ access-invite-link.test.ts
│  │  ├─ get-ranking.test.ts
│  │  ├─ get-subscriber-invite-clicks.test.ts
│  │  ├─ get-subscriber-invites-count.test.ts
│  │  ├─ get-subscriber-ranking-position.test.ts
│  │  └─ subscribe-to-event.test.ts
│  ├─ @types/
│  │  ├─ IAccessInviteLink.ts
│  │  ├─ IGetRanking.ts
│  │  ├─ IGetSubscriberInviteClicks.ts
│  │  ├─ IGetSubscriberInvitesCount.ts
│  │  ├─ IGetSubscriberRankingPosition.ts
│  │  ├─ index.ts
│  │  └─ ISubscribeToEvent.ts
│  ├─ config/
│  │  ├─ base-config.ts
│  │  ├─ plugins.ts
│  │  └─ routes.ts
│  ├─ drizzle/
│  │  ├─ migrations/
│  │  │  ├─ meta/
│  │  │  │  ├─ _journal.json
│  │  │  │  └─ 0000_snapshot.json
│  │  │  └─ 0000_tough_lifeguard.sql
│  │  ├─ schema/
│  │  │  └─ subscriptions.ts
│  │  └─ client.ts
│  ├─ enums/
│  │  └─ status-code.ts
│  ├─ functions/
│  │  ├─ access-invite-link.ts
│  │  ├─ get-ranking.ts
│  │  ├─ get-subscriber-invite-clicks.ts
│  │  ├─ get-subscriber-invites-count.ts
│  │  ├─ get-subscriber-ranking-position.ts
│  │  ├─ index.ts
│  │  └─ subscribe-to-event.ts
│  ├─ redis/
│  │  └─ client.ts
│  ├─ routes/
│  │  ├─ access-invite-link-route.ts
│  │  ├─ get-ranking-route.ts
│  │  ├─ get-subscriber-invite-clicks-route.ts
│  │  ├─ get-subscriber-invites-count-route.ts
│  │  ├─ get-subscriber-ranking-position-route.ts
│  │  ├─ index.ts
│  │  └─ subscribe-to-item-route.ts
│  ├─ settings/
│  │  └─ env.ts
│  └─ server.ts
├─ .env
├─ .env.dev
├─ .gitignore
├─ api.http
├─ biome.json
├─ docker-compose.yml
├─ drizzle.config.ts
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.json
└─ tsup.config.ts
```
