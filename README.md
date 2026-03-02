# QuickHire — Job Board Application

A full-stack job board application built with **Next.js 15**, **NestJS 11**, and **PostgreSQL**. Users can browse job listings, filter by category and location, view job details, and submit applications. Admins can post, edit, and delete job listings via a protected dashboard.

> UI implemented from the provided Figma design: [QSL - QuickHire](https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer)

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://quickhire-alpha.vercel.app |
| Backend API | https://quickhire-production-7d19.up.railway.app/api |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | NestJS 11, TypeScript |
| Database | PostgreSQL via Prisma ORM |
| Deployment | Vercel (frontend), Railway (backend + DB) |

---

## Features

### User-Facing
- Browse all job listings with search and filter by category and location
- Job detail page with full description, requirements, and salary
- Apply to jobs with name, email, resume link, and cover note
- Fully responsive design closely matching the Figma spec
- Featured jobs and latest jobs sections on homepage
- Category browsing with live job counts
- Location dropdown populated from live job data

### Admin Panel (`/admin`)
- Password-protected dashboard
- Post, edit, and delete job listings
- View all applications with full applicant details
- Stats cards and bar charts (applications per job, jobs by category)
- Notification bell with activity feed

---

## Project Structure
```
quickhire/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   └── src/
│       ├── jobs/
│       ├── applications/
│       └── main.ts
└── frontend/
    └── src/
        ├── app/
        │   ├── page.tsx
        │   ├── jobs/
        │   └── admin/
        ├── components/
        │   ├── home/
        │   ├── jobs/
        │   ├── admin/
        │   ├── layout/
        │   └── shared/
        └── lib/
            ├── api.ts
            ├── styles.ts
            └── utils.ts
```

---

## API Endpoints

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs (`?search=`, `?category=`, `?location=`) |
| GET | `/api/jobs/featured` | Featured jobs |
| GET | `/api/jobs/categories` | Job counts by category |
| GET | `/api/jobs/:id` | Single job detail |
| POST | `/api/jobs` | Create job (Admin) |
| PATCH | `/api/jobs/:id` | Update job (Admin) |
| DELETE | `/api/jobs/:id` | Delete job (Admin) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Submit application |
| GET | `/api/applications` | All applications (Admin) |

---

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL

### 1. Clone
```bash
git clone https://github.com/your-username/quickhire.git
cd quickhire
```

### 2. Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/quickhire?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```
```bash
npx prisma migrate dev
npx ts-node -r tsconfig-paths/register prisma/seed.ts
npm run start:dev
```
API → `http://localhost:5000/api`

### 3. Frontend
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```
```bash
npm run dev
```
App → `http://localhost:3000`

---

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | API port (default 5000) |
| `FRONTEND_URL` | Allowed CORS origin |

### Frontend
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin panel password |

---

## Beyond the Requirements

| Feature | Notes |
|---------|-------|
| Edit job listings | PATCH endpoint + modal UI |
| Featured jobs | Flagged jobs shown on homepage |
| Stats charts | Recharts bar charts in admin |
| Loading skeletons | Skeleton screens during data fetch |
| Location dropdown | Populated from live data |
| Mobile sidebar | Slide-in drawer on mobile |
| Company logo avatars | Auto-generated fallback avatars |
| Toast notifications | Feedback on all admin actions |
| Fully deployed | Frontend on Vercel, backend on Railway |

---

## Admin Access

Go to `/admin` and enter the password set in `NEXT_PUBLIC_ADMIN_PASSWORD`.
