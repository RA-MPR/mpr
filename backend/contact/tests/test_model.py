from django.test import TestCase

from contact.models import Contact
from company.models import Company


class ContactModelTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        company_data = {
            "ico": "12345678",
            "name": "Seznam",
            "phone_number": "+420234694111",
            "ad_volume": 100,
            "contact_address": None,
            "billing_address": None
        }
        Company.objects.create(**company_data)
        company = Company.objects.get(ico="12345678")
        contact_data = {
            "name" : "Pepa",
            "surname" : "Novotny",
            "phone" : "+420725245123",
            "email" : "novotny@comp.cz",
            "company" : company
        }

        instance = Contact.objects.create(**contact_data)

        cls.test_data_id = instance.id

    def test_insert(self):
        contact = Contact.objects.get(id=self.test_data_id)
        self.assertEqual(contact.name, "Pepa")
        self.assertEqual(contact.phone, "+420725245123")
        self.assertEqual(contact.surname, "Novotny")

    def test_update(self):
        contact = Contact.objects.get(id=self.test_data_id)
        altered_contact_data = {
            "name": "Josef",
            "phone": "+420111222333",
            "email": "novotnak@comp.cz",
        }
        contact.update(altered_contact_data)
        self.assertEqual(contact.name, "Josef")
        self.assertEqual(contact.phone, "+420111222333")
        self.assertEqual(contact.email, "novotnak@comp.cz")
