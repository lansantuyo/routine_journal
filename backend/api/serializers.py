from django.contrib.auth.models import User
from rest_framework import serializers
from .models import JournalEntry, ActivityType, MetricType, Activity, Metric, Category

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Metric Type Serializer
class MetricTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricType
        fields = ['id', 'activity_type', 'name', 'description']

# Metric Serializer
class MetricSerializer(serializers.ModelSerializer):
    metric_type = MetricTypeSerializer(read_only=True)

    class Meta:
        model = Metric
        fields = ['id', 'activity', 'metric_type', 'value']

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        extra_kwargs = {'author': {'read_only': True}}

# Activity Type Serializer
class ActivityTypeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True)

    class Meta:
        model = ActivityType
        fields = ['id', 'name', 'description', 'category']
        extra_kwargs = {"author": {"read_only": True}}

# Activity Serializer
class ActivitySerializer(serializers.ModelSerializer):
    activity_type = ActivityTypeSerializer(read_only=True)
    metrics = MetricSerializer(many=True, read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'journal_entry', 'activity_type', 'metrics']

# Journal Entry Serializer
class JournalEntrySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'date', 'content', 'created_date', 'author', 'activities']
        extra_kwargs = {"author": {"read_only": True}}
