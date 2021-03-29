from django.test import TestCase

from company.models import Address, Company


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
        Company.objects.create(**company_data)

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

