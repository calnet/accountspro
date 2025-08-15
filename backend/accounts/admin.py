from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'account_type', 'is_active', 'balance', 'created_at']
    list_filter = ['account_type', 'is_active', 'created_at']
    search_fields = ['code', 'name', 'description']
    ordering = ['code']
    readonly_fields = ['balance', 'created_at', 'updated_at']