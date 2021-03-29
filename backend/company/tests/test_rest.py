from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Address, Company


class CompanyRestTestCase(APITestCase):

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

    def test_create_company(self):
        company_data = {
            "ico": "12345678",
            "name": "ABC",
            "phone_number": "+420234694111",
            "ad_volume": 100,
            "contact_address": {
                "street": "Radlická 3294/10",
                "zip_code": "15000",
                "city": "Praha",
                "country": "Czech Republic"
            },
            "billing_address": {
                "street": "Radlická 3294/10",
                "zip_code": "15000",
                "city": "Praha",
                "country": "Czech Republic"
            }
        }

        current_count = Company.objects.count()
        response = self.client.post("/company/", company_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), current_count + 1)
        self.assertEqual(Company.objects.get(ico="12345678").name, "ABC")

    def test_update_company(self):
        ico = "26168685"
        altered_company_data = {
            "name": "Seznam_1",
        }
        response = self.client.put(f"/company/{ico}/", altered_company_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Company.objects.get(ico=ico).name, "Seznam_1")
