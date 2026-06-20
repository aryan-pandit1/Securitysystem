from django.urls import path
from .views import RiskCheckView

urlpatterns = [
    path(
        "check/",
        RiskCheckView.as_view(),
        name="risk-check"
    ),
]