from django.contrib import admin
from .models import TrustedDevice, LoginEvent ,FraudAlert ,KnownLocation

admin.site.register(TrustedDevice)
admin.site.register(LoginEvent)
admin.site.register(FraudAlert)
admin.site.register(KnownLocation)