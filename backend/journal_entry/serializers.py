from rest_framework import serializers
from .models import Journal

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ('entry_name', 'entry_description', 'entry_date')