from django.urls import path, re_path

from rest_framework.authtoken.views import obtain_auth_token
from users.views import UserOrderView, UserCreateView, UserView, UserEventView, UserCompanyView, UserAdminView, UserContactView

urlpatterns = [
    re_path(r"^$", UserView.as_view(), name="user"),
    re_path(r"^register/", UserCreateView.as_view(), name="user_registration"),
    re_path(r"^login/", obtain_auth_token, name="user_login"),
    re_path(r"^admin/", UserAdminView.as_view(), name="user_admin"),
    re_path(r"^events/", UserEventView.as_view(), name="user_event"),
    re_path(r"^companies/", UserCompanyView.as_view(), name="user_company"),
    re_path(r"^contacts/",  UserContactView.as_view(), name="user_contacts"),
    path("<int:id>/orders/", UserOrderView.as_view(), name="user_orders")
]
