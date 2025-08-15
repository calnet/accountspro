from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    balance = serializers.DecimalField(max_digits=15, decimal_places=2, read_only=True)
    parent_account_name = serializers.CharField(source='parent_account.name', read_only=True)
    
    class Meta:
        model = Account
        fields = [
            'id', 'code', 'name', 'account_type', 'parent_account', 
            'parent_account_name', 'is_active', 'description', 
            'balance', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)