# Sage-Style Accounts Application Setup

This is a professional-grade accounting application built with Django REST Framework backend and React TypeScript frontend.

## Project Structure

```
accounts-app/
├── backend/
│   ├── accounts_project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── accounts/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── management/
│   │       └── commands/
│   │           └── create_sample_data.py
│   ├── transactions/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   └── views.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend/
    ├── src/
    │   ├── types/
    │   │   └── index.ts
    │   ├── services/
    │   │   └── api.ts
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── index.html
```

## Backend Setup (Django)

### 1. Create Project Structure
```bash
mkdir accounts-app
cd accounts-app
mkdir backend
cd backend
```

### 2. Python Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
Create `requirements.txt` and install:
```bash
pip install -r requirements.txt
```

### 4. Database Setup
Option A - Using Docker:
```bash
docker run --name accounts-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=accounts_db -p 5432:5432 -d postgres:15
```

Option B - Local PostgreSQL:
Install PostgreSQL locally and create database `accounts_db`

### 5. Environment Configuration
Copy `.env.example` to `.env` and configure:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=accounts_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### 6. Django Project Setup
```bash
# Create Django project
django-admin startproject accounts_project .

# Create Django apps
python manage.py startapp accounts
python manage.py startapp transactions
python manage.py startapp users

# Create migrations
python manage.py makemigrations
python manage.py migrate

# Create sample data and superuser
python manage.py create_sample_data

# Start development server
python manage.py runserver
```

## Frontend Setup (React + Vite)

### 1. Create Frontend Directory
```bash
cd ../
mkdir frontend
cd frontend
```

### 2. Initialize React Project
```bash
npm create vite@latest . -- --template react-ts
```

### 3. Install Dependencies
Replace `package.json` with the provided version and run:
```bash
npm install
```

### 4. Configure Environment
Copy `.env.example` to `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=AccountsPro
```

### 5. Start Development Server
```bash
npm run dev
```

## Docker Setup (Optional)

### 1. Using Docker Compose
From the backend directory:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Django backend on port 8000

### 2. Run Migrations in Docker
```bash
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py create_sample_data
```

## Application Features

### Backend (Django REST API)
- ✅ JWT Authentication
- ✅ Chart of Accounts Management
- ✅ Double-entry Transaction System
- ✅ Account Balance Calculations
- ✅ Dashboard Metrics API
- ✅ Professional Data Validation
- ✅ PostgreSQL Database with Indexing

### Frontend (React TypeScript)
- ✅ Sage-style Professional UI
- ✅ Responsive Dashboard
- ✅ Account Management Interface
- ✅ Transaction Entry System
- ✅ Financial Reports Templates
- ✅ Type-safe API Integration
- ✅ Modern Component Architecture

## Default Credentials
- **Username:** admin
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/refresh/` - Refresh token

### Accounts
- `GET /api/accounts/` - List accounts
- `POST /api/accounts/` - Create account
- `GET /api/accounts/{id}/` - Get account
- `PUT/PATCH /api/accounts/{id}/` - Update account
- `DELETE /api/accounts/{id}/` - Delete account
- `GET /api/accounts/by_type/` - Accounts grouped by type
- `GET /api/accounts/chart_summary/` - Chart summary

### Transactions
- `GET /api/transactions/` - List transactions
- `POST /api/transactions/` - Create transaction
- `GET /api/transactions/{id}/` - Get transaction
- `PUT/PATCH /api/transactions/{id}/` - Update transaction
- `DELETE /api/transactions/{id}/` - Delete transaction
- `POST /api/transactions/{id}/post_transaction/` - Post transaction
- `POST /api/transactions/{id}/cancel_transaction/` - Cancel transaction
- `GET /api/transactions/dashboard_metrics/` - Dashboard metrics

## Development Workflow

1. **Backend Development:**
   - Make model changes
   - Create and run migrations: `python manage.py makemigrations && python manage.py migrate`
   - Update serializers and views as needed
   - Test API endpoints

2. **Frontend Development:**
   - Update types in `src/types/index.ts`
   - Modify API services in `src/services/api.ts`
   - Build UI components
   - Test with hot reload

3. **Testing:**
   - Backend: Django admin at `http://localhost:8000/admin/`
   - Frontend: Development server at `http://localhost:3000`
   - API: Browse API at `http://localhost:8000/api/`

## Professional Features

- **Double-entry Bookkeeping:** All transactions follow accounting principles
- **Account Hierarchy:** Support for parent-child account relationships
- **Transaction Workflow:** Draft → Pending → Posted → Cancelled
- **Real-time Balance Calculation:** Account balances calculated from posted transactions
- **Professional UI:** Sage-inspired design with modern UX
- **Type Safety:** Full TypeScript coverage on frontend
- **API Security:** JWT authentication with refresh tokens
- **Database Optimization:** Proper indexing and relationships

## Deployment Ready

- Docker configuration included
- Environment variable configuration
- Production-ready Django settings structure
- Optimized database queries
- Professional error handling