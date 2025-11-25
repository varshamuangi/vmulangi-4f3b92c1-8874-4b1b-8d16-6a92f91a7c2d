🛡️ Secure Task Management System

By Varsha Chandrahasareddy Mulangi

A secure, full-stack Task Management System built using NestJS, Angular, and SQLite, following the architecture, security, and RBAC requirements outlined in the TurboVets Full Stack Engineer Assessment.

This project demonstrates real JWT authentication, service-layer RBAC enforcement, organization-level data scoping, and role-based task management, delivered through a clean, modular, and responsive UI.

🚀 Features Overview
🔐 Authentication & Authorization

Real JWT-based login/logout

Secure password hashing using bcrypt

User context automatically injected using decorators

JwtAuthGuard + RolesGuard for protected routes

Full session persistence on the frontend

🏢 Organization Management

Two-level organization structure

Each user belongs to exactly one organization

Tasks are automatically scoped by organization

Owners/Admins only see tasks from their own org

📝 Task Management

Create, Edit, Delete tasks (with full permission checks)

Priority, category, and status metadata

Tracks creator + assigned user

Organization-scoped visibility

Ready for future drag-and-drop Kanban view

🕵️ Audit Logging

Logs sensitive actions:

Login events

Task creation

Task updates

Task deletions

Organization/user creation

🎨 Angular Frontend (Angular 20 + Tailwind)

Modern responsive dashboard

Clean component structure

Interceptor auto-attaches JWT

LocalStorage for session persistence

Task listing, creation, editing UIs

🧱 Tech Stack
Backend (NestJS)

NestJS Framework

TypeORM + SQLite

Passport JWT Strategy

Class-Validator & Class-Transformer

bcrypt for password hashing

Modular, testable architecture

Frontend (Angular)

Angular 20

TailwindCSS

Angular Router

Signals & Components

HTTP interceptors

Development & Tooling

Node.js v18+

Prettier + ESLint

NX-style modular architecture

TypeScript everywhere

📂 Project Structure
backend/
  src/
    auth/         Authentication logic
    users/        User management
    organizations/ Organization hierarchy
    tasks/        Task CRUD operations
    audit-log/    Logging user actions
    common/       Shared enums/decorators/guards
    database/     TypeORM configuration
    main.ts       App bootstrap

frontend/
  src/app/
    core/         Auth services, guards, interceptor
    features/     Login + Tasks UI
    shared/       Shared components

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/varshamuangi/vmulangi-4f3b92c1-8874-4b1b-8d16-6a92f91a7c2d.git
cd vmulangi-4f3b92c1-8874-4b1b-8d16-6a92f91a7c2d

2️⃣ Install Dependencies
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

3️⃣ Environment Variables

Create a .env file inside /backend:

DATABASE_URL=sqlite:./database.sqlite
JWT_SECRET=super-secret-key
JWT_EXPIRATION=24h
PORT=3000

▶️ Running the Backend
cd backend
npm run start:dev


Backend runs at:
👉 http://localhost:3000

▶️ Running the Frontend
cd frontend
npm start


Frontend runs at:
👉 http://localhost:4200

🗄 Database & Seed Data

SQLite is auto-generated at first startup (database.sqlite).

TypeORM's synchronize: true builds schema automatically.

Auto-created Seed Data:
User	Email	Password	Role
Demo Admin	admin@demo.com
	admin123	ADMIN
Demo Owner	owner@demo.com
	owner123	OWNER

Organization:

id: demo-org
name: Demo Organization

🛂 Access Control (RBAC)
Roles
Role	Permissions
OWNER	Full access, org/user management, CRUD
ADMIN	Manage tasks, view tasks in org
VIEWER	Read-only access
How RBAC is implemented

@Roles() decorator → declares allowed roles

RolesGuard → checks JSON Web Token role

JwtAuthGuard → ensures authentication

Service-layer logic → double-verifies:

Role permissions

Organization matching

No cross-org access

Viewer restrictions

Organization Scoping

Every task query filters by organizationId:

where: { organizationId: currentUser.organizationId }

Viewer Restrictions

Viewer cannot:

Create tasks

Edit tasks

Delete tasks

Viewer modifying ANY resource triggers:

403 Forbidden

🧪 API Examples
🔐 Login
POST /auth/login
{
  "email": "admin@demo.com",
  "password": "admin123"
}

➕ Register User
POST /auth/register
{
  "email": "user@example.com",
  "password": "pass123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationId": "demo-org"
}

➕ Create Task
POST /tasks
{
  "title": "Finish Report",
  "description": "Q4 Review",
  "priority": "high",
  "category": "work"
}

📄 Get Tasks
GET /tasks

✏️ Edit Task
PATCH /tasks/:id

🗑 Delete Task
DELETE /tasks/:id

🧠 Architecture & Design Rationale
Why NestJS?

Built-in support for Guards, Decorators, Pipes → perfect for RBAC

Modular structure keeps concerns separated

Easy to enforce security at multiple layers

Why Angular?

Strong TypeScript ecosystem

Clear separation of services, routing, and UI components

HttpClient + interceptors simplify authenticated API calls

Why SQLite?

Zero setup, perfect for local dev

Easily swappable with PostgreSQL for production

Fast and lightweight

Why Guards & Service-Level Checks?

To satisfy TurboVets’ requirements:

Prevent UI bypass

Enforce secure access control

Ensure consistent RBAC across controllers & services

Why Organization ID Everywhere?

It enables:

Data isolation

Clean multi-tenant structure

Prevents cross-org visibility

🔄 Example Workflows (HARD REQUIREMENT)
Login & Task Fetch

User logs in

JWT stored in localStorage

Interceptor attaches token

Backend returns tasks for that user’s org

Create Task

User submits form

Backend attaches org + user

Task appears in filtered list

Viewer Attempting Modification

Viewer logs in

Viewer tries PATCH or DELETE

Backend responds with 403 Forbidden

UI hides edit/delete buttons

Add User

Owner creates new user with chosen role

User belongs to same org

New user immediately inherits correct permissions

🕵️ Audit Logging

System logs store:

userId

action

resourceType

resourceId

timestamp

Used for:

Debugging

Security auditing

Compliance

📹 Video Walkthrough

Link:
https://drive.google.com/file/d/1M7J1HXoj3hId_S8acjxcYlUIl7zAgxul/view?usp=sharing

Covers:

Auth

RBAC

Organization scoping

Viewer restrictions

Guards + service checks

Architecture reasoning

Future improvements

💡 Future Improvements

Refresh token rotation

Stronger CSRF protection

Redis caching for permissions

Dynamic/custom role creation

Audit log dashboard

Drag-and-drop Kanban board

Complete end-to-end test coverage

👩‍💻 Author

Varsha Chandrahasareddy Mulangi
📧 varshamulangi21@gmail.com