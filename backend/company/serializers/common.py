from contact.serializers.nested import ContactDetailSerializer
from event.serializers import EventDetailSerializer
from order.serializers import OrderDetailSerializer
from rest_framework import serializers
from users.serializers import UserSlimSerializer

from .nested import SimplifiedCompanySerializer, AddressSerializer
from .. import models


class CompanySerializer(SimplifiedCompanySerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    contacts = ContactDetailSerializer(many=True, required=False)
    events = EventDetailSerializer(many=True, required=False)
    orders = OrderDetailSerializer(many=True, required=False)

    class Meta:
        model = models.Company
        fields = (
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "status",
            "status_color",
            "contact_address",
            "billing_address",
            "contacts",
            "user",
            "orders",
            "events",
            "advertising_this_year"
        )


class CompanyListSerializer(serializers.ModelSerializer):
    user = UserSlimSerializer(required=False)
    advertising_this_year = serializers.IntegerField()

    class Meta:
        model = models.Company
        fields = (
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "user",
            "status",
            "status_color",
            "advertising_this_year"
        )
        depth = 0


class CompanyUserSerializer(serializers.ModelSerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()

    class Meta:
        model = models.Company
        fields = (
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "contact_address",
            "billing_address",
            "status",
            "status_color",
        )
        depth = 1
