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
            "id",
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "notes",
            "status",
            "status_color",
            "status_modification_date",
            "create_date",
            "modification_date",
            "contact_address",
            "billing_address",
            "contacts",
            "user",
            "update_user",
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
            "id",
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "user",
            "status",
            "status_color",
            "modification_date",
            "advertising_this_year"
        )
        depth = 0


class CompanyUserSerializer(serializers.ModelSerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    advertising_this_year = serializers.IntegerField()

    class Meta:
        model = models.Company
        fields = (
            "id",
            "ico",
            "name",
            "phone_number",
            "ad_volume",
            "contact_address",
            "billing_address",
            "modification_date",
            "status",
            "status_color",
            "status_modification_date",
            "advertising_this_year",
        )
        depth = 1
