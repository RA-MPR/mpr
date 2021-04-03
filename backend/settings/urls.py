from django.contrib import admin
from django.urls import path, include

from company.routers import router as company_router
from contact.routers import router as contact_router

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(company_router.urls)),
    path('', include(contact_router.urls)),
    path("order/", include("order.urls")),
    path("invoice/", include("invoice.urls")),
]
