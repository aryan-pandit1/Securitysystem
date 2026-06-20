from rest_framework import serializers


class RiskCheckSerializer(serializers.Serializer):

    device_id = serializers.CharField()

    location = serializers.CharField()

    transaction_amount = serializers.IntegerField()