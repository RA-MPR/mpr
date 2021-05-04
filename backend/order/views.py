from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, get_object_or_404

from order.models import Order
from company.models import Company
from order.serializers import OrderSerializer, OrderCreateSerializer, OrderUpdateSerializer, OrderDetailSerializer
from rest_framework.response import Response


class OrderView(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == "POST":
            return OrderCreateSerializer
        return OrderSerializer

    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                [str(serializer.errors)],
                status=status.HTTP_400_BAD_REQUEST,
            )

        order = self.perform_create(serializer, request.user)

        return Response(
            OrderCreateSerializer(order).data,
            status=status.HTTP_201_CREATED,
        )

    def perform_create(self, serializer, user):
        date = serializer.validated_data.get("date", None)
        contract_number = serializer.validated_data.get("contract_number", None)
        sum = serializer.validated_data.get("sum", None)
        company_id = serializer.validated_data.get("company_id", None)

        company = get_object_or_404(Company, id=company_id)
        return serializer.save(date=date, contract_number=contract_number, sum=sum, company=company, user=user)


class OrderByIdView(RetrieveUpdateDestroyAPIView):
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()
    lookup_url_kwarg = "id"

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):

        data = request.data

        serializer = OrderUpdateSerializer(data=data)

        if not serializer.is_valid():
            content = {"Invalid data"}
            return Response(
                content, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, pk=self.kwargs["id"])

        company_id = data.get("company_id", None)
        if company_id:
            if not Company.objects.filter(id=company_id):
                content = {"Company model not found"}
                return Response(content, status=status.HTTP_404_NOT_FOUND, )

        serializer.update(order, validated_data=serializer.validated_data)

        return Response(
            OrderUpdateSerializer(order).data, status=status.HTTP_200_OK
        )
