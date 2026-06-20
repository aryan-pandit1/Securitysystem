from django.urls import path

from .views import (
    TransactionCreateView,
    TransactionHistoryView,
    TransactionDetailView
)

urlpatterns = [

    path(
        "create/",
        TransactionCreateView.as_view(),
        name="create-transaction"
    ),

    path(
        "history/",
        TransactionHistoryView.as_view(),
        name="transaction-history"
    ),

    path(
    "<int:pk>/",
    TransactionDetailView.as_view(),
    name="transaction-detail"
),
]