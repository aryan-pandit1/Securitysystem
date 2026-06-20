from django.shortcuts import render
from .permissions import IsAdminUserOnly

# Create your views here.
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from risk.models import (
    LoginEvent,
    FraudAlert
)

from transactions.models import Transaction

class DashboardSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({

            "total_users":
                User.objects.count(),

            "total_logins":
                LoginEvent.objects.count(),

            "total_transactions":
                Transaction.objects.count(),

            "total_alerts":
                FraudAlert.objects.count()
        })
    
class RiskStatisticsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        safe_count = LoginEvent.objects.filter(
            status="SAFE"
        ).count()

        otp_count = LoginEvent.objects.filter(
            status="OTP_REQUIRED"
        ).count()

        blocked_count = LoginEvent.objects.filter(
            status="BLOCKED"
        ).count()

        return Response({

            "safe": safe_count,

            "otp_required": otp_count,

            "blocked": blocked_count
        })
    
class FraudAlertListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        alerts = FraudAlert.objects.order_by(
            "-created_at"
        )[:20]

        data = []

        for alert in alerts:

            data.append({

                "id": alert.id,

                "user":
                    alert.user.username,

                "risk_score":
                    alert.risk_score,

                "reason":
                    alert.reason,

                "created_at":
                    alert.created_at
            })

        return Response(data)
    
class RecentLoginEventsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        events = LoginEvent.objects.order_by(
            "-created_at"
        )[:20]

        data = []

        for event in events:

            data.append({

                "user":
                    event.user.username,

                "device":
                    event.device_id,

                "location":
                    event.location,

                "risk_score":
                    event.risk_score,

                "status":
                    event.status,

                "time":
                    event.created_at
            })

        return Response(data)
    
class RecentTransactionsView(APIView):

    permission_classes = [IsAuthenticated , IsAdminUserOnly]

    def get(self, request):

        transactions = Transaction.objects.order_by(
            "-created_at"
        )[:20]

        data = []

        for transaction in transactions:

            data.append({

                "user":
                    transaction.user.username,

                "recipient":
                    transaction.recipient,

                "amount":
                    transaction.amount,

                "risk_score":
                    transaction.risk_score,

                "status":
                    transaction.status,

                "created_at":
                    transaction.created_at
            })

        return Response(data)


class RiskTrendView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminUserOnly
    ]

    def get(self, request):

        return Response({

            "safe": LoginEvent.objects.filter(
                status="SAFE"
            ).count(),

            "otp_required": LoginEvent.objects.filter(
                status="OTP_REQUIRED"
            ).count(),

            "blocked": LoginEvent.objects.filter(
                status="BLOCKED"
            ).count()
        })