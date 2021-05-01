from rest_framework import serializers

from .models import formResearch
            

class formResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = formResearch
        fields = '__all__'
    ethinicty = serializers.ListField()
    race = serializers.ListField()