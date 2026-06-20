from django.db import models
from django.contrib.auth.models import User


class Transaction(models.Model):

    STATUS_CHOICES = [
        ("SUCCESS", "SUCCESS"),
        ("OTP_REQUIRED", "OTP_REQUIRED"),
        ("BLOCKED", "BLOCKED"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    recipient = models.CharField(
        max_length=255
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    risk_score = models.IntegerField(
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} -> {self.recipient}"