from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.generics import RetrieveAPIView

from .models import Transaction
from .serializers import TransactionSerializer

from .models import Transaction
from .serializers import TransactionSerializer

from risk.services import (
    calculate_risk,
    get_risk_status,
    create_fraud_alert
)


class TransactionCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        recipient = request.data.get("recipient")
        amount = float(
            request.data.get("amount", 0)
        )

        score, reasons = calculate_risk(
            new_device=False,
            new_location=False,
            unusual_time=False,
            high_amount=amount > 10000
        )

        risk_status = get_risk_status(score)

        if risk_status == "SAFE":
            transaction_status = "SUCCESS"

        elif risk_status == "OTP_REQUIRED":
            
            transaction_status = "OTP_REQUIRED"

        else:
            transaction_status = "BLOCKED"

        transaction = Transaction.objects.create(
            user=request.user,
            recipient=recipient,
            amount=amount,
            risk_score=score,
            status=transaction_status
        )

        if transaction_status == "BLOCKED":

            create_fraud_alert(
                request.user,
                score,
                reasons
            )

        return Response({
            "transaction_id": transaction.id,
            "recipient": recipient,
            "amount": amount,
            "risk_score": score,
            "status": transaction_status,
            "reasons": reasons
        })
    
class TransactionHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        transactions = Transaction.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = TransactionSerializer(
            transactions,
            many=True
        )

        return Response(serializer.data)


class TransactionDetailView(
    RetrieveAPIView
):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

