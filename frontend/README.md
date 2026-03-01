# QuickHire — Frontend

Next.js 15 frontend for the QuickHire job board.

## Stack
- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v3**
- **TanStack Query v5** — server state / caching
- **Axios** — HTTP client
- **Lucide React** — icons

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

```bash
npm run dev   # starts on http://localhost:3000
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, category explorer, featured jobs, latest jobs |
| `/jobs` | Browse all jobs — search + category/type filters |
| `/jobs/[id]` | Job detail — description, requirements, Apply Now form |
| `/admin` | Admin dashboard — password gated, post/delete jobs |

## Admin Access

The admin panel at `/admin` is protected by a password gate.
- Default password: `admin123`
- Change it via `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`
- Auth persists for the browser session (clears on tab close)
- The route is intentionally not linked in the navbar
