from rest_framework import status
from rest_framework.test import APITestCase, force_authenticate
from contact.models import Contact
from company.models import Company
from order.models import Order
from users.models import User
from rest_framework.authtoken.models import Token
from datetime import date
from dateutil.relativedelta import relativedelta
import json


class CompanyRestTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user_data = {
            "email": "pepa.uzivatel@seznam.cz",
        }
        user = User.objects.create(**user_data)
        company_data = {
            "ico": "12345678",
            "name": "Seznam",
            "phone_number": "+420234694111",
            "ad_volume": 100,
            "contact_address": None,
            "billing_address": None,
            "user": user,
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
        cls.user = user

    def test_create_contact(self):
        contact_data = {
            "name": "Frantisek",
            "surname": "Cimrman",
            "phone": "+420725245123",
            "email": "cimrman@comp.cz",
            "company": None
        }
        current_count = Contact.objects.count()
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/contact/", contact_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), current_count + 1)
        self.assertEqual(Contact.objects.get(id=self.test_data_id).name, "Pepa")

    def test_update_contact(self):
        id = self.test_data_id
        altered_contact_data = {
            "name": "Josef",
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f"/contact/{id}/", altered_contact_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Contact.objects.get(id=id).name, "Josef")
