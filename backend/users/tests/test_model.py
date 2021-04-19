from django.test import TestCase

from users.models import User


class UserModelTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        user_data = {
            "email" : "pepa.uzivatel@seznam.cz",
        }
        user = User.objects.create(**user_data)

        cls.test_data_id = user.id

    def test_insert(self):
        user = User.objects.get(id=self.test_data_id)
        self.assertEqual(user.email, "pepa.uzivatel@seznam.cz")
