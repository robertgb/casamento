# CLAUDE.md — Robert & Millena Wedding Project

## Visão Geral

Site de casamento de Robert e Millena, com data marcada para **19 de julho de 2026** no Cerimonial Fina Estampa, Serra, ES (Brasil). Convidados podem ver detalhes do casamento, confirmar presença e reservar presentes. Os noivos gerenciam tudo via painel admin.

---

## Estrutura do Projeto

```
casamento/
├── backend/    Node.js + Express 5 + Prisma 7 + PostgreSQL
└── frontend/   React 18 + Vite 5 + Tailwind CSS 3
```

---

## Tech Stack

### Backend (`/backend`)
- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Linguagem:** TypeScript (dev via `tsx watch`)
- **ORM:** Prisma 7 com `@prisma/adapter-pg`
- **DB:** PostgreSQL
- **Auth:** JWT (`jsonwebtoken`) + bcrypt
- **Entry:** `src/server.ts` → `src/app.ts`

### Frontend (`/frontend`)
- **Framework:** React 18
- **Bundler:** Vite 5
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS 3
- **Roteamento:** React Router DOM v6
- **HTTP:** Axios (instância em `src/config/api.ts`, injeta JWT automaticamente)
- **Forms:** React Hook Form + Zod
- **Ícones:** Lucide React
- **SEO:** react-helmet-async
- **Deploy:** Vercel (SPA fallback em `vercel.json`)

---

## Banco de Dados (Prisma Schema)

| Model | Campos principais |
|---|---|
| `Gift` | id, name, description, price (Decimal), image (URL), link, reserved (bool), timestamps |
| `Guest` | id, name, confirmed (bool), giftId (Int?, FK→Gift), timestamps |
| `Admin` | id, name, email (unique), passwordHash, timestamps |

---

## API Routes (todas prefixadas com `/api`)

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/admin/login` | — | Login do admin |
| GET | `/gift` | — | Listar presentes |
| GET | `/gift/:id` | — | Detalhe de presente |
| PATCH | `/gift/:id/reserve` | — | Reservar presente (público) |
| POST | `/gift` | JWT | Criar presente |
| PUT | `/gift/:id` | JWT | Editar presente |
| DELETE | `/gift/:id` | JWT | Deletar presente |
| GET | `/guest` | — | Listar convidados |
| GET | `/guest/:id` | — | Detalhe de convidado |
| POST | `/guest` | — | Criar convidado (RSVP) |
| PUT | `/guest/:id` | — | Editar convidado |
| DELETE | `/guest/:id` | — | Deletar convidado |

---

## Rotas do Frontend

| Rota | Componente | Acesso |
|---|---|---|
| `/` | `HomePage` | Público |
| `/nossa-historia` | `StoryPage` | Público |
| `/presentes` | `GiftsPage` | Público |
| `/confirmar-presenca` | `ConfirmPresencePage` | Público |
| `/admin/login` | `LoginPage` | Público |
| `/admin/presentes` | `GiftsCrudPage` | Protegido (JWT) |
| `/admin/convidados` | `GuestsPage` | Protegido (JWT) |

---

## Arquitetura Frontend

- **`src/config/api.ts`** — Instância Axios com `VITE_API_URL`. Interceptor injeta `Bearer <token>` do `localStorage` em toda requisição.
- **`src/context/Admin/`** — Contexto de autenticação admin: `isAuthenticated`, `admin`, `token`, `login()`, `logout()`. Token persistido em `localStorage` como `admin_token`.
- **`src/context/Wedding/`** — Estado global de dados do casamento.
- **`src/services/`** — Camada de serviços HTTP (GiftService, GuestService, AdminService).
- **`src/validators/`** — Schemas Zod para validação de formulários.
- **`src/components/ui/`** — Design system básico: Button, Card, Input, LoadingSpinner, Modal, ScrollDown, Alerts.

---

## Variáveis de Ambiente

### Backend
| Var | Uso |
|---|---|
| `PORT` | Porta do servidor |
| `NODE_ENV` | Ambiente |
| `DATABASE_URL` | Connection string PostgreSQL |
| `CORS_ORIGIN` | Origem permitida pelo CORS |
| `JWT_SECRET` | Segredo para assinar tokens JWT |

### Frontend
| Var | Uso |
|---|---|
| `VITE_API_URL` | Base URL da API backend |

---

## Padrões e Convenções

- **Validação:** Não pré-validar no frontend o que o backend já valida — chamar direto e tratar o erro retornado.
- **Forms com dados dinâmicos:** Usar `useEffect` + `setValue` do React Hook Form para atualizar valores após carregamento; não depender apenas de `defaultValues`.
- **Auth admin:** URL discreta (`/admin/login`), credenciais via variáveis de ambiente, sessão JWT sem persistência de senha no estado.
- **Sequência Prisma:** Se ocorrer erro "Unique constraint failed on id", resetar a sequence do PostgreSQL com `setval()`.

---

## Comandos Úteis

```bash
# Backend
cd backend
npm run dev        # tsx watch src/server.ts
npm run build      # tsc
npx prisma migrate dev   # rodar migrations
npx prisma studio        # GUI do banco

# Frontend
cd frontend
npm run dev        # vite
npm run build      # tsc + vite build
npm run preview    # preview do build
```
