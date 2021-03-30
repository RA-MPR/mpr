from rest_framework import status
from rest_framework.test import APITestCase

from contact.models import Contact
from company.models import Company


class CompanyRestTestCase(APITestCase):

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
            "name": "Pepa",
            "surname": "Novotny",
            "phone": "+420725245123",
            "email": "novotny@comp.cz",
            "company": company
        }

        instance = Contact.objects.create(**contact_data)
        cls.test_data_id = instance.id

    def test_create_company(self):
        contact_data = {
            "name": "Frantisek",
            "surname": "Cimrman",
            "phone": "+420725245123",
            "email": "cimrman@comp.cz",
            "company": None
        }
        current_count = Contact.objects.count()
        response = self.client.post("/contact/", contact_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), current_count + 1)
        self.assertEqual(Contact.objects.get(id=self.test_data_id).name, "Pepa")

    def test_update_company(self):
        id = self.test_data_id
        altered_contact_data = {
            "name": "Josef",
        }
        response = self.client.put(f"/contact/{id}/", altered_contact_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Contact.objects.get(id=id).name, "Josef")
