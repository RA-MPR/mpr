from django.db import models
from order.models import Order


class Invoice(models.Model):
    date = models.DateField(null=False, blank=False)
    sum = models.PositiveIntegerField(null=False, blank=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False)

    class Meta:
        default_related_name = "Invoice"
