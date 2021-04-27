from rest_framework import serializers

from .models import formResearch

class formResearchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = formResearch
        fields = ("id","firstname", "lastname","email","student_id","gender")