from django.contrib.auth.models import User
from rest_framework import serializers
from .models import JournalEntry, ActivityType, MetricType, Activity, Metric, Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class MetricTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricType
        fields = ['id', 'activity_type', 'name', 'description']


class MetricSerializer(serializers.ModelSerializer):
    metric_type = MetricTypeSerializer(read_only=True)

    class Meta:
        model = Metric
        fields = ['id', 'activity', 'metric_type', 'value']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'author']


class ActivityTypeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True)

    class Meta:
        model = ActivityType
        fields = ['id', 'name', 'description', 'category', 'author']
        extra_kwargs = {"author": {"read_only": True}}


class ActivitySerializer(serializers.ModelSerializer):
    metrics = MetricSerializer(many=True, read_only=True)
    activity_type = ActivityTypeSerializer(read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'journal_entry', 'activity_type', 'description', 'metrics']


class JournalEntrySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'date', 'content', 'created_date', 'author', 'activities']
        extra_kwargs = {"author": {"read_only": True}}
