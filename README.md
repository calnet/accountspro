# AccountsPro - Professional Accounting Application

A modern, full-stack accounting application built with Django REST Framework and React TypeScript, designed with Sage-style professional UI/UX.

![AccountsPro Dashboard](https://via.placeholder.com/800x400/1f2937/10b981?text=AccountsPro+Dashboard)

## 🚀 Features

### Backend (Django REST API)
- ✅ **Double-Entry Bookkeeping** - Proper accounting principles with debit/credit validation
- ✅ **Chart of Accounts** - Hierarchical account structure with parent-child relationships
- ✅ **Transaction Management** - Draft → Pending → Posted → Cancelled workflow
- ✅ **Real-time Balance Calculation** - Account balances calculated from posted transactions
- ✅ **JWT Authentication** - Secure API access with token refresh
- ✅ **Professional Data Validation** - Comprehensive business rule enforcement
- ✅ **PostgreSQL Database** - Optimized with proper indexing and relationships

### Frontend (React TypeScript)
- ✅ **Sage-Style UI** - Professional accounting software interface
- ✅ **Responsive Dashboard** - Financial overview with key metrics
- ✅ **Account Management** - Create, edit, and organize chart of accounts
- ✅ **Transaction Entry** - Intuitive double-entry transaction recording
- ✅ **Financial Reports** - Template system for standard accounting reports
- ✅ **Type-Safe API Integration** - Full TypeScript coverage with Axios
- ✅ **Modern Component Architecture** - Reusable, maintainable React components

## 🛠 Tech Stack

**Backend:**
- Django 4.2.7
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Docker & Docker Compose

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React Icons

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+ (or Docker)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/accountspro.git
   cd accountspro/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup**
   ```bash
   # Option A: Using Docker
   docker run --name accounts-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=accounts_db -p 5432:5432 -d postgres:15
   
   # Option B: Use local PostgreSQL and create database 'accounts_db'
   ```

5. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

6. **Run migrations and create sample data**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py create_sample_data
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Configure API URL if needed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Docker Setup (Alternative)

1. **Using Docker Compose**
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Run migrations in Docker**
   ```bash
   docker-compose exec backend python manage.py migrate
   docker-compose exec backend python manage.py create_sample_data
   ```

## 🚀 Usage

1. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Django Admin: http://localhost:8000/admin

2. **Default credentials:**
   - Username: `admin`
   - Password: `admin123`

3. **Key workflows:**
   - Create accounts in the Chart of Accounts
   - Record transactions with proper debit/credit entries
   - View real-time financial dashboard
   - Generate financial reports

## 📊 API Documentation

### Authentication
```bash
# Login
POST /api/auth/login/
{
  "username": "admin",
  "password": "admin123"
}

# Refresh token
POST /api/auth/refresh/
{
  "refresh": "your_refresh_token"
}
```

### Accounts
```bash
# List accounts
GET /api/accounts/

# Create account
POST /api/accounts/
{
  "code": "1000",
  "name": "Cash",
  "account_type": "asset",
  "description": "Primary cash account"
}

# Get accounts by type
GET /api/accounts/by_type/

# Get chart summary
GET /api/accounts/chart_summary/
```

### Transactions
```bash
# List transactions
GET /api/transactions/

# Create transaction
POST /api/transactions/
{
  "reference": "TXN-001",
  "date": "2025-01-15",
  "description": "Cash sale",
  "total_amount": 1000.00,
  "entries": [
    {
      "account": "1",
      "entry_type": "debit",
      "amount": 1000.00
    },
    {
      "account": "7",
      "entry_type": "credit",
      "amount": 1000.00
    }
  ]
}

# Post transaction
POST /api/transactions/{id}/post_transaction/

# Get dashboard metrics
GET /api/transactions/dashboard_metrics/
```

## 🏗 Project Structure

```
accountspro/
├── backend/
│   ├── accounts_project/          # Django project settings
│   ├── accounts/                  # Chart of accounts app
│   ├── transactions/              # Transaction management app
│   ├── users/                     # User management app
│   ├── requirements.txt
│   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── services/              # API service layer
│   │   ├── App.tsx                # Main application component
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
└── README.md
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Production Environment Variables

**Backend (.env)**
```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DB_NAME=accounts_db_prod
DB_USER=prod_user
DB_PASSWORD=secure_password
DB_HOST=your-db-host
DB_PORT=5432
```

**Frontend (.env.production)**
```env
VITE_API_BASE_URL=https://yourdomain.com/api
VITE_APP_NAME=AccountsPro
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for all frontend code
- Write tests for new features
- Update documentation for API changes
- Follow conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Sage accounting software design
- Built with modern web development best practices
- Community feedback and contributions

## 📧 Support

- Create an issue for bug reports
- Discussions for feature requests
- Wiki for additional documentation

---

**AccountsPro** - Professional accounting made simple with modern technology.