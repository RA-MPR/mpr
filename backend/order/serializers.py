from rest_framework import serializers

from order.models import Order
from invoice.serializers import InvoiceSerializer


class OrderSerializer(serializers.ModelSerializer):
    Invoice = InvoiceSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = (
            "id",
            "date",
            "contract_number",
            "sum",
            "company",
            "Invoice",
        )


class OrderCreateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=True, allow_null=False)
    contract_number = serializers.IntegerField(required=True, allow_null=False)
    sum = serializers.IntegerField(required=True, allow_null=False)
    company_id = serializers.IntegerField(required=True, allow_null=False)

    class Meta:
        model = Order
        fields = ("date", "contract_number", "sum", "company_id")


class OrderUpdateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=False, allow_null=True)
    contract_number = serializers.IntegerField(required=False, allow_null=True)
    sum = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Order
        fields = ("id", "date", "contract_number", "sum", "company_id")

        read_only_fields = ("id",)


class OrderDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            "id",
            "date",
            "contract_number",
            "sum",
        )
