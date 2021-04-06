from rest_framework import serializers

from .. import models


class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = (
            "id",
            "name",
            "surname",
            "phone",
            "email",
        )
