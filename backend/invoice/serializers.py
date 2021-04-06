from rest_framework import serializers

from invoice.models import Invoice


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = (
            "id",
            "date",
            "sum",
            # "order",
        )


class InvoiceCreateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=True, allow_null=False)
    sum = serializers.IntegerField(required=True, allow_null=False)
    order_id = serializers.IntegerField(required=True, allow_null=False)

    class Meta:
        model = Invoice
        fields = ("date", "sum", "order_id")


class InvoiceUpdateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=False, allow_null=True)
    sum = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Invoice
        fields = ("id", "date", "sum", "order_id")

        read_only_fields = ("id",)
