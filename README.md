# Food Order Operations

Staff operations dashboard for a restaurant. This application contains the internal workflows for managing orders, customers, dishes, menu variants, and order dispatch status. 

## Overview

- Built with Next.js App Router, React, TypeScript, and Tailwind CSS.
- Uses Prisma with a Neon PostgreSQL database through `DATABASE_URL`.
- Provides staff authentication, session refresh, and protected operations APIs.
- Shares the production data model with the public ordering system.
- Uses `pnpm` for package management and project scripts.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Redirects to `/orders`. |
| `/login` | Staff login. |
| `/signup` | Staff signup flow copied from the original app. Confirm whether self-signup should remain enabled before production use. |
| `/auth/[provider]/callback` | OAuth callback page. |
| `/orders` | Operations dashboard and order history. |
| `/manage/dishes` | Dish and variant management. |sadas

## API Surface

Staff APIs should call `requireAuth(request)` before serving protected operations data.

| Endpoint | Purpose |
| --- | --- |
| `GET /api/orders` | List orders for staff operations. |
| `POST /api/orders` | Create an order from the operations app. |
| `PUT /api/orders/[orderId]/dispatch` | Update order dispatch, status, and related order information. |
| `GET /api/customers` | Search or retrieve customer data. |
| `GET /api/menu_items` | Read menu items. |
| `POST /api/menu_items` | Create menu items. |
| `PATCH /api/menu_items/[id]` | Update a menu item. |
| `POST /api/menu_items/[id]` | Create a variant for a menu item. |
| `PATCH /api/menu_items/variants/[variantId]` | Update a menu item variant. |
| `GET /api/categories` | Read categories. |
| `GET /api/menu_extras` | Read menu extras. |
| `GET /api/nationalities` | Read nationalities. |
| `GET /api/orders/confirm/[code]` | Read an order confirmation link. |
| `PATCH /api/orders/confirm/[code]` | Update an order confirmation. |
| `app/api/auth/**` | Staff auth, OAuth, logout, and session refresh workflow. |

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 6
- Neon PostgreSQL adapter for Prisma
- SWR
- lucide-react

## Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js version.
- `pnpm` installed locally.
- Access to the shared PostgreSQL database.
- Access to the auth service used by staff login and OAuth.

### Environment Variables

Create a local `.env` file with the required runtime values. Do not commit secrets.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
AUTH_ENDPOINT="http://localhost:8080/api/v1/auth"
```

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma and the Neon adapter. |
| `AUTH_ENDPOINT` | Yes | Base URL for the upstream auth API. |


### Install Dependencies

```bash
pnpm install
```

### Sync Prisma Client

The Prisma schema lives at `lib/prisma/schema.prisma`.

```bash
pnpm prisma:sync
```

This pulls the current database schema and regenerates the Prisma client.

### Run Locally

```bash
pnpm dev
```

Open `http://localhost:3000`. The root route redirects to `/orders`.

## Available Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Syncs Prisma, then starts the Next.js development server. |
| `pnpm build` | Generates Prisma client and creates a production build. |
| `pnpm start` | Starts the production Next.js server after a successful build. |
| `pnpm lint` | Runs ESLint. |
| `pnpm prisma:pull` | Pulls the database schema into `lib/prisma/schema.prisma`. |
| `pnpm prisma:generate` | Generates the Prisma client from the local schema. |
| `pnpm prisma:sync` | Runs `prisma:pull` and `prisma:generate`. |

## Validation

Before shipping changes, run:

```bash
pnpm lint
pnpm build
```

Recommended manual checks:

- Staff login succeeds.
- `/orders` loads and displays order data.
- `/manage/dishes` loads and supports expected dish and variant workflows.
- Protected operations APIs reject unauthenticated requests.

## Authentication Notes

- Client pages use `useAuthSession` for access checks.
- Protected API routes should call `requireAuth(request)`.
- Current token validation checks `accessToken` and legacy `auth_token` cookies.
- Role-level authorization is not implemented yet. Add role checks when the auth provider exposes reliable staff role claims.

## Project Relationship

The public `food-order-system` project owns the customer-facing experience: home page, public menu, client order creation, and customer confirmation flows.

This repository owns the internal operations experience: staff navigation, order history, dispatch management, customer lookup, menu item management, variants, extras, and protected operations APIs.
