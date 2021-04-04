from .nested import SimplifiedCompanySerializer, AddressSerializer
from contact.serializers.nested import ContactDetailSerializer


class CompanySerializer(SimplifiedCompanySerializer):
    contact_address = AddressSerializer()
    billing_address = AddressSerializer()
    contacts = ContactDetailSerializer(many=True, required=False)
