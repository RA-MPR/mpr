from datetime import datetime

from dateutil.relativedelta import relativedelta
from django.db.models import Sum, Q
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Address, Company
from .serializers.common import CompanySerializer, CompanyListSerializer
from .serializers.nested import AddressSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def list(self, request, *args, **kwargs):
        serializer = CompanyListSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        year_ago = datetime.now() + relativedelta(years=-1)
        return Company.objects.annotate(advertising_this_year=Sum("orders__sum", filter=Q(orders__date__gt=year_ago)))
