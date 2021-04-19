from django.test import TestCase

from company.models import Company
from users.models import User
from ..models import Order
import datetime


class OrderModelTestCase(TestCase):

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
        instance = Order.objects.create(**order_data)
        cls.test_data_id = instance.id
        cls.order_id = instance.id

    def test_insert(self):
        order = Order.objects.get(id=self.test_data_id)
        self.assertEqual(order.date, datetime.date(2021, 4, 30))
        self.assertEqual(order.sum, 5000)
        self.assertEqual(order.contract_number, '123')
