from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    user = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = [
            "user",
            "risk_score",
            "status"
        ]