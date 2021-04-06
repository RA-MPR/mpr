from datetime import datetime

from company.models import Address, Company
from dateutil.relativedelta import relativedelta
from django.test import TestCase
from order.models import Order

from company.views import CompanyViewSet


class CompanyModelTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        address_data = {
            "street": "Radlická 3294/10",
            "zip_code": "15000",
            "city": "Praha",
            "country": "Czech Republic"
        }
        address = Address.objects.create(**address_data)
        company_data = {
            "ico": "26168685",
            "name": "Seznam",
            "phone_number": "+420234694111",
            "ad_volume": 100,
            "contact_address": address,
            "billing_address": address
        }
        company = Company.objects.create(**company_data)

        order_data = {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "contract_number": 123,
            "sum": 1000,
            "company": company
        }
        Order.objects.create(**order_data)

    def test_insert(self):
        """Test if Company model was created during setUp"""
        company = Company.objects.get(ico="26168685")
        self.assertEqual(company.name, "Seznam")
        self.assertEqual(company.phone_number, "+420234694111")
        self.assertEqual(company.ad_volume, 100)

    def test_update(self):
        """Test Company model update"""
        company = Company.objects.get(ico="26168685")
        altered_company_data = {
            "ico": "26168685",
            "name": "Seznam1",
            "phone_number": "+420111222333",
            "ad_volume": 200,
        }
        company.update(altered_company_data)
        self.assertEqual(company.name, "Seznam1")
        self.assertEqual(company.phone_number, "+420111222333")
        self.assertEqual(company.ad_volume, 200)

    def test_advertising(self):
        view_set = CompanyViewSet()
        company = view_set.get_queryset().first()
        self.assertEqual(company.advertising_this_year, 1000)

        order = company.orders.first()
        order.date = datetime.now() + relativedelta(years=-2)
        order.save()
        company = view_set.get_queryset().first()
        self.assertEqual(company.advertising_this_year, None)
