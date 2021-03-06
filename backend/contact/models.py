from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from company.models import Company


class Contact(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    surname = models.CharField(max_length=200, blank=False, null=False)
    phone = PhoneNumberField(null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, related_name="contacts")

    def __str__(self):
        return f"{self.name} {self.surname}"

    def update(self, validated_data):
        for attr, value in validated_data.items():
            setattr(self, attr, value)
        self.save()
