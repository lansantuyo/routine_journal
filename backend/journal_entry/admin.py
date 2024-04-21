from django.contrib import admin
from .models import Journal


class JournalAdmin(admin.ModelAdmin):
    model = Journal


admin.site.register(Journal, JournalAdmin)
