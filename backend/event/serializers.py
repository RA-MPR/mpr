from rest_framework import serializers

from . import models


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = "__all__"

    def create(self, validated_data: dict):
        request = self.context.get("request", None)
        event = models.Event.objects.create(**validated_data, user=request.user)
        event.save()
        return event

    def update(self, event: models.Event, validated_data: dict):
        request = self.context.get("request", None)
        if 'reminder' not in request.data:
            validated_data.pop('reminder', None)
        event.update(validated_data)
        return event

    def get_fields(self, *args, **kwargs):
        fields = super(EventSerializer, self).get_fields(*args, **kwargs)
        request = self.context.get("request", None)
        fields['user'].required = False
        if request and getattr(request, "method", None) == "PUT":
            fields['id'].required = False
            fields['name'].required = False
            fields['time'].required = False
            fields['date'].required = False
            fields['reminder'].required = False
            fields['is_active'].required = False
        return fields


class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = (
            "id",
            "name",
            "date",
            "time",
            "description",
            "is_active",
            "reminder",
        )


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = (
            "id",
            "name",
            "date",
            "time",
            "description",
            "is_active",
            "reminder",
        )
