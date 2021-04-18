from django.db import models
from company.models import Company
from users.models import User
from django.db.models import Func



class Order(models.Model):
    date = models.DateField(null=False, blank=False)
    contract_number = models.CharField(null=False, blank=False, max_length=50)
    sum = models.PositiveIntegerField(null=False, blank=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=False, blank=False, related_name="orders")
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)

    class Meta:
        default_related_name = "Order"


class Month(Func):
    function = 'EXTRACT'
    template = '%(function)s(MONTH from %(expressions)s)'
    output_field = models.IntegerField()
