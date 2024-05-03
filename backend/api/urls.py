from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet, ActivityTypeViewSet, MetricTypeViewSet, ActivityViewSet, MetricViewSet, \
    UserViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'journal_entries', JournalEntryViewSet, basename='journal_entries')
router.register(r'activity_types', ActivityTypeViewSet, basename='activity_types')
router.register(r'metric_types', MetricTypeViewSet, basename='metric_types')
router.register(r'activities', ActivityViewSet, basename='activities')
router.register(r'metrics', MetricViewSet, basename='metrics')
router.register(r'user', UserViewSet, basename='users')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
