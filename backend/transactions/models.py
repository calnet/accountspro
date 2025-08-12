from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from decimal import Decimal
from accounts.models import Account

class TransactionStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PENDING = 'pending', 'Pending'
    POSTED = 'posted', 'Posted'
    CANCELLED = 'cancelled', 'Cancelled'

class EntryType(models.TextChoices):
    DEBIT = 'debit', 'Debit'
    CREDIT = 'credit', 'Credit'

class Transaction(models.Model):
    reference = models.CharField(max_length=50, unique=True)
    date = models.DateField()
    description = models.TextField()
    status = models.CharField(
        max_length=20, 
        choices=TransactionStatus.choices, 
        default=TransactionStatus.DRAFT
    )
    total_amount = models.DecimalField(
        max_digits=15, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    posted_at = models.DateTimeField(null=True, blank=True)
    posted_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='posted_transactions'
    )

    class Meta:
        ordering = ['-date', '-created_at']
        indexes = [
            models.Index(fields=['reference']),
            models.Index(fields=['date']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.reference} - {self.description}"

    def clean(self):
        """Validate that debits equal credits"""
        from django.core.exceptions import ValidationError
        
        if self.pk:  # Only validate if transaction exists
            debit_total = self.entries.filter(entry_type='debit').aggregate(
                total=models.Sum('amount')
            )['total'] or Decimal('0')
            
            credit_total = self.entries.filter(entry_type='credit').aggregate(
                total=models.Sum('amount')
            )['total'] or Decimal('0')
            
            if debit_total != credit_total:
                raise ValidationError("Debit and credit totals must be equal")

class TransactionEntry(models.Model):
    transaction = models.ForeignKey(
        Transaction, 
        on_delete=models.CASCADE,
        related_name='entries'
    )
    account = models.ForeignKey(Account, on_delete=models.PROTECT)
    entry_type = models.CharField(max_length=10, choices=EntryType.choices)
    amount = models.DecimalField(
        max_digits=15, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['entry_type', 'account__code']
        indexes = [
            models.Index(fields=['transaction', 'entry_type']),
            models.Index(fields=['account', 'entry_type']),
        ]

    def __str__(self):
        return f"{self.transaction.reference} - {self.entry_type} {self.account.code}"