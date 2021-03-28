from rest_framework import serializers

from . import models


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
