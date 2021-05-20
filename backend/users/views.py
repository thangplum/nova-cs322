from django.shortcuts import render  # noqa
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User
from .serializers import serializerProfile

class profileViewSet(viewsets.ViewSet):
    def list(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = serializerProfile(user.profile)
        return Response(serializer.data)


    def create(self, request):
        user = User.objects.get(id=request.user.id)
        serializer = serializerProfile(user.profile, data=request.data, partial=True)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
   
