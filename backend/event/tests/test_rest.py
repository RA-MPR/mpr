from rest_framework import status
from rest_framework.test import APITestCase

from company.models import Company
from event.models import Event
from users.models import User


class EventRestTestCase(APITestCase):

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
        event_data = {
            "name": "Tea",
            "date": "2021-04-30",
            "time": "15:00:00",
            "description": "Lorem Ipsum ...",
            "reminder": True,
            "company": company,
            "user": user,
        }

        instance = Event.objects.create(**event_data)
        cls.test_data_id = instance.id
        cls.user = user

    def test_create_event(self):
        event_data = {
            "name": "Coffee",
            "date": "2021-05-01",
            "time": "15:00:00",
            "description": "Lorem Ipsum ...",
            "reminder": True,
            "company": None,
        }
        current_count = Event.objects.count()
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/event/", event_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), current_count + 1)
        self.assertEqual(Event.objects.get(id=self.test_data_id).name, "Tea")

    def test_update_event(self):
        id = self.test_data_id
        altered_event_data = {
            "name": "Milk",
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f"/api/event/{id}/", altered_event_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Event.objects.get(id=id).name, "Milk")
