from django.shortcuts import render
from rest_framework import viewsets
from .serializers import JournalSerializer
from .models import Journal

# Create your views here.

class JournalView(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    queryset = Journal.objects.all()