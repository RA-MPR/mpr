from rest_framework import status
from rest_framework.test import APITestCase

from contact.models import Contact
from company.models import Company
from order.models import Order
from datetime import date
from dateutil.relativedelta import relativedelta
import json


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
        cls.current_date = date.today()
        cls.start_date = date.today() + relativedelta(months=-11)

        a = cls.start_date.month
        while a <= 12:
            order_data = {
                "company_id": "12345678",
                "date": str(cls.start_date.year) + "-" + str(a) + "-12",
                "contract_number": "122233",
                "sum": 5000
            }
            Order.objects.create(**order_data)
            order_data1 = {
                "company_id": "12345678",
                "date": str(cls.start_date.year) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "sum": 3000
            }
            Order.objects.create(**order_data1)
            order_data2 = {
                "company_id": "12345678",
                "date": str(cls.start_date.year-1) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "sum": 1111
            }
            Order.objects.create(**order_data2)
            a += 1
        if cls.current_date.month < cls.start_date.month:
            a = 1
        while a <= cls.current_date.month:
            order_data = {
                "company_id": "12345678",
                "date": str(cls.current_date.year) + "-" + str(a) + "-12",
                "contract_number": "122233",
                "sum": 5000
            }
            Order.objects.create(**order_data)
            order_data1 = {
                "company_id": "12345678",
                "date": str(cls.current_date.year) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "sum": 3000
            }
            Order.objects.create(**order_data1)
            order_data2 = {
                "company_id": "12345678",
                "date": str(cls.current_date.year-1) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "sum": 1111
            }
            Order.objects.create(**order_data2)
            a += 1

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

    def test_orders1(self):
        response = self.client.get(f"/contact/" + str(self.test_data_id) + "/orders/")
        self.assertEqual(response.status_code, 200)
        j = json.loads(response.content)
        for item in j:
            self.assertEqual(item["total"], 8000)