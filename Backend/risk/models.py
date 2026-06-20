from django.db import models
from django.contrib.auth.models import User


class TrustedDevice(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    device_id = models.CharField(
        max_length=255
    )

    first_seen = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.device_id}"


class LoginEvent(models.Model):

    STATUS_CHOICES = [
        ("SAFE", "SAFE"),
        ("OTP_REQUIRED", "OTP_REQUIRED"),
        ("BLOCKED", "BLOCKED"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    device_id = models.CharField(
        max_length=255
    )

    location = models.CharField(
        max_length=255
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
        return f"{self.user.username} - {self.status}"
    

class FraudAlert(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    risk_score = models.IntegerField()

    reason = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    resolved = models.BooleanField(
        default=False
    )

    def __str__(self):
        return f"{self.user.username} - Alert"
    

class KnownLocation(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    location = models.CharField(
        max_length=255
    )

    first_seen = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.location