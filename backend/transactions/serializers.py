from rest_framework import serializers
from django.db import transaction as db_transaction
from .models import Transaction, TransactionEntry
from accounts.models import Account

class TransactionEntrySerializer(serializers.ModelSerializer):
    account_code = serializers.CharField(source='account.code', read_only=True)
    account_name = serializers.CharField(source='account.name', read_only=True)
    
    class Meta:
        model = TransactionEntry
        fields = [
            'id', 'account', 'account_code', 'account_name', 
            'entry_type', 'amount', 'description'
        ]

class TransactionSerializer(serializers.ModelSerializer):
    entries = TransactionEntrySerializer(many=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    posted_by_username = serializers.CharField(source='posted_by.username', read_only=True)
    
    class Meta:
        model = Transaction
        fields = [
            'id', 'reference', 'date', 'description', 'status', 
            'total_amount', 'entries', 'created_by_username', 
            'posted_by_username', 'created_at', 'updated_at', 'posted_at'
        ]
        read_only_fields = ['created_by', 'posted_by', 'posted_at']

    def create(self, validated_data):
        entries_data = validated_data.pop('entries')
        
        with db_transaction.atomic():
            transaction_obj = Transaction.objects.create(
                **validated_data,
                created_by=self.context['request'].user
            )
            
            for entry_data in entries_data:
                TransactionEntry.objects.create(
                    transaction=transaction_obj,
                    **entry_data
                )
            
            return transaction_obj

    def update(self, instance, validated_data):
        entries_data = validated_data.pop('entries', None)
        
        with db_transaction.atomic():
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            
            if entries_data is not None:
                # Delete existing entries and create new ones
                instance.entries.all().delete()
                for entry_data in entries_data:
                    TransactionEntry.objects.create(
                        transaction=instance,
                        **entry_data
                    )
            
            return instance