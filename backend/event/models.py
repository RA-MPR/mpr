from django.db import models
from company.models import Company

class Event(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    date = models.DateField(auto_now=False)
    time = models.TimeField(auto_now=False)
    description = models.TextField(blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    reminder = models.BooleanField(null=False, blank=False)
    def __str__(self):
        return f"{self.name}"

    def update(self, validated_data):
        for attr, value in validated_data.items():
            setattr(self, attr, value)

        self.save()