from django.contrib import admin

from invoice.models import Invoice


class InvoiceAdmin(admin.ModelAdmin):
    list_display = ["id", "date", "sum", "order"]

admin.site.register(Invoice, InvoiceAdmin)
