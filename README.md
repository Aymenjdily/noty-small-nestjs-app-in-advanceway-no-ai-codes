<div align="center">

# 📝 Noty

**A secure, hand-crafted notes API — written line by line, no AI-generated code.**

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logoColor=white)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API](#-api-reference) · [Structure](#-project-structure)

</div>

---

## ✨ Features

- 🔐 **Authentication** — email & password sign-up / sign-in with secure session cookies via Better Auth
- 🛡️ **Protected by default** — a global auth guard locks every route; public routes must be opened explicitly
- 👤 **Per-user isolation** — every query is scoped to the note's owner, so users can never reach each other's data
- ✅ **Strict validation** — DTOs with whitelisting, unknown-field rejection and length limits
- 🗄️ **Type-safe database** — Drizzle ORM schema with versioned SQL migrations
- 🧩 **Clean architecture** — modular NestJS design with dependency injection

## 🧰 Tech Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| Framework      | [NestJS 11](https://nestjs.com)              |
| Language       | TypeScript                                   |
| Database       | PostgreSQL                                   |
| ORM            | [Drizzle ORM](https://orm.drizzle.team)      |
| Authentication | [Better Auth](https://www.better-auth.com)   |
| Validation     | class-validator · class-transformer          |
| Testing        | Jest · Supertest                             |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (local, Neon, Supabase…)

### 1. Install

```bash
git clone <your-repo-url> noty
cd noty
npm install
```

### 2. Configure

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/noty
DATABASE_URL_POOLED=postgresql://user:password@localhost:5432/noty
```

> 💡 Generate a secret with `openssl rand -base64 32`

### 3. Migrate

```bash
npm run db:migrate
```

### 4. Run

```bash
npm run start:dev
```

The API is now live at **http://localhost:3000** 🎉

## 📡 API Reference

### Auth — handled by Better Auth

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| `POST` | `/api/auth/sign-up/email`  | Create an account        |
| `POST` | `/api/auth/sign-in/email`  | Log in (sets cookie)     |
| `POST` | `/api/auth/sign-out`       | Log out                  |
| `GET`  | `/api/auth/get-session`    | Current session          |

### User

| Method | Endpoint | Auth | Description          |
| ------ | -------- | :--: | -------------------- |
| `GET`  | `/`      |  —   | Health check         |
| `GET`  | `/me`    |  🔒  | Current user profile |

### Notes

| Method   | Endpoint     | Auth | Description           |
| -------- | ------------ | :--: | --------------------- |
| `GET`    | `/notes`     |  🔒  | List your notes       |
| `GET`    | `/notes/:id` |  🔒  | Get a single note     |
| `POST`   | `/notes`     |  🔒  | Create a note         |
| `PATCH`  | `/notes/:id` |  🔒  | Update a note         |
| `DELETE` | `/notes/:id` |  🔒  | Delete a note         |

<details>
<summary><b>Example: create a note</b></summary>

```http
POST /notes
Content-Type: application/json
Cookie: better-auth.session_token=...

{
  "title": "Groceries",
  "content": "Milk, eggs, coffee"
}
```

```json
{
  "id": 1,
  "userId": "u_8f3k...",
  "title": "Groceries",
  "content": "Milk, eggs, coffee",
  "createdAt": "2026-10-21T18:00:00.000Z",
  "updatedAt": "2026-10-21T18:00:00.000Z"
}
```

| Field     | Type   | Rules                       |
| --------- | ------ | --------------------------- |
| `title`   | string | required, max 120 chars     |
| `content` | string | optional, max 10,000 chars  |

</details>

## 📁 Project Structure

```
src/
├── auth/
│   └── auth.ts              # Better Auth configuration
├── db/
│   ├── auth-schema.ts       # user, session, account, verification tables
│   ├── notes-schema.ts      # notes table
│   ├── drizzle.db.module.ts # global DB provider
│   └── index.ts             # connection pool
├── notes/
│   ├── dto/                 # validated request bodies
│   ├── notes.controller.ts
│   ├── notes.service.ts
│   └── notes.module.ts
├── app.module.ts
└── main.ts
drizzle/                     # generated SQL migrations
```

## 🛠️ Scripts

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `npm run start:dev`   | Start in watch mode            |
| `npm run build`       | Compile to `dist/`             |
| `npm run start:prod`  | Run the compiled build         |
| `npm test`            | Run unit tests                 |
| `npm run test:e2e`    | Run end-to-end tests           |
| `npm run lint`        | Lint and auto-fix              |
| `npm run db:generate` | Generate a migration from schema |
| `npm run db:migrate`  | Apply migrations               |
| `npm run db:studio`   | Open Drizzle Studio            |

## 🗺️ Roadmap

- [ ] Rate limiting with `@nestjs/throttler`
- [ ] Security headers with `helmet` and CORS config
- [ ] Email verification
- [ ] Full unit & e2e test coverage
- [ ] Frontend client

---

<div align="center">

Built with ☕ and focus by **Aymen Jdily** — every line written by hand.

</div>
