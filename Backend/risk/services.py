from .models import TrustedDevice
from .models import KnownLocation
from .models import LoginEvent
from .models import FraudAlert

def calculate_risk(
    new_device=False,
    new_location=False,
    unusual_time=False,
    high_amount=False
):

    score = 0
    reasons = []

    if new_device:
        score += 30
        reasons.append("New Device")

    if new_location:
        score += 25
        reasons.append("New Location")

    if unusual_time:
        score += 20
        reasons.append("Unusual Login Time")

    if high_amount:
        score += 25
        reasons.append("High Value Transaction")

    return score, reasons

def get_risk_status(score):

    if score <= 30:
        return "SAFE"

    elif score <= 60:
        return "OTP_REQUIRED"

    return "BLOCKED"

def is_new_device(user, device_id):

    return not TrustedDevice.objects.filter(
        user=user,
        device_id=device_id
    ).exists()

def is_new_location(user, location):

    return not KnownLocation.objects.filter(
        user=user,
        location=location
    ).exists()

def save_trusted_device(
    user,
    device_id
):

    TrustedDevice.objects.get_or_create(
        user=user,
        device_id=device_id
    )

def save_location(
    user,
    location
):

    KnownLocation.objects.get_or_create(
        user=user,
        location=location
    )


def save_login_event(
    user,
    device_id,
    location,
    score,
    status
):

    LoginEvent.objects.create(
        user=user,
        device_id=device_id,
        location=location,
        risk_score=score,
        status=status
    )

def create_fraud_alert(
    user,
    score,
    reasons
):

    FraudAlert.objects.create(
        user=user,
        risk_score=score,
        reason=", ".join(reasons)
    )