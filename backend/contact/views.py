from rest_framework import viewsets

from .models import Contact
from .serializers import ContactSerializer,ContactGetSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ContactGetSerializer
        return ContactSerializer
