from django.db import models
from company.models import Company
from users.models import User


class Event(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    date = models.DateField(auto_now=False)
    time = models.TimeField(auto_now=False)
    description = models.TextField(blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True, related_name="events")
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    is_active = models.BooleanField(null=False, blank=False, default=True)
    reminder = models.BooleanField(null=False, blank=False)

    def __str__(self):
        return f"{self.name}"

    def update(self, validated_data):
        for attr, value in validated_data.items():
            setattr(self, attr, value)

        self.save()
