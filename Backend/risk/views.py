from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services import (
    calculate_risk,
    get_risk_status ,
    is_new_device,
    is_new_location,
    save_trusted_device,
    save_location,
    save_login_event,
    create_fraud_alert
)


class RiskCheckView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        device_id = request.data.get("device_id")
        location = request.data.get("location")

        amount = int(
            request.data.get(
                "transaction_amount",
                0
            )
        )

        # Check if device is new
        new_device = is_new_device(
            user,
            device_id
        )

        # Check if location is new
        new_location = is_new_location(
            user,
            location
        )

        # Calculate risk
        score, reasons = calculate_risk(
            new_device=new_device,
            new_location=new_location,
            unusual_time=False,
            high_amount=amount > 10000
        )

        status = get_risk_status(score)

        # Save login event
        save_login_event(
            user,
            device_id,
            location,
            score,
            status
        )

        # Save trusted device
        save_trusted_device(
            user,
            device_id
        )

        # Save location
        save_location(
            user,
            location
        )

        # Create fraud alert if blocked
        if status == "BLOCKED":
            create_fraud_alert(
                user,
                score,
                reasons
            )

        return Response({
            "device_id": device_id,
            "location": location,
            "risk_score": score,
            "status": status,
            "reasons": reasons
        })