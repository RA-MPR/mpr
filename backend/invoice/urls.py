from django.urls import path, re_path

from invoice.views import InvoiceByIdView, InvoiceView

urlpatterns = [
    re_path(r"^$", InvoiceView.as_view(), name="invoice"),
    path(r"<id>", InvoiceByIdView.as_view(), name="invoice_id"),
]