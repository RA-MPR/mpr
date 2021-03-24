from django.urls import path, re_path

from order.views import OrderByIdView, OrderView

urlpatterns = [
    re_path(r"^$", OrderView.as_view(), name="order"),
    path(r"<id>", OrderByIdView.as_view(), name="order_id"),
]