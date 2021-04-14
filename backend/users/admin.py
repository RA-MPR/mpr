from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User


class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ('email', 'full_name', 'is_superuser', 'is_staff', 'is_active',)
    list_filter = ('email', 'full_name', 'is_staff', 'is_superuser', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'full_name', 'password')}),
        ('Permissions', {'fields': ('is_superuser', 'is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2', 'is_superuser', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(User, UserAdmin)
