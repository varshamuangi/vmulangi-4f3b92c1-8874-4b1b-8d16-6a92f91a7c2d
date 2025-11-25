🛡️ Secure Task Management System
By Varsha Chandrahasareddy Mulangi

A full-stack, role-based Task Management System built using NestJS, Angular, and SQLite, structured in a clean, modular workplace.
This project demonstrates secure authentication, authorization, organization scoping, and RBAC-based task management—all wrapped inside a responsive modern UI.

🚀 Features Overview
🔐 Authentication & Authorization

JWT-based login/logout

Secure password hashing (bcrypt)

Automatic user context injection via decorators

Auth guards + Role guards for all protected routes

🏢 Organization Management

Support for organization hierarchy (2-level)

Users belong to exactly one organization

Owners/Admins can view tasks only within their org scope

📝 Task Management

Create, edit, delete tasks (with permission checks)

Priority, category, and status classification

Organization-scoped visibility

Tracks creator and assigned user

Supports future drag-and-drop ordering

🕵️ Audit Logging

Every sensitive action logged

Includes: user actions, resources touched, metadata

🎨 Frontend UI (Angular + Tailwind)

Modern responsive dashboard

JWT stored in browser localStorage

Auto-attach Authorization header via HTTP interceptor

Task listing, creation, and editing screens

Clean routing and reusable components

🧱 Tech Stack
Backend – NestJS

NestJS Framework

TypeORM + SQLite

Passport + JWT Strategy

Class-Validator / Class-Transformer

bcrypt for hashing

Frontend – Angular

Angular 20

Tailwind CSS

Router, Components, Signals

HTTP Client Interceptors

Development

Node.js v18+

NX-style modular architecture

Prettier + ESLint

TypeScript everywhere

📂 Project Structure (Monorepo-Inspired)
backend/              NestJS API
│── src/
│   ├── auth/         Authentication module
│   ├── users/        User management
│   ├── organizations/ Organization hierarchy
│   ├── tasks/        Task CRUD
│   ├── audit-log/    Activity logging
│   ├── common/       Shared enums & decorators
│   ├── database/     TypeORM config
│   └── main.ts       App bootstrap
frontend/             Angular application
│── src/app/
│   ├── core/         Auth service, guards, interceptors
│   ├── features/     Auth + Tasks pages
│   └── shared/       Components

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/varshamuangi/vmulangi-4f3b92c1-8874-4b1b-8d16-6a92f91a7c2d.git
cd vmulangi-4f3b92c1-8874-4b1b-8d16-6a92f91a7c2d

2️⃣ Install Dependencies

Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install

🔧 Environment Variables

Create backend/.env:

DATABASE_URL=sqlite:./database.sqlite
JWT_SECRET=super-secret-key
JWT_EXPIRATION=24h
PORT=3000

▶️ Running the Apps
Backend
cd backend
npm run start:dev


Backend starts on:
👉 http://localhost:3000

Frontend
cd frontend
npm start


Frontend starts on:
👉 http://localhost:4200

🗄 Database

SQLite file is auto-generated (database.sqlite)

TypeORM synchronize: true builds schema automatically

A seed service auto-creates:

Demo org

Demo admin (admin@demo.com)

Demo owner (owner@demo.com)

🛂 Access Control
Roles
Role	Permissions
OWNER	Full access, manage users/org, full CRUD
ADMIN	Manage tasks, view all tasks
VIEWER	Read-only access
Organization Scoping

Users only see tasks belonging to their own organization

Protects cross-organizational access

JWT Integration

Server verifies token, binds user to request

Angular interceptor attaches token automatically

🧪 API Documentation
🔐 POST /auth/login
{
  "email": "admin@demo.com",
  "password": "admin123"
}

🔐 POST /auth/register
{
  "email": "user@example.com",
  "password": "pass123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationId": "demo-org"
}

📋 POST /tasks

(Create task)

{
  "title": "Finish Report",
  "description": "Q4 Review",
  "priority": "high",
  "category": "work"
}

📄 GET /tasks

Returns all tasks visible to user (based on org & role).

✏️ PATCH /tasks/:id
🗑 DELETE /tasks/:id
🧠 Architecture & RBAC Strategy
Decorators

@CurrentUser() → Injects user from JWT

@Roles() → Restrict endpoints to allowed roles

Guards

JwtAuthGuard → Checks authentication

RolesGuard → Checks role permissions

Audit Logging

Logs every important action:

User logins

Task creation/edit/delete

Org creation

🌱 Seed Data (Auto-Inserted)
User	Email	Password	Role
Demo Admin	admin@demo.com
	admin123	ADMIN
Demo Owner	owner@demo.com
	owner123	OWNER

Organization:

id: demo-org
name: Demo Organization

📝 Video Walkthrough
     
     https://drive.google.com/file/d/1M7J1HXoj3hId_S8acjxcYlUIl7zAgxul/view?usp=sharing

💡 Future Improvements

Refresh token strategy

CSRF protection for browser environments

Redis-based permission caching

Custom role creation per organization

Activity dashboards & analytics

Drag-and-drop Kanban board

Full test coverage

👩‍💻 Author

Varsha Chandrahasareddy Mulangi
Email: varshamulangi21@gmail.com