import random


def generate_otp():
    return str(
        random.randint(
            100000,
            999999
        )
    )
from django.core.mail import send_mail
from django.conf import settings


def send_otp_email(user, otp):

    subject = "OTP Verification"

    message = f"""
Hello {user.username},

Your OTP for verification is:

{otp}

This OTP is valid for 5 minutes.

Regards,
TrustShield AI
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )

def send_security_alert(user, reasons):

    subject = "Security Alert"

    message = f"""
Hello {user.username},

Suspicious activity was detected on your account.

Reasons:

{', '.join(reasons)}

If this was not you, please secure your account immediately.

TrustShield AI
"""

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )