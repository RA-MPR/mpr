from rest_framework import viewsets

from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from order.models import Order, Month
from .models import Contact
from .serializers.common import ContactGetSerializer, ContactSerializer
from rest_framework.response import Response
from django.db.models import Sum
from datetime import date
from dateutil.relativedelta import relativedelta


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ContactGetSerializer
        return ContactSerializer

    def fillListOrder(self, start, end, res, d, data):
        while start <= end:
            if start not in res:
                data.append({
                   "month": start,
                   "total": 0,
                 })
            else:
                data.append({
                   "month": start,
                   "total": d[str(start)]
                })

            start += 1

    @action(methods=['get'], detail=True)
    def orders(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        company_ico = contact.company.ico

        f = date.today() + relativedelta(months=-11)
        f = f.replace(day=1)
        end_date =  date.today() + relativedelta(months=1)
        end_date = end_date.replace(day=1)

        summary = (Order.objects
                   .filter(company=company_ico)
                   .filter(date__gte=f)
                   .filter(date__lt=end_date)
                   .annotate(month=Month('date'))
                   .values('month')
                   .annotate(total=Sum('sum'))
                   .order_by())

        if len(summary) == 12:
            return Response(
                summary,
                status=status.HTTP_200_OK,
            )

        res = [sub['month'] for sub in summary]
        d = {}

        for item in summary:
            d[str(item['month'])] = item['total']

        start = f.month
        end = date.today().month
        data = []

        self.fillListOrder(start, 12, res, d, data)

        if end < f.month:
            start = 1
            self.fillListOrder(start, end, res, d, data)

        return Response(
            data,
            status=status.HTTP_200_OK,
        )


