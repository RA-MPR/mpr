from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, get_object_or_404

from invoice.models import Invoice
from order.models import Order
from invoice.serializers import InvoiceSerializer, InvoiceCreateSerializer, InvoiceUpdateSerializer
from rest_framework.response import Response


class InvoiceView(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == "POST":
            return InvoiceCreateSerializer
        return InvoiceSerializer

    queryset = Invoice.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                [str(serializer.errors)],
                status=status.HTTP_400_BAD_REQUEST,
            )

        invoice = self.perform_create(serializer, request.user)

        return Response(
            InvoiceSerializer(invoice).data,
            status=status.HTTP_201_CREATED,
        )

    def perform_create(self, serializer, user):
        date = serializer.validated_data.get("date", None)
        sum = serializer.validated_data.get("sum", None)
        order_id = serializer.validated_data.get("order_id", None)

        order = get_object_or_404(Order, id=order_id)
        return serializer.save(date=date, sum=sum, order=order, user=user)


class InvoiceByIdView(RetrieveUpdateDestroyAPIView):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()
    lookup_url_kwarg = "id"

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):

        data = request.data

        serializer = InvoiceUpdateSerializer(data=data)

        if not serializer.is_valid():
            content = {"Invalid data"}
            return Response(
                content, status=status.HTTP_400_BAD_REQUEST)

        invoice = get_object_or_404(Invoice, pk=self.kwargs["id"])

        order_id = data.get("order_id", None)
        if order_id:
            if not Order.objects.filter(id=order_id):
                content = {"Order model not found"}
                return Response(content, status=status.HTTP_404_NOT_FOUND, )

        serializer.update(invoice, validated_data=serializer.validated_data)

        return Response(
            InvoiceUpdateSerializer(invoice).data, status=status.HTTP_200_OK
        )
