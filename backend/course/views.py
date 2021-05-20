from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import courseSerializer, courseSerializer2
from .models import course

class CourseViewSet(viewsets.ViewSet):
    def list(self, request):
        courses = course.objects.all()
        serializer = courseSerializer2(courses, many=True)
        return Response(serializer.data)
   
    def retrieve(self, request, pk=None):
        queryset = course.objects.all()
        form = get_object_or_404(queryset, pk=pk)
        serializer = courseSerializer(form)
        if  ((request.user.is_instructor and form.user == request.user) or request.user.is_researcher) :
            return Response(serializer.data)
        return Response(status=status.HTTP_403_FORBIDDEN)
    
    def create(self, request):
        serializer = courseSerializer(data=request.data)
        if serializer.is_valid() and request.user.is_instructor: 
            serializer.validated_data["user"] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, pk=None):
        instance = course.objects.get(pk=pk)
        if request.user.is_instructor and instance.user == request.user: 
            instance.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    def partial_update(self, request, pk=None):
            queryset = course.objects.all()
            form = get_object_or_404(queryset, pk=pk)
            serializer = courseSerializer(form, data=request.data, partial=True)
            if serializer.is_valid() and ((request.user.is_instructor and form.user == request.user) or request.user.is_researcher) :
                serializer.validated_data["user"] = request.user
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
