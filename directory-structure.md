# Complete File Structure for Sage Accounts Application

## Backend (Django) - `/backend/`

```
backend/
├── manage.py
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── accounts_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── accounts/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── migrations/
│   │   └── __init__.py
│   └── management/
│       ├── __init__.py
│       └── commands/
│           ├── __init__.py
│           └── create_sample_data.py
├── transactions/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── migrations/
│       └── __init__.py
└── users/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    └── migrations/
        └── __init__.py
```

## Frontend (React + Vite) - `/frontend/`

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.tsx
    ├── App.tsx (from the React artifact)
    ├── index.css
    ├── types/
    │   └── index.ts
    └── services/
        └── api.ts
```

## File Creation Order

### Step 1: Backend Setup
1. Create `requirements.txt`
2. Create `manage.py`
3. Create `accounts_project/settings.py`
4. Create `accounts_project/urls.py`
5. Create app files (`__init__.py`, `apps.py`)
6. Create `accounts/models.py`
7. Create `accounts/serializers.py`
8. Create `accounts/views.py`
9. Create `accounts/admin.py`
10. Create `transactions/models.py`
11. Create `transactions/serializers.py`
12. Create `transactions/views.py`
13. Create `transactions/admin.py`
14. Create `users/models.py`
15. Create `users/admin.py`
16. Create management command
17. Create Docker files

### Step 2: Frontend Setup
1. Create `package.json`
2. Create `vite.config.ts`
3. Create TypeScript configs
4. Create Tailwind configs
5. Create `index.html`
6. Create `src/main.tsx`
7. Create `src/index.css`
8. Create `src/types/index.ts`
9. Create `src/services/api.ts`
10. Copy the React component from the first artifact to `src/App.tsx`

### Step 3: Environment Setup
1. Copy `.env.example` files to `.env` in both directories
2. Configure database connection
3. Run migrations
4. Create sample data
5. Start both servers

## Quick Start Commands

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py create_sample_data
python manage.py runserver

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Your application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

Login with: admin / admin123