# UI — NIL × STACC

Website for Nelo Robotics — stacc × NIL product pages.

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npx vercel
```

## Network admin console

The static `/admin` page connects directly to the self-hosted NELO Network service. Deploy the Network service first, set `NELO_SOCIAL_ADMIN_TOKEN` to a separate random secret, and set `NELO_SOCIAL_ADMIN_ORIGINS` to the exact HTTPS origin serving this site. Open `/admin` and enter the Network origin and token. The token is held only in page memory; it is never stored in localStorage or sent to the website's hosting API.

The console shows aggregate member, session, post, message, community, moderation, and attachment metrics. Its runtime settings can rename the network, set public site/support contacts, and pause new signups. Better Auth secrets, admin credentials, and server URLs remain managed through the Network host's environment settings.

## Built with

- Next.js 15
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel
