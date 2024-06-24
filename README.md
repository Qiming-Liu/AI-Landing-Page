# AI

## Getting Started

### Install dependencies

It is encouraged to use **pnpm** so the husky hooks can work properly.

```bash
pnpm install
```

### Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/pages/index.tsx`.

### Deployment

#### Production Build

To build the production version, use this command:

```bash
pnpm build
```

Then you can find the production files in the `.next` directory.
To run the production server, use this command:

```bash
pnpm start
```

#### Static Export Frontend

By breaking a strict SPA into individual HTML files, Next.js generates an HTML file per route with env `STATIC_EXPORTS=true` as you using this command:

```bash
# remove `src/app/api` folder first
pnpm build
```

Then you can find the frontend static files in the `out` directory.
