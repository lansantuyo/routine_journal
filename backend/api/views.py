from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.dateparse import parse_date
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import JournalEntry, ActivityType, MetricType, Activity, Metric
from .serializers import JournalEntrySerializer, ActivityTypeSerializer, MetricTypeSerializer, ActivitySerializer, \
    MetricSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Adjust based on your security requirements

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = JournalEntry.objects.all()
        user = self.request.user  # Get the current user

        date = self.request.query_params.get('date', None)
        if date:
            date_obj = parse_date(date)
            if date_obj:
                queryset = queryset.filter(date=date_obj)

        # Filter by the author (current user)
        if not self.request.user.is_anonymous:
            queryset = queryset.filter(author=user)

        return queryset

    def perform_create(self, serializer):
        # Automatically set the author to the currently authenticated user when creating a new journal entry
        serializer.save(author=self.request.user)


class ActivityTypeViewSet(viewsets.ModelViewSet):
    serializer_class = ActivityTypeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Access all activity types if needed for user to create Activities
        return ActivityType.objects.all()


class MetricTypeViewSet(viewsets.ModelViewSet):
    serializer_class = MetricTypeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Access all metric types if needed for user to create Metrics
        return MetricType.objects.all()


class ActivityViewSet(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return activities that belong to the current user's journal entries
        return Activity.objects.filter(journal_entry__author=self.request.user)


class MetricViewSet(viewsets.ModelViewSet):
    serializer_class = MetricSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return metrics that belong to activities associated with the current user's journal entries
        return Metric.objects.filter(activity__journal_entry__author=self.request.user)
