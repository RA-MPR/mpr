from django.db import models
from company.models import Company


class Order(models.Model):
    date = models.DateField(null=False, blank=False)
    contract_number = models.IntegerField(null=False, blank=False)
    sum = models.PositiveIntegerField(null=False, blank=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False, blank=False, related_name="orders")

    class Meta:
        default_related_name = "Order"
