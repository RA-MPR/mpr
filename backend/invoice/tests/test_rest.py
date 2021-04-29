from rest_framework import status
from rest_framework.test import APITestCase

from company.models import Company
from order.models import Order
from users.models import User
from ..models import Invoice

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
        order = Order.objects.create(**order_data)

        invoice_data = {
            "date": "2021-05-01",
            "sum": 5000,
            "order": order,
            "user": user
        }
        instance = Invoice.objects.create(**invoice_data)
        cls.test_data_id = instance.id
        cls.order_id = order.id
        cls.user = user


    def test_create_invoice(self):
        invoice_data = {
        "date": "2021-06-02",
        "sum": 5000,
        "order_id": self.order_id,
        }
        current_count = Invoice.objects.count()
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/invoice/", invoice_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Invoice.objects.count(), current_count + 1)
        self.assertEqual(Invoice.objects.get(id=self.test_data_id).sum, 5000)

    def test_update_invoice(self):
        id = self.test_data_id
        altered_invoice_data = {
            "sum": 3000,
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f"/api/invoice/{id}", altered_invoice_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Invoice.objects.get(id=id).sum, 3000)
