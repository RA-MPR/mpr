from contact.serializers.nested import ContactDetailSerializer
from order.serializers import OrderDetailSerializer
from rest_framework import serializers

from .nested import SimplifiedCompanySerializer, AddressSerializer
from .. import models


class CompanySerializer(SimplifiedCompanySerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    contacts = ContactDetailSerializer(many=True, required=False)
    orders = OrderDetailSerializer(many=True, required=False)


class CompanyListSerializer(serializers.ModelSerializer):
    advertising_this_year = serializers.IntegerField()

    class Meta:
        model = models.Company
        fields = (
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "status",
            "status_color",
            "advertising_this_year"
        )
        depth = 0