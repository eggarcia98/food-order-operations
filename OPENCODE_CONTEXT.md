# Food Order Operations Context

## Project Purpose
This project contains staff/admin/cashier operations for Los Guayacos. It was split from `food-order-system`, which remains the public client ordering app.

## Current Status
- Next.js App Router project using pnpm.
- Root `app/` directory is the active app directory; the generated `src/` directory was removed.
- Tailwind CSS v4/global styling was copied from the original project.
- Prisma schema and Prisma client setup were copied from the original project.
- The project uses the same database through `DATABASE_URL`.
- Staff auth workflow was copied from the original project and is intentionally kept here.
- Operations APIs have first-pass token validation through `requireAuth(request)`.
- `pnpm lint` currently passes with warnings only.
- `pnpm build` completes successfully.

## Main Routes
- `/`: redirects to `/orders`.
- `/login`: staff login.
- `/signup`: copied from the original app; decide whether staff self-signup should stay enabled.
- `/auth/[provider]/callback`: OAuth callback page.
- `/orders`: operations dashboard and order history.
- `/manage/dishes`: dish and variant management.

## Main APIs
- `GET /api/orders`: staff-only order list.
- `POST /api/orders`: staff-only order creation endpoint copied from original behavior.
- `PUT /api/orders/[orderId]/dispatch`: staff-only order status/info update.
- `GET /api/customers`: staff-only customer lookup.
- `GET/POST /api/menu_items`: staff-only menu read/create.
- `PATCH /api/menu_items/[id]`: staff-only menu item update.
- `POST /api/menu_items/[id]`: staff-only variant creation.
- `PATCH /api/menu_items/variants/[variantId]`: staff-only variant update.
- `GET /api/categories`: staff-only category read.
- `GET /api/menu_extras`: staff-only extras read.
- `GET /api/nationalities`: staff-only nationality read.
- `GET/PATCH /api/orders/confirm/[code]`: copied with the orders API tree; keep only if operations still needs confirmation-link support here.
- `app/api/auth/**`: staff auth/session workflow.

## Auth Notes
- Operations pages use `useAuthSession` for client-side page access checks.
- Staff APIs should call `requireAuth(request)`.
- Role-level authorization is not implemented yet. Add `requireRole(["admin", "cashier"])` later if the auth provider exposes role claims.
- `requireAuth` currently checks for `accessToken` or legacy `auth_token` cookies only.

## Shared Dependencies
- Next.js
- React
- Prisma
- Tailwind CSS 4
- SWR
- lucide-react

## Original Project Relationship
The original `food-order-system` keeps:
- public home/menu/order creation/order confirmation
- login workflow, but not as a gate for client features

The original project removes:
- operations pages
- operations APIs
- admin/cashier navigation
- customer list autocomplete
- order dispatch/status management

## Follow-up Checks
- `pnpm prisma:generate` passed.
- `pnpm lint` passed with warnings only.
- `pnpm build` passed.
- Verify staff login.
- Verify `/orders`.
- Verify `/manage/dishes`.
- Verify operations APIs reject unauthenticated requests.
