from django.urls import re_path

from rest_framework.authtoken.views import obtain_auth_token
from users.views import UserCreateView, UserView

urlpatterns = [
    re_path(r"^$", UserView.as_view(), name="user"),
    re_path(r"^register/", UserCreateView.as_view(), name="user_registration"),
    re_path(r"^login/", obtain_auth_token, name="user_login")
]