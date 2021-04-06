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
