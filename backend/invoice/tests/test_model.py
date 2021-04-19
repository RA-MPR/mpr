from django.test import TestCase

from company.models import Company
from users.models import User
from order.models import Order
from ..models import Invoice
import datetime


class InvoiceModelTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        user_data = {
            "email" : "pepa.uzivatel@seznam.cz",
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
            "company":company,
            "user": user,
        }
        order = Order.objects.create(**order_data)

        invoice_data = {
            "date": "2021-05-01",
            "sum": 5000,
            "order_id": order.id,
            "user": user
        }
        instance = Invoice.objects.create(**invoice_data)
        cls.test_data_id = instance.id
        cls.order_id = order.id

    def test_insert(self):
        invoice = Invoice.objects.get(id=self.test_data_id)
        self.assertEqual(invoice.date, datetime.date(2021, 5, 1))
        self.assertEqual(invoice.sum, 5000)
        self.assertEqual(invoice.order_id, self.order_id)
