🚀 QuickHire — Job Board Application

A full-stack job board platform built using Next.js 15, NestJS 11, and PostgreSQL.
QuickHire allows users to explore job opportunities and submit applications, while administrators manage listings through a secure dashboard.

The UI implementation closely follows the provided Figma design specification.

🔗 Figma Design:
https://www.figma.com/design/cLdiYqgjKdvrn4c0vQBdIT/QSL---QuickHire--Task-for-A.-Soft.-Engineer

🌐 Live Demo
Service	Link
🖥 Frontend	https://quickhire-alpha.vercel.app

⚙️ Backend API	https://quickhire-production-7d19.up.railway.app/api
🧱 Tech Stack
Layer	Technology
Frontend	Next.js 15, React 19, TypeScript, Tailwind CSS
Backend	NestJS 11, TypeScript
Database	PostgreSQL + Prisma ORM
Deployment	Vercel (Frontend), Railway (Backend & Database)
✨ Features
👤 User Features

Browse job listings

Search and filter by category and location

Detailed job pages (description, salary, requirements)

Submit job applications

Featured & latest jobs sections

Dynamic category browsing with job counts

Location filtering from live database data

Fully responsive UI

🔐 Admin Dashboard (/admin)

Password-protected access

Create, edit, and delete job listings

View submitted applications

Application statistics & analytics charts

Activity notifications

Real-time admin feedback via toast notifications

📁 Project Structure
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
│
└── frontend/
    └── src/
        ├── app/
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
🔌 API Endpoints
Jobs
Method	Endpoint	Description
GET	/api/jobs	Get all jobs (supports filters)
GET	/api/jobs/featured	Featured jobs
GET	/api/jobs/categories	Job counts by category
GET	/api/jobs/:id	Job details
POST	/api/jobs	Create job (Admin)
PATCH	/api/jobs/:id	Update job (Admin)
DELETE	/api/jobs/:id	Delete job (Admin)
Applications
Method	Endpoint	Description
POST	/api/applications	Submit application
GET	/api/applications	View applications (Admin)
🛠 Running Locally
✅ Prerequisites

Node.js 18+

PostgreSQL

npm or pnpm

1️⃣ Clone Repository
git clone https://github.com/your-username/quickhire.git
cd quickhire
2️⃣ Backend Setup
cd backend
npm install

Create .env:

DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/quickhire?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:3000"

Run migrations & seed data:

npx prisma migrate dev
npx ts-node -r tsconfig-paths/register prisma/seed.ts
npm run start:dev

✅ Backend running at:

http://localhost:5000/api
3️⃣ Frontend Setup
cd frontend
npm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMIN_PASSWORD=admin123

Start development server:

npm run dev

✅ App running at:

http://localhost:3000
🔑 Environment Variables
Backend
Variable	Description
DATABASE_URL	PostgreSQL connection string
PORT	API server port
FRONTEND_URL	Allowed CORS origin
Frontend
Variable	Description
NEXT_PUBLIC_API_URL	Backend API URL
NEXT_PUBLIC_ADMIN_PASSWORD	Admin dashboard password
⭐ Extra Implementations

Beyond core requirements:

✅ Editable job listings

✅ Featured job system

✅ Admin analytics charts (Recharts)

✅ Loading skeleton UI

✅ Dynamic location filtering

✅ Mobile sidebar navigation

✅ Auto-generated company avatars

✅ Toast notifications

✅ Full production deployment

🔐 Admin Access

Navigate to:

/admin

Use the password defined in:

NEXT_PUBLIC_ADMIN_PASSWORD
📦 Deployment
Service	Platform
Frontend	Vercel
Backend	Railway
Database	Railway PostgreSQL
