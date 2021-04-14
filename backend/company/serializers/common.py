from contact.serializers.nested import ContactDetailSerializer
from order.serializers import OrderDetailSerializer
from event.serializers import EventDetailSerializer
from users.serializers import UserSlimSerializer
from rest_framework import serializers

from .nested import SimplifiedCompanySerializer, AddressSerializer
from .. import models


class CompanySerializer(SimplifiedCompanySerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    # user = UserSlimSerializer(required=False, allow_null=True)
    contacts = ContactDetailSerializer(many=True, required=False)
    events = EventDetailSerializer(many=True, required=False)
    orders = OrderDetailSerializer(many=True, required=False)


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
