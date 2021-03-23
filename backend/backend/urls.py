from django.contrib import admin
from django.urls import path, include

from company.routers import router as company_router

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include(company_router.urls)),
]
