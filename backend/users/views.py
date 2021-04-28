from django.shortcuts import render  # noqa
from users.models import Form
from rest_framework.generics import CreateApiView
from .serializers import FormSerializer

class FormView(CreateApiView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

