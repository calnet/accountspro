from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Account
from .serializers import AccountSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.filter(is_active=True)
    serializer_class = AccountSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['account_type', 'parent_account']
    search_fields = ['code', 'name', 'description']
    ordering_fields = ['code', 'name', 'created_at']
    ordering = ['code']

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get accounts grouped by type"""
        accounts_by_type = {}
        for account_type in ['asset', 'liability', 'equity', 'revenue', 'expense']:
            accounts = Account.objects.filter(
                account_type=account_type, 
                is_active=True
            ).order_by('code')
            accounts_by_type[account_type] = AccountSerializer(accounts, many=True).data
        return Response(accounts_by_type)

    @action(detail=False, methods=['get'])
    def chart_summary(self, request):
        """Get chart of accounts summary with balances"""
        accounts = self.get_queryset()
        summary = {
            'total_accounts': accounts.count(),
            'by_type': {},
            'total_balances': {}
        }
        
        for account_type in ['asset', 'liability', 'equity', 'revenue', 'expense']:
            type_accounts = accounts.filter(account_type=account_type)
            summary['by_type'][account_type] = type_accounts.count()
            summary['total_balances'][account_type] = sum(
                account.balance for account in type_accounts
            )
        
        return Response(summary)