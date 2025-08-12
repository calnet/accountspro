from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import Account
from transactions.models import Transaction, TransactionEntry
from decimal import Decimal
from datetime import date

class Command(BaseCommand):
    help = 'Create sample data for the accounts application'

    def handle(self, *args, **options):
        # Create superuser if not exists
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write('Created superuser: admin/admin123')

        user = User.objects.get(username='admin')

        # Create sample accounts
        accounts_data = [
            {'code': '1000', 'name': 'Cash', 'account_type': 'asset'},
            {'code': '1200', 'name': 'Accounts Receivable', 'account_type': 'asset'},
            {'code': '1500', 'name': 'Equipment', 'account_type': 'asset'},
            {'code': '2000', 'name': 'Accounts Payable', 'account_type': 'liability'},
            {'code': '2100', 'name': 'Bank Loan', 'account_type': 'liability'},
            {'code': '3000', 'name': 'Owner\'s Equity', 'account_type': 'equity'},
            {'code': '4000', 'name': 'Sales Revenue', 'account_type': 'revenue'},
            {'code': '5000', 'name': 'Office Expenses', 'account_type': 'expense'},
            {'code': '5100', 'name': 'Rent Expense', 'account_type': 'expense'},
        ]

        for account_data in accounts_data:
            Account.objects.get_or_create(
                code=account_data['code'],
                defaults={
                    **account_data,
                    'created_by': user
                }
            )

        self.stdout.write('Sample accounts created successfully')