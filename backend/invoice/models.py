from django.db import models
from order.models import Order
from users.models import User


class Invoice(models.Model):
    date = models.DateField(null=False, blank=False)
    sum = models.PositiveIntegerField(null=False, blank=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        default_related_name = "Invoice"
