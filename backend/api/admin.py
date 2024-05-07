from django.contrib import admin
from .models import JournalEntry, ActivityType, MetricType, Activity, Metric, Category

# Register your models here.
admin.site.register(JournalEntry)
admin.site.register(ActivityType)
admin.site.register(MetricType)
admin.site.register(Activity)
admin.site.register(Metric)
admin.site.register(Category)
