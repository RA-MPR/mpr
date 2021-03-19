from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Address(models.Model):
    street = models.CharField(max_length=200, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.street}, {self.zip_code} {self.city}"


class Company(models.Model):
    ico = models.IntegerField(blank=False, null=False, primary_key=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    contact_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, blank=True, null=True, related_name="company_contact"
    )
    billing_address = models.ForeignKey(
        Address, on_delete=models.CASCADE, blank=True, null=True, related_name="company_billing"
    )
    phone_number = PhoneNumberField(null=True, blank=True)
    ad_volume = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"
