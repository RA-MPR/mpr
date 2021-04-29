from contact.models import Contact
from order.models import Order
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Address, Company
from users.models import User


class CompanyRestTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        user_data = {
            "email": "pepa.uzivatel@seznam.cz",
        }
        user = User.objects.create(**user_data)
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
            "billing_address": address,
            "user": user
        }
        company = Company.objects.create(**company_data)

        contact_data = {
            "name": "Studijní",
            "surname": "oddělení",
            "phone": "+420541141144",
            "email": "studijni@fit.vut.cz",
            "company": company
        }
        Contact.objects.create(**contact_data)

        order_data = {
            "date": "2021-04-04",
            "contract_number": 123,
            "sum": 1000,
            "company": company,
            "user": user
        }
        Order.objects.create(**order_data)
        cls.user = user

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
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/company/", company_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), current_count + 1)
        self.assertEqual(Company.objects.get(ico="12345678").name, "ABC")

    def test_update_company(self):
        ico = "26168685"
        altered_company_data = {
            "name": "Seznam_1",
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f"/api/company/{ico}/", altered_company_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Company.objects.get(ico=ico).name, "Seznam_1")

    def test_company_contact(self):
        ico = "26168685"
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/company/{ico}/")
        contact = response.data["contacts"][0]
        self.assertEqual(contact["name"], "Studijní")

    def test_no_company_contact(self):
        ico = "26168685"
        contact = Company.objects.get(ico=ico).contacts.first()
        contact.delete()

        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/company/{ico}/")
        contacts = response.data["contacts"]
        self.assertEqual(len(contacts), 0)

    def test_company_order(self):
        ico = "26168685"
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f"/api/company/{ico}/")
        order = response.data["orders"][0]
        self.assertEqual(order["contract_number"], '123')
