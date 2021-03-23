from rest_framework import routers

from .views import AddressViewSet, CompanyViewSet

router = routers.DefaultRouter()
router.register(r"address", AddressViewSet)
router.register(r"company", CompanyViewSet)
