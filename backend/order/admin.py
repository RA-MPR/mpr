from django.contrib import admin

from order.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "date", "contract_number", "sum", "company"]


admin.site.register(Order, OrderAdmin)
