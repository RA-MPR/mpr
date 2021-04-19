from rest_framework import status
from rest_framework.test import APITestCase

from company.models import Company
from users.models import User
from ..models import Order

class InvoiceRestTestCase(APITestCase):

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

        order_data = {
            "date": "2021-04-30",
            "contract_number": 123,
            "sum": 5000,
            "company": company,
            "user": user,
        }
        instance = Order.objects.create(**order_data)

        cls.test_data_id = instance.id
        cls.company_id = company.ico
        cls.user = user


    def test_create_order(self):
        order_data = {
            "date": "2021-04-30",
            "contract_number": 321,
            "sum": 5000,
            "company_id": self.company_id,
        }
        current_count = Order.objects.count()
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/order/", order_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), current_count + 1)
        self.assertEqual(Order.objects.get(id=self.test_data_id).sum, 5000)

    def test_update_order(self):
        id = self.test_data_id
        altered_order_data = {
            "sum": 3000,
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f"/order/{id}", altered_order_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Order.objects.get(id=id).sum, 3000)
