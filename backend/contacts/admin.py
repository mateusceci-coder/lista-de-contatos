from django.contrib import admin
from .models import Contact, CustomUser

admin.site.register(CustomUser)

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'address', 'phone', 'email', 'owner')
    search_fields = ('name', 'owner__username')

admin.site.register(Contact, ContactAdmin)