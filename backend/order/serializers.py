from rest_framework import serializers

from company.serializers import CompanySerializer
from order.models import Order


class OrderSerializer(serializers.ModelSerializer):
    company = CompanySerializer(many=False, required=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "date",
            "contract_number",
            "sum",
            "company",
        )


class OrderCreateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=True, allow_null=False)
    contract_number = serializers.IntegerField(required=True, allow_null=False)
    sum = serializers.IntegerField(required=True, allow_null=False)
    company_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Order
        fields = ("date", "contract_number", "sum", "company_id")


class OrderUpdateSerializer(serializers.ModelSerializer):
    date = serializers.DateField(required=True, allow_null=False)
    contract_number = serializers.IntegerField(required=True, allow_null=False)
    sum = serializers.IntegerField(required=True, allow_null=False)

    class Meta:
        model = Order
        fields = ("date", "contract_number", "sum", "company_id")

        read_only_fields = ("id",)
