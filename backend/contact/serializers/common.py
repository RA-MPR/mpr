from rest_framework import serializers

from company.serializers.nested import CompanyNameSerializer
from .. import models


class ContactGetSerializer(serializers.ModelSerializer):
    company = CompanyNameSerializer(many=False, required=True)

    class Meta:
        model = models.Contact
        fields = (
            "id",
            "name",
            "surname",
            "phone",
            "email",
            "company"
        )


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = "__all__"

    def create(self, validated_data: dict):
        contact = models.Contact.objects.create(**validated_data)
        contact.save()
        return contact

    def update(self, contact: models.Contact, validated_data: dict):
        contact.update(validated_data)
        return contact

    def get_fields(self, *args, **kwargs):
        fields = super(ContactSerializer, self).get_fields(*args, **kwargs)
        request = self.context.get("request", None)
        if request and getattr(request, "method", None) == "PUT":
            fields['id'].required = False
            fields['name'].required = False
            fields['surname'].required = False
            fields['phone'].required = False
            fields['email'].required = False
        return fields
