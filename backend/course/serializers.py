from rest_framework import serializers
from .models import course

class courseSerializer(serializers.ModelSerializer):
    class Meta:
        model = course
        fields = '__all__'

class courseSerializer2(serializers.ModelSerializer):
    class Meta:
        model = course
        fields = ["id","name","code","user"]


