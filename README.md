# SudhanshuOS v1.0

A cyberpunk AI portfolio RPG built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, and Lucide icons.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Content Architecture

All portfolio content lives in `src/data/portfolio.config.ts`. Components render from that single source, including:

- Profile and RPG stats
- Skills and skill tree nodes
- Projects as missions
- Experience and education logs
- Achievements and coding profiles
- Interests, social links, contact details
- SudhanshuGPT knowledge base

Updating the portfolio should require edits only to this config file.

## Discovery Game

The guided discovery game tracks a visitor's progress through the candidate story, experience, projects, achievements, education, and interests. Chapters are configured in `src/data/portfolio.config.ts` under `discoveryGame`.

## Email Sending

The contact terminal posts to `src/app/api/contact/route.ts` and sends real email through SMTP using Nodemailer. Create `.env.local` from `.env.example`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-sending-account@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="SudhanshuOS <your-sending-account@gmail.com>"
```

For Gmail, use an app password, not your normal account password. Messages are delivered to `sudhanshu.sde@gmail.com`, with the visitor's email set as `replyTo`.

## AI Assistant Architecture

`src/lib/assistant.ts` implements retrieval-based answers over the centralized portfolio config. The adapter keeps the UI decoupled from the response engine so it can later be replaced with OpenAI, OpenRouter, LangChain, RAG, or agentic workflows without rewriting the assistant component.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Keep the default Next.js framework settings.
4. Run command: `npm run build`.
5. Output directory: `.next`.

## SEO

SEO metadata is configured in `src/app/layout.ts`, with structured JSON-LD in `src/app/page.tsx`.
