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
    metric_type_id = serializers.PrimaryKeyRelatedField(
        queryset=MetricType.objects.all(), source='metric_type', write_only=True
    )

    class Meta:
        model = Metric
        fields = ['id', 'activity', 'metric_type_id', 'value']  # Use 'metric_type_id' to handle foreign key

    def to_representation(self, instance):
        self.fields['metric_type'] = MetricTypeSerializer(read_only=True)
        return super(MetricSerializer, self).to_representation(instance)


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        extra_kwargs = {'author': {'read_only': True}}


# Activity Type Serializer
class ActivityTypeSerializer(serializers.ModelSerializer):
    metric_types = MetricTypeSerializer(many=True, read_only=True)

    class Meta:
        model = ActivityType
        fields = ['id', 'name', 'description', 'category', 'metric_types']
        extra_kwargs = {"author": {"read_only": True}}


# Activity Serializer
class ActivitySerializer(serializers.ModelSerializer):
    activity_type = ActivityTypeSerializer(read_only=True)
    activity_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ActivityType.objects.all(), source='activity_type', write_only=True
    )
    metrics = MetricSerializer(many=True, read_only=True)
    date = serializers.DateField(source='journal_entry.date', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'journal_entry', 'activity_type', 'activity_type_id', 'metrics', 'date']


# Journal Entry Serializer
class JournalEntrySerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'date', 'content', 'created_date', 'author', 'activities']
        extra_kwargs = {"author": {"read_only": True}}

    def validate(self, data):
        # Ensure there's only one journal entry per date for each user
        user = self.context['request'].user
        if JournalEntry.objects.filter(date=data['date'], author=user).exists():
            raise serializers.ValidationError("You already have a journal entry for this date.")
        return data

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().update(instance, validated_data)
