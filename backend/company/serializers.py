from django.shortcuts import get_object_or_404
from rest_framework import serializers

from . import models


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


class CompanySerializer(serializers.ModelSerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()

    class Meta:
        model = models.Company
        fields = "__all__"
        depth = 1

    def create(self, validated_data):

        contact_address = None
        billing_address = None
        if "contact_address" in validated_data:
            contact_address = models.Address.objects.create(**validated_data.pop("contact_address"))
        if "billing_address" in validated_data:
            billing_address = models.Address.objects.create(**validated_data.pop("billing_address"))

        company = models.Company.objects.create(**validated_data)
        company.contact_address = contact_address
        company.billing_address = billing_address
        company.save()
        return company
