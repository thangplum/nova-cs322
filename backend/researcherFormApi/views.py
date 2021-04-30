from django.shortcuts import render
from rest_framework import viewsets

from .serializers import formResearchSerializer
from .models import formResearch


class ResearchFormViewSet(viewsets.ModelViewSet): 
    queryset = formResearch.objects.all().order_by('id')
    serializer_class = formResearchSerializer
