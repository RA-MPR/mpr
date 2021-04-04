from rest_framework import serializers

from .. import models


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Address
        fields = "__all__"


class SimplifiedCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Company
        fields = "__all__"
        depth = 1

    def get_fields(self, *args, **kwargs):
        fields = super(SimplifiedCompanySerializer, self).get_fields(*args, **kwargs)
        request = self.context.get("request", None)
        if request and getattr(request, "method", None) == "PUT":
            fields['ico'].required = False
            fields['contact_address'].required = False
            fields['billing_address'].required = False
        return fields

    def create(self, validated_data: dict):

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

    def update(self, company: models.Company, validated_data: dict):
        if "contact_address" in validated_data:
            company.contact_address.update(validated_data.pop("contact_address"))
        if "billing_address" in validated_data:
            company.billing_address.update(validated_data.pop("billing_address"))
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
            "ico",
            "name"
        )
