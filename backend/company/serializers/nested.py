from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .. import models
from datetime import date
from users.models import User


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


class SimplifiedCompanySerializer(serializers.ModelSerializer):
    advertising_this_year = serializers.IntegerField()

    class Meta:
        model = models.Company
        fields = (
            "id",
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
        depth = 1

    def get_fields(self, *args, **kwargs):
        fields = super(SimplifiedCompanySerializer, self).get_fields(*args, **kwargs)
        request = self.context.get("request", None)
        if request and getattr(request, "method", None) == "PUT":
            fields["ico"].required = False
            fields["contact_address"].required = False
            fields["billing_address"].required = False
            fields["user"].required = False

        if request and getattr(request, "method", None) in ["PUT", "POST"]:
            # remove non-model field
            fields["ico"].required = False
            fields["notes"].required = False
            fields["create_date"].required = False
            fields["modification_date"].required = False
            fields["status_modification_date"].required = False
            fields["user"].required = False
            del fields["advertising_this_year"]
        return fields

    def create(self, validated_data: dict):

        request = self.context.get("request", None)
        contact_address = None
        billing_address = None
        if "contact_address" in validated_data:
            contact_address = models.Address.objects.create(**validated_data.pop("contact_address"))
        if "billing_address" in validated_data:
            billing_address = models.Address.objects.create(**validated_data.pop("billing_address"))

        company = models.Company.objects.create(**validated_data)
        if "status" in validated_data or "status_color" in validated_data:
            company.status_modification_date = date.today()
        company.create_date = date.today()
        company.modification_date = date.today()
        company.contact_address = contact_address
        company.billing_address = billing_address
        company.user = request.user
        company.save()
        return company

    def update(self, company: models.Company, validated_data: dict):
        request = self.context.get("request", None)
        if "update_user" in validated_data:
            update_user = validated_data.pop("update_user")
            if update_user is True:
                company.user = request.user
        if "user" in validated_data:
            request_user = validated_data.pop("user")
            if request_user is None:
                company.user = None
            else:
                user = get_object_or_404(User, email=request_user)
                company.user = user
        if "status" in validated_data or "status_color" in validated_data:
            company.status_modification_date = date.today()
        if "contact_address" in validated_data:
            contact_address_data = validated_data.pop("contact_address")
            if company.contact_address:
                company.contact_address.update(contact_address_data)
            else:
                contact_address = models.Address.objects.create(**contact_address_data)
                company.contact_address = contact_address
        if "billing_address" in validated_data:
            billing_address_data = validated_data.pop("billing_address")
            if company.billing_address:
                company.billing_address.update(billing_address_data)
            else:
                billing_address = models.Address.objects.create(**billing_address_data)
                company.billing_address = billing_address
        company.modification_date = date.today()
        company.update(validated_data)
        return company

    def validate(self, attrs):
        if "ico" in attrs and len(attrs["ico"]) != 8:
            raise serializers.ValidationError({"ico": "ico must have exactly 8 digits"})
        return attrs


class CompanyNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = (
            "id",
            "ico",
            "name"
        )
