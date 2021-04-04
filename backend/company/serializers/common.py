from contact.serializers.nested import ContactDetailSerializer
from order.serializers import OrderDetailSerializer

from .nested import SimplifiedCompanySerializer, AddressSerializer


class CompanySerializer(SimplifiedCompanySerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    contacts = ContactDetailSerializer(many=True, required=False)
    orders = OrderDetailSerializer(many=True, required=False)
