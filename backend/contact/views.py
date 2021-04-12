from rest_framework import viewsets

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from order.models import Order, Month
from .models import Contact
from .serializers.common import ContactGetSerializer, ContactSerializer
from rest_framework.response import Response
from django.db.models import Sum

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ContactGetSerializer
        return ContactSerializer

    @action(methods=['get'], detail=True)
    def orders(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        company_ico = contact.company.ico

        summary = (Order.objects
                   .filter(company=company_ico)
                   .annotate(month=Month('date'))
                   .values('month')
                   .annotate(total=Sum('sum'))
                   .order_by())

        return Response(
           summary,
            status=status.HTTP_200_OK,
        )


