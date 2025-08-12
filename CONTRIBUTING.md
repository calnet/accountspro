# Contributing to AccountsPro

Thank you for your interest in contributing to AccountsPro! We welcome contributions from the community and are grateful for any help you can provide.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your changes
5. Make your changes
6. Test your changes
7. Submit a pull request

## Development Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure your .env file
python manage.py migrate
python manage.py create_sample_data
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

## Making Changes

### Branch Naming

Use descriptive branch names with the following prefixes:

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring

Examples:
- `feature/transaction-reports`
- `bugfix/balance-calculation`
- `docs/api-documentation`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat(transactions): add transaction posting functionality
fix(accounts): correct balance calculation for expense accounts
docs(api): update authentication endpoints documentation
```

## Submitting Changes

1. **Create a Pull Request**
   - Use a clear and descriptive title
   - Fill out the pull request template
   - Link any related issues

2. **Pull Request Requirements**
   - All tests must pass
   - Code coverage should not decrease
   - Follow style guidelines
   - Include documentation updates if needed

3. **Review Process**
   - At least one maintainer review is required
   - Address any requested changes
   - Ensure CI/CD pipeline passes

## Style Guidelines

### Backend (Python/Django)

- Follow [PEP 8](https://pep8.org/) style guide
- Use [Black](https://black.readthedocs.io/) for code formatting
- Maximum line length: 88 characters
- Use type hints where appropriate
- Write docstrings for all public methods and classes

```python
def calculate_account_balance(account: Account) -> Decimal:
    """
    Calculate the balance for a given account.
    
    Args:
        account: The account to calculate balance for
        
    Returns:
        The calculated balance as a Decimal
    """
    # Implementation here
```

### Frontend (TypeScript/React)

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Follow ESLint configuration
- Use Prettier for code formatting

```typescript
interface AccountProps {
  account: Account;
  onUpdate: (account: Account) => void;
}

const AccountCard: React.FC<AccountProps> = ({ account, onUpdate }) => {
  // Component implementation
};
```

### Database

- Use descriptive table and column names
- Add appropriate indexes for performance
- Include migrations for all schema changes
- Document complex queries

## Testing

### Backend Testing

```bash
cd backend
python manage.py test
```

- Write unit tests for all new functionality
- Include integration tests for API endpoints
- Maintain test coverage above 80%
- Use Django's built-in testing framework

### Frontend Testing

```bash
cd frontend
npm run test
```

- Write unit tests for utility functions
- Include component tests for complex components
- Test user interactions and API integration

### Test Structure

```
backend/
├── accounts/
│   ├── tests/
│   │   ├── test_models.py
│   │   ├── test_views.py
│   │   └── test_serializers.py

frontend/
├── src/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── AccountCard.test.tsx
```

## Documentation

### API Documentation

- Document all API endpoints
- Include request/response examples
- Update OpenAPI/Swagger documentation

### Code Documentation

- Add inline comments for complex logic
- Update README.md for new features
- Include setup instructions for new dependencies

### User Documentation

- Update user guides for new features
- Include screenshots for UI changes
- Maintain troubleshooting guides

## Issue Reporting

When reporting issues, include:

1. **Bug Reports**
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

2. **Feature Requests**
   - Clear description of the feature
   - Use cases and benefits
   - Proposed implementation (if any)

## Development Workflow

1. **Pick an Issue**
   - Look for issues labeled `good first issue` for beginners
   - Comment on the issue to claim it

2. **Development**
   - Create a new branch from `develop`
   - Make your changes
   - Write tests
   - Update documentation

3. **Before Submitting**
   - Run all tests locally
   - Check code style compliance
   - Update CHANGELOG.md if applicable

4. **Pull Request**
   - Submit PR against `develop` branch
   - Fill out the PR template completely
   - Respond to review feedback promptly

## Getting Help

- **Discord/Slack**: Join our community chat
- **Issues**: Create an issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact maintainers directly for security issues

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Annual contributor spotlight

Thank you for contributing to AccountsPro! 🎉