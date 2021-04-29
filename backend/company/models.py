from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from users.models import User


class Address(models.Model):
    street = models.CharField(max_length=200, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.street}, {self.zip_code} {self.city}"

    def update(self, validated_data):
        for attr, value in validated_data.items():
            setattr(self, attr, value)
        self.save()


class Company(models.Model):
    ico = models.CharField(blank=False, null=False, primary_key=True, max_length=8)
    name = models.CharField(max_length=200, blank=True, null=True)
    contact_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, blank=True, null=True, related_name="company_contact"
    )
    billing_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, blank=True, null=True, related_name="company_billing"
    )
    phone_number = PhoneNumberField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    create_date = models.DateField(null=True, blank=True)
    modification_date = models.DateField(null=True, blank=True)
    ad_volume = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    status_color = models.CharField(max_length=30, blank=True, null=True)
    status_modification_date = models.DateField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    update_user = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

    def update(self, validated_data):
        for attr, value in validated_data.items():
            setattr(self, attr, value)
        self.save()
