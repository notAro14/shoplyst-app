# Shoplyst App

Collaborative shopping list application. This is a **WORK IN PROGRESS**.

Feel free to reach me at `mamitiana.dev.js[at]gmail[dot]com` to contribute.

> PS: the application is in French. Translation is not a priority for now

## How to get started

Create a `.env` file and fill the required env variables. See `env.example`

Install

```shell
pnpm install
```

Generate prisma types

```shell
pnpm generate
```

Setup postgres

```shell
pnpm db:push
```

Run at http://localhost:3000/

```shell
pnpm dev
```

## Built with

- typescript
- next.js
- next-auth
- stitches
- trpc
- prisma
- postgres
