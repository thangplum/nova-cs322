
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import formResearchSerializer
from .models import formResearch




class ResearchFormViewSet(viewsets.ViewSet):
    def list(self, request):
        research = formResearch.objects.all()
        serializer = formResearchSerializer(research, many=True)
        return Response(serializer.data)
   
    def retrieve(self, request, pk=None):
        queryset = formResearch.objects.all()
        form = get_object_or_404(queryset, pk=pk)
        serializer = formResearchSerializer(form)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = formResearchSerializer(data=request.data)
        if serializer.is_valid() and request.user.is_researcher: 
            serializer.validated_data["user"] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, pk=None):
        instance = formResearch.objects.get(pk=pk)
        if request.user.is_researcher and instance.user == request.user: 
            instance.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def partial_update(self, request, pk=None):
            queryset = formResearch.objects.all()
            form = get_object_or_404(queryset, pk=pk)
            serializer = formResearchSerializer(form, data=request.data, partial=True)
            if serializer.is_valid() and request.user.is_researcher and form.user == request.user:
                serializer.validated_data["user"] = request.user
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class MyResearchViewSet(viewsets.ViewSet):
    def list(self, request):
        research = formResearch.objects.filter(user=request.user)
        serializer = formResearchSerializer(research, many=True)
        return Response(serializer.data)