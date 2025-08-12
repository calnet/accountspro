from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from .models import Transaction, TransactionStatus
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'date']
    search_fields = ['reference', 'description']
    ordering_fields = ['date', 'reference', 'created_at']
    ordering = ['-date', '-created_at']

    @action(detail=True, methods=['post'])
    def post_transaction(self, request, pk=None):
        """Post a transaction (change status to posted)"""
        transaction = self.get_object()
        
        if transaction.status != TransactionStatus.PENDING:
            return Response(
                {'error': 'Only pending transactions can be posted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate that debits equal credits
        debit_total = sum(
            entry.amount for entry in transaction.entries.filter(entry_type='debit')
        )
        credit_total = sum(
            entry.amount for entry in transaction.entries.filter(entry_type='credit')
        )
        
        if debit_total != credit_total:
            return Response(
                {'error': 'Debit and credit totals must be equal'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        transaction.status = TransactionStatus.POSTED
        transaction.posted_at = timezone.now()
        transaction.posted_by = request.user
        transaction.save()
        
        return Response({'status': 'Transaction posted successfully'})

    @action(detail=True, methods=['post'])
    def cancel_transaction(self, request, pk=None):
        """Cancel a transaction"""
        transaction = self.get_object()
        
        if transaction.status == TransactionStatus.POSTED:
            return Response(
                {'error': 'Posted transactions cannot be cancelled'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        transaction.status = TransactionStatus.CANCELLED
        transaction.save()
        
        return Response({'status': 'Transaction cancelled successfully'})

    @action(detail=False, methods=['get'])
    def dashboard_metrics(self, request):
        """Get dashboard metrics"""
        from accounts.models import Account
        from decimal import Decimal
        
        # Calculate totals by account type
        metrics = {}
        for account_type in ['asset', 'liability', 'equity', 'revenue', 'expense']:
            accounts = Account.objects.filter(account_type=account_type, is_active=True)
            total = sum(account.balance for account in accounts)
            metrics[f'total_{account_type}s'] = total
        
        # Calculate net income (revenue - expenses)
        metrics['net_income'] = metrics.get('total_revenues', 0) - metrics.get('total_expenses', 0)
        
        # Recent transactions count
        metrics['recent_transactions'] = Transaction.objects.filter(
            status=TransactionStatus.POSTED,
            date__gte=timezone.now().date().replace(day=1)  # This month
        ).count()
        
        return Response(metrics)