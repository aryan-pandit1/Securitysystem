from django.urls import path

from .views import (
    DashboardSummaryView,
    RiskStatisticsView,
    FraudAlertListView,
    RecentLoginEventsView,
    RecentTransactionsView,
    RiskTrendView,
)

urlpatterns = [

    path(
        "summary/",
        DashboardSummaryView.as_view()
    ),

    path(
        "risk-stats/",
        RiskStatisticsView.as_view()
    ),

    path(
        "alerts/",
        FraudAlertListView.as_view()
    ),

    path(
        "recent-logins/",
        RecentLoginEventsView.as_view()
    ),

    path(
        "recent-transactions/",
        RecentTransactionsView.as_view()
    ),
    path(
        "risk-trends/",
        RiskTrendView.as_view(),
        name="risk-trends"
    ),
]