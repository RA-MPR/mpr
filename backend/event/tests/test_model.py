from django.test import TestCase

from event.models import Event
from company.models import Company
from users.models import User

class EventModelTestCase(TestCase):

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

    def test_insert(self):
        event = Event.objects.get(id=self.test_data_id)
        self.assertEqual(event.name, "Tea")
        self.assertEqual(event.reminder, True)
        self.assertEqual(event.description, "Lorem Ipsum ...")

    def test_update(self):
        event = Event.objects.get(id=self.test_data_id)
        altered_event_data = {
            "name": "Coffee",
            "date": "2021-05-30",
            "description": "Coffee with client",
            "user": self.user,
        }
        event.update(altered_event_data)
        self.assertEqual(event.name, "Coffee")
        self.assertEqual(event.date, "2021-05-30")
        self.assertEqual(event.description, "Coffee with client")
        self.assertEqual(event.reminder, True)
