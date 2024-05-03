from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'date', 'content', 'created_date', 'author', 'activities']
        extra_kwargs = {"author": {"read_only": True}}

class ActivityTypeSerializer(serializers.ModelSerializer):
    metric_types = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ActivityType
        fields = ['id', 'name', 'description', 'metric_types']

class MetricTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricType
        fields = ['id', 'activity_type', 'name', 'description']

class ActivitySerializer(serializers.ModelSerializer):
    metrics = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'journal_entry', 'activity_type', 'description', 'metrics']

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = ['id', 'activity', 'metric_type', 'value']