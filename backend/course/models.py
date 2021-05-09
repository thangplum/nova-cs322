from django.db import models
from django.contrib.postgres.fields import ArrayField

class course(models.Model):
    name = models.CharField(max_length=100, blank=True)
    code = models.CharField(max_length=10, blank=True)
    participantsDone = ArrayField(models.CharField(max_length=100), blank=True)