from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from decimal import Decimal

class AccountType(models.TextChoices):
    ASSET = 'asset', 'Asset'
    LIABILITY = 'liability', 'Liability'
    EQUITY = 'equity', 'Equity'
    REVENUE = 'revenue', 'Revenue'
    EXPENSE = 'expense', 'Expense'

class Account(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=255)
    account_type = models.CharField(max_length=20, choices=AccountType.choices)
    parent_account = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='sub_accounts'
    )
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['code']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['account_type']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

    @property
    def balance(self):
        """Calculate account balance from transactions"""
        from transactions.models import TransactionEntry
        
        debit_total = TransactionEntry.objects.filter(
            account=self,
            entry_type='debit',
            transaction__status='posted'
        ).aggregate(total=models.Sum('amount'))['total'] or Decimal('0')
        
        credit_total = TransactionEntry.objects.filter(
            account=self,
            entry_type='credit',
            transaction__status='posted'
        ).aggregate(total=models.Sum('amount'))['total'] or Decimal('0')
        
        # For assets and expenses, debit increases balance
        # For liabilities, equity, and revenue, credit increases balance
        if self.account_type in ['asset', 'expense']:
            return debit_total - credit_total
        else:
            return credit_total - debit_total