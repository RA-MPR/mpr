from django.contrib import admin
from django.urls import path, include

from company.routers import router as company_router
from contact.routers import router as contact_router
from event.routers import router as event_router

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/', include(company_router.urls)),
    path('api/', include(contact_router.urls)),
    path("api/order/", include("order.urls")),
    path("api/invoice/", include("invoice.urls")),
    path("api/user/", include("users.urls")),
    path('api/', include(event_router.urls)),
]
