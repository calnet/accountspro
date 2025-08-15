from django.contrib import admin
from .models import Transaction, TransactionEntry

class TransactionEntryInline(admin.TabularInline):
    model = TransactionEntry
    extra = 0

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['reference', 'date', 'description', 'status', 'total_amount', 'created_at']
    list_filter = ['status', 'date', 'created_at']
    search_fields = ['reference', 'description']
    ordering = ['-date', '-created_at']
    readonly_fields = ['created_at', 'updated_at', 'posted_at']
    inlines = [TransactionEntryInline]

@admin.register(TransactionEntry)
class TransactionEntryAdmin(admin.ModelAdmin):
    list_display = ['transaction', 'account', 'entry_type', 'amount']
    list_filter = ['entry_type', 'transaction__status']
    search_fields = ['transaction__reference', 'account__name', 'account__code']