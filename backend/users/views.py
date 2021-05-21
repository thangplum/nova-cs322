from django.shortcuts import render  # noqa
from allauth.socialaccount.models import SocialToken
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User
from .serializers import serializerProfile
import json

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
    
    def retrieve(self, request, pk=None):
        
        if (not request.user.is_staff) and pk == "token":
            access_token = SocialToken.objects.get(account__user=request.user)
            return Response(access_token.token)
        return Response(status=status.HTTP_400_BAD_REQUEST)

