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



class UserRestTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user_data = {
            "email": "pepa.uzivatel@seznam.cz",
            "is_superuser":True,
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
        Company.objects.get(ico="12345678")
        cls.current_date = date.today()
        cls.start_date = date.today().replace(month=1)

        a = cls.start_date.month
        while a <= 12:
            order_data = {
                "company_id": "12345678",
                "date": str(cls.start_date.year) + "-" + str(a) + "-12",
                "contract_number": "122233",
                "user":user,
                "sum": 5000
            }
            Order.objects.create(**order_data)
            order_data1 = {
                "company_id": "12345678",
                "date": str(cls.start_date.year) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "user": user,
                "sum": 3000
            }
            Order.objects.create(**order_data1)
            order_data2 = {
                "company_id": "12345678",
                "date": str(cls.start_date.year-1) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "user": user,
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
                "user": user,
                "sum": 5000
            }
            Order.objects.create(**order_data)
            order_data1 = {
                "company_id": "12345678",
                "date": str(cls.current_date.year) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "user": user,
                "sum": 3000
            }
            Order.objects.create(**order_data1)
            order_data2 = {
                "company_id": "12345678",
                "date": str(cls.current_date.year-1) + "-" + str(a) + "-15",
                "contract_number": "122233",
                "user": user,
                "sum": 1111
            }
            Order.objects.create(**order_data2)
            a += 1
        cls.user = user

    def test_orders1(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/user/orders/")
        self.assertEqual(response.status_code, 200)
        j = json.loads(response.content)
        for item in j:
            self.assertEqual(item["total"], 8000)
