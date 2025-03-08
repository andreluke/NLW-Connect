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
   git clone https://github.com/andreluke/NLW-Connect/
   cd NLW-Connect
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
   docker compose up -d
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
├─ .env.example
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

## 📁 Estrutura de Pastas e Arquivos

### `api/`

Pasta principal que contém a implementação de uma API, incluindo código-fonte, configurações e testes.

---

#### `.github/`

Armazena arquivos de configuração do GitHub Actions.

- **`workflows/`**  
  Diretório onde os fluxos de trabalho do GitHub Actions são definidos.

  - **`workflow.yml`**  
    Arquivo de configuração para os fluxos de trabalho de CI/CD.

---

#### `.vscode/`

Configurações específicas do VSCode.

- **`settings.json`**  
  Arquivo para personalizar o ambiente de desenvolvimento no VSCode.

---

#### `build/`

Arquivos relacionados à construção e inicialização do projeto.

- **`server.mjs`**  
  Arquivo de inicialização do servidor, utilizando ES Modules.

---

#### `src/`

Contém o código-fonte da aplicação.

- **`src/__test__/`**  
  Diretório que armazena testes unitários.

  - **`src/__test__/mocks/`**  
    Contém mocks utilizados nos testes.

    - **`access-invite-link.mock.ts`**  
        Mock de dados para testar o link de convite de acesso.

    - **`constant.mock.ts`**  
        Mock com dados constantes utilizados em múltiplos testes.

    - **`get-ranking.mock.ts`**  
        Mock para testar o ranking de usuários.

    - **`get-subscriber-invite-clicks.mock.ts`**  
        Mock para testar os cliques de convite de assinantes.

    - **`get-subscriber-invites-count.mock.ts`**  
        Mock para testar a contagem de convites de assinantes.

    - **`get-subscriber-ranking-position.mock.ts`**  
        Mock para testar a posição no ranking de assinantes.

    - **`index.ts`**  
        Arquivo principal que importa e gerencia todos os mocks.

    - **`subscribe-to-event.mock.ts`**  
        Mock para testar a inscrição em eventos.

    - **`utils.mock.ts`**  
        Mock de utilitários compartilhados nos testes.

  - **`access-invite-link.test.ts`**  
    Teste unitário para o link de convite de acesso.

  - **`get-ranking.test.ts`**  
    Teste unitário para obter o ranking de usuários.

  - **`get-subscriber-invite-clicks.test.ts`**  
    Teste unitário para os cliques nos links de convite de assinantes.

  - **`get-subscriber-invites-count.test.ts`**  
    Teste unitário para a contagem de convites de assinantes.

  - **`get-subscriber-ranking-position.test.ts`**  
    Teste unitário para obter a posição no ranking de assinantes.

  - **`subscribe-to-event.test.ts`**  
    Teste unitário para inscrição em eventos.

---

- **`@types/`**  
  Definições de tipos TypeScript para a aplicação.

  - **`IAccessInviteLink.ts`**  
    Interface para o link de convite de acesso.

  - **`IGetRanking.ts`**  
    Interface para obter ranking de usuários.

  - **`IGetSubscriberInviteClicks.ts`**  
    Interface para obter os cliques de convite de assinantes.

  - **`IGetSubscriberInvitesCount.ts`**  
    Interface para obter a contagem de convites de assinantes.

  - **`IGetSubscriberRankingPosition.ts`**  
    Interface para obter a posição no ranking de assinantes.

  - **`index.ts`**  
    Arquivo principal para exportação de todos os tipos.

  - **`ISubscribeToEvent.ts`**  
    Interface para inscrição em eventos.

---

- **`config/`**  
  Arquivos de configuração da aplicação.

  - **`base-config.ts`**  
    Configurações base da aplicação.

  - **`plugins.ts`**  
    Configurações de plugins utilizados na aplicação.

  - **`routes.ts`**  
    Arquivo para definir as rotas principais da aplicação.

---

- **`drizzle/`**  
  Arquivos relacionados ao ORM Drizzle e migrações do banco de dados.

  - **`migrations/`**  
    Scripts para migração de banco de dados.

    - **`meta/`**  
      Armazena metadados de migrações.

      - **`_journal.json`**  
        Registro das migrações aplicadas.

      - **`0000_snapshot.json`**  
        Arquivo de snapshot de migração.

    - **`0000_tough_lifeguard.sql`**  
      Arquivo SQL de migração para o banco de dados.

  - **`schema/`**  
    Define o esquema do banco de dados.

    - **`subscriptions.ts`**  
      Define o modelo de assinaturas no banco de dados.

  - **`client.ts`**  
    Arquivo que configura o cliente Drizzle para interagir com o banco de dados.

---

- **`enums/`**  
  Contém enums utilizados na aplicação.

  - **`status-code.ts`**  
    Enum que define códigos de status HTTP.

---

- **`functions/`**  
  Contém as funções principais da API.

  - **`access-invite-link.ts`**  
    Função para gerar e gerenciar links de convite de acesso.

  - **`get-ranking.ts`**  
    Função para obter o ranking de usuários.

  - **`get-subscriber-invite-clicks.ts`**  
    Função para obter os cliques de convite de assinantes.

  - **`get-subscriber-invites-count.ts`**  
    Função para obter a contagem de convites de assinantes.

  - **`get-subscriber-ranking-position.ts`**  
    Função para obter a posição no ranking de assinantes.

  - **`index.ts`**  
    Arquivo principal para exportação das funções.

  - **`subscribe-to-event.ts`**  
    Função para gerenciar inscrições em eventos.

---

- **`redis/`**  
  Configurações do cliente Redis para comunicação com o banco de dados Redis.

  - **`client.ts`**  
    Arquivo que configura o cliente Redis para a aplicação.

---

- **`routes/`**  
  Contém a definição das rotas da API.

  - **`access-invite-link-route.ts`**  
    Rota para gerenciar os links de convite de acesso.

  - **`get-ranking-route.ts`**  
    Rota para obter o ranking de usuários.

  - **`get-subscriber-invite-clicks-route.ts`**  
    Rota para obter os cliques de convite de assinantes.

  - **`get-subscriber-invites-count-route.ts`**  
    Rota para obter a contagem de convites de assinantes.

  - **`get-subscriber-ranking-position-route.ts`**  
    Rota para obter a posição no ranking de assinantes.

  - **`index.ts`**  
    Arquivo principal para exportação das rotas.

  - **`subscribe-to-item-route.ts`**  
    Rota para gerenciar inscrições em itens.

---

- **`settings/`**  
  Configurações de ambiente.

  - **`env.ts`**  
    Arquivo que carrega variáveis de ambiente.

---

- **`server.ts`**  
  Arquivo principal para inicializar o servidor da aplicação.

---

#### `.env.example`

Exemplo de arquivo `.env` contendo variáveis de ambiente usadas na aplicação.

#### `.gitignore`

Lista de arquivos e pastas a serem ignorados pelo Git.

#### `api.http`

Arquivo usado para testar as rotas da API, provavelmente com uma ferramenta de HTTP client.

#### `biome.json`

Arquivo de configuração relacionado ao Biome, possivelmente um sistema de análise de desempenho ou ferramenta de testes.

#### `docker-compose.yml`

Arquivo de configuração para a execução de contêineres Docker.

#### `drizzle.config.ts`

Configuração do Drizzle ORM.

#### `jest.config.js`

Arquivo de configuração do Jest para testes unitários.

#### `package-lock.json`

Arquivo que mantém a versão exata das dependências instaladas no projeto.

#### `package.json`

Arquivo que define as dependências e scripts do projeto.

#### `README.md`

Documento de descrição do projeto, com instruções sobre como usá-lo.

#### `tsconfig.json`

Arquivo de configuração do TypeScript.

#### `tsup.config.ts`

Configuração do bundler `tsup`, utilizado para compilar o código TypeScript.

## 📜 Licença

Este projeto está sob a licença **ISC**.

---

🚀 **Desenvolvido com Fastify e Drizzle ORM para máxima performance e eficiência!**
