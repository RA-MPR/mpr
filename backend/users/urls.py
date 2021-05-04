from django.urls import re_path, path

from rest_framework.authtoken.views import obtain_auth_token
from users.views import UserOrderView, UserCreateView, UserView, UserEventView, UserCompanyView, UserAdminView, UserContactView, UserIdCompany

urlpatterns = [
    re_path(r"^$", UserView.as_view(), name="user"),
    path(r"<id>", UserIdCompany.as_view(), name="user_id_company"),
    re_path(r"^register/", UserCreateView.as_view(), name="user_registration"),
    re_path(r"^login/", obtain_auth_token, name="user_login"),
    re_path(r"^admin/", UserAdminView.as_view(), name="user_admin"),
    re_path(r"^events/", UserEventView.as_view(), name="user_event"),
    re_path(r"^companies/", UserCompanyView.as_view(), name="user_company"),
    re_path(r"^contacts/",  UserContactView.as_view(), name="user_contacts"),
    re_path(r"^orders/", UserOrderView.as_view(), name="user_orders")
]
