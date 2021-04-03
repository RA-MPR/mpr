from rest_framework import status
from rest_framework.test import APITestCase

from company.models import Company
from event.models import Event


class EventRestTestCase(APITestCase):

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
        event_data = {
            "name": "Tea",
            "date": "2021-04-30",
            "time": "15:00:00",
            "description": "Lorem Ipsum ...",
            "reminder": True,
            "company": company,
        }

        instance = Event.objects.create(**event_data)
        cls.test_data_id = instance.id

    def test_create_company(self):
        event_data = {
            "name": "Coffee",
            "date": "2021-05-01",
            "time": "15:00:00",
            "description": "Lorem Ipsum ...",
            "reminder": True,
            "company": None,
        }
        current_count = Event.objects.count()
        response = self.client.post("/event/", event_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), current_count + 1)
        self.assertEqual(Event.objects.get(id=self.test_data_id).name, "Tea")

    def test_update_company(self):
        id = self.test_data_id
        altered_event_data = {
            "name": "Milk",
        }
        response = self.client.put(f"/event/{id}/", altered_event_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Event.objects.get(id=id).name, "Milk")
