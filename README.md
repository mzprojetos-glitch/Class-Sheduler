# Class Scheduler — "Organize suas aulas particulares"

Aplicação web/mobile responsiva (mobile-first) para instrutores de aulas particulares gerenciarem agenda, alunos e finanças.
Projeto da avaliação **[WEB II] – Terceira Unidade**.

## Stack
Next.js 14 (App Router) · TypeScript estrito · MongoDB Atlas + Mongoose (conexão **Singleton**, `src/lib/db.ts`) ·
NextAuth.js (JWT, Credentials + Google/Apple opcionais) · Bcrypt · TanStack Query · Zustand · Tailwind CSS · Zod.

## Arquitetura
```
src/
├─ app/
│  ├─ (app)/            # área autenticada (layout server + barra inferior)
│  │  ├─ home/ schedule/ students/ students/[id]/ finances/ profile/ settings/
│  │  ├─ loading.tsx  error.tsx
│  ├─ api/              # Route Handlers (todos validam sessão): auth, register, students, sessions, payments, account
│  ├─ login/ privacy/ terms/ help/ forgot-password/
│  ├─ layout.tsx  loading.tsx  error.tsx  page.tsx
├─ components/          # BottomNav, ModalHost, SessionCard, StatusBadge, CookieBanner, Footer, Providers
├─ hooks/queries.ts     # hooks do React Query (queries + mutations com invalidação)
├─ lib/                 # db (Singleton), auth, api (guard), dto, sessions, format, i18n (PT/EN)
├─ models/              # User, Student, ClassSession, Payment (Mongoose)
├─ store/ui.ts          # Zustand: tema, idioma, modais, filtros, consentimento de cookies
├─ types/  middleware.ts
```
**Modelos:** `User` (nome, email, senha com hash) · `Student` (plano 2|4, horários semanais) · `ClassSession` (data, início/fim, status: agendada/ministrada/falta/remarcada) · `Payment` (aluno + mês, pago/pendente; índice único aluno+mês).

**Proteção de rotas em camadas:** `middleware.ts` (next-auth) → `(app)/layout.tsx` (Server Component com `getServerSession`) → cada Route Handler (`auth()` em `src/lib/api.ts`).

**Server vs. Client:** layouts e páginas legais são Server Components; páginas interativas são `'use client'` e buscam dados via React Query (sem `useEffect` para fetch). Estado de UI fica no Zustand.

## Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha: `MONGODB_URI`, `NEXTAUTH_SECRET` (`openssl rand -base64 32`), `NEXTAUTH_URL`.
Opcionais: `GOOGLE_CLIENT_ID/SECRET`, `APPLE_ID/SECRET`, e dados do responsável (`NEXT_PUBLIC_CONTROLLER_NAME`, `NEXT_PUBLIC_CONTROLLER_DOC`, `NEXT_PUBLIC_CONTACT_EMAIL`).

## Rodando localmente
```bash
npm install
cp .env.example .env.local   # edite os valores
npm run dev                  # http://localhost:3000
```
Crie uma conta em **Cadastrar**, cadastre alunos (as aulas do mês são geradas a partir dos horários) e use Início/Agenda para marcar Ministrada/Falta/Remarcar.

## Deploy (Vercel)
Importe o repositório, defina `MONGODB_URI`, `NEXTAUTH_SECRET` e `NEXTAUTH_URL` (URL de produção) em *Environment Variables*; no MongoDB Atlas libere o acesso de rede (0.0.0.0/0 para a Vercel).

## Funcionalidades
Login/Cadastro (erro "Email ou senha inválidos", aceite de termos não pré-marcado) · Início (resumo + ações rápidas) · Agenda semanal Seg–Sáb + nova aula · Alunos (busca, detalhe, editar plano/horários) · Finanças (total/recebido/pendente por mês, alternar pago) · Perfil e Configurações (tema claro/escuro, PT/EN, notificações, alterar senha, excluir conta/dados) · Banner de cookies (Aceitar/Recusar/Personalizar) · Páginas de Privacidade e Termos.

**Acessibilidade (WCAG AA):** labels em todos os inputs, erros com `role="alert"`, status com ícone + texto + cor, foco visível, navegação por teclado, modais com Esc, contraste ≥ 4,5:1 nas paletas.

## Pendências / observações
- Textos das páginas legais são **modelo base**: revise com profissional jurídico e preencha os dados do responsável.
- "Esqueci minha senha" e login Google/Apple: UI pronta; recuperação por e-mail exige provedor de e-mail, OAuth exige credenciais.
- Notificações são preferências de UI (sem push). Nenhum script de analytics é carregado; se adicionar, condicione a `useUI().cookie.analytics`.
- Projeto gerado sem rodar `npm install`/build no ambiente de criação — rode `npm run build` e ajuste eventuais detalhes de tipos.
