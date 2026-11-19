# Company Vehicles Management System

> ⚠️ **DISCLAIMER**
>
> **TH:** ระบบนี้ถูกพัฒนาขึ้นเพื่อวัตถุประสงค์ในการทดสอบและประเมินผลทักษะการพัฒนาระบบ (Technical Assessment) เท่านั้น
>
> **EN:** This project is developed **for technical assessment purposes only**. 

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#-key-features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints Overview](#api-endpoints-overview)

---

## 📌 Project Overview

A full-stack web application for managing company vehicle records, built to replace manual paper logbooks. The system provides full CRUD operations, keyword search, pagination, interactive Swagger API documentation, and a cookie-based mock authentication flow. Although the user interface and validation messages are localized in Thai, the project structure and API follow standard English conventions.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Ant Design (`antd`), Axios, React Router DOM, IBM Plex Sans Thai (Google Fonts)
- **Backend:** Node.js, NestJS, TypeORM, `class-validator`, `class-transformer`, Swagger (`@nestjs/swagger`)
- **Database:** PostgreSQL 16 (Docker Compose) with initial seed data (`database/init/01-init-vehicles.sql`)
- **Version Control:** Git

## Project Structure

```text
company-vehicles/
├── docker-compose.yml
├── .gitignore
├── README.md
├── database/
│   └── init/
│       └── 01-init-vehicles.sql
├── backend/
│   ├── .env
│   └── src/
│       ├── app.module.ts
│       ├── main.ts
│       └── vehicles/
│           ├── vehicles.module.ts
│           ├── vehicles.controller.ts
│           ├── vehicles.service.ts
│           ├── vehicle.entity.ts
│           └── dto/
│               ├── create-vehicle.dto.ts
│               ├── update-vehicle.dto.ts
│               └── query-vehicle.dto.ts
└── frontend/
    ├── .env
    ├── index.html
    └── src/
        ├── App.tsx
        ├── index.css
        ├── components/
        │   ├── AppLayout.tsx
        │   └── StatusTag.tsx
        ├── pages/
        │   ├── LoginPage.tsx
        │   ├── VehicleListPage.tsx
        │   ├── VehicleDetailPage.tsx
        │   └── VehicleFormPage.tsx
        ├── services/
        │   └── vehicleApi.ts
        └── utils/
            └── authCookie.ts
```

## ✨ Key Features

- **Mock Cookie Authentication:** Simulates user login by setting a `login=true` cookie (`SameSite=Lax`) and clears the cookie on logout to return to the login screen.
- **Vehicle List (`/vehicles`):** Displays all registered company vehicles in a paginated table with real-time search (by car registration number, brand, model, or note) and quick actions (View, Edit, Delete). Automatically steps back a page when the last item on the current page is deleted.
- **Vehicle Detail (`/vehicles/:id`):** Shows complete details for a single vehicle including car registration number, brand, model, year, color, status (`AVAILABLE`, `IN_USE`, `MAINTENANCE`), notes, and timestamps.
- **Create & Edit Vehicle (`/vehicles/new`, `/vehicles/:id/edit`):** Form with client-side and server-side validation, including duplicate car registration number detection.
- **RESTful API & Swagger Documentation:** Exposes standard CRUD endpoints with interactive API testing available at `/api/docs`.

## Prerequisites

- Node.js (v18 or v20+ recommended) and npm
- Docker Desktop (for running PostgreSQL)
- Git

## Getting Started

### 1. Start PostgreSQL with Docker Compose

From the project root directory, start the PostgreSQL container and automatically initialize the `vehicles` table with sample records:

```bash
docker compose up -d
```

> **Note:** Initialization scripts in `database/init/` run only when the Docker volume is created for the first time. To reset the database back to its initial seed state, run `docker compose down -v && docker compose up -d`.

### 2. Setup & Run Backend (NestJS)

Create a `backend/.env` file:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=vehicles_user
DB_PASS=vehicles_dev_pass
DB_NAME=company_vehicles
```

Install dependencies and start the development server:

```bash
cd backend
npm install
npm run start:dev
```

- **Backend API:** `http://localhost:3001`
- **Swagger UI:** `http://localhost:3001/api/docs`

### 3. Setup & Run Frontend (React + Vite)

Create a `frontend/.env` file:

```env
VITE_API_BASE_URL=http://localhost:3001
```

In a separate terminal, install dependencies and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

- **Frontend App:** `http://localhost:5173`

## API Endpoints Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/vehicles` | Retrieve a paginated list of vehicles (supports `search`, `page`, `limit`) |
| `GET` | `/vehicles/:id` | Retrieve details of a specific vehicle by ID |
| `POST` | `/vehicles` | Create a new vehicle record |
| `PATCH` | `/vehicles/:id` | Update an existing vehicle record by ID |
| `DELETE` | `/vehicles/:id` | Delete a vehicle record by ID |