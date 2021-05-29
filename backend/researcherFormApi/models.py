from django.db import models
from django.contrib.postgres.fields import ArrayField

class formResearch(models.Model):
    studyName = models.CharField(max_length=100, blank=True)
    briefAbstract = models.TextField(blank=True)
    detailedDescription = models.TextField(blank=True)
    duration = models.CharField(max_length=3,blank=True)
    creditsResearch = models.CharField(max_length=4, blank=True)
    researcher = models.CharField(max_length=100,blank=True)
    instructor = models.CharField(max_length=100, blank=True)
    approvalCode = models.CharField(max_length=20, blank=True)
    expireDate = models.DateField(blank=True)
    approved = models.BooleanField(default = True, blank=True)
    activeStudy = models.BooleanField(default = True, blank=True)
    minAge =models.CharField(max_length=100, blank=True)
    maxAge =models.CharField(max_length=100, blank=True)
    ethnicity = models.CharField(max_length=100, blank=True)
    gender = ArrayField(models.CharField(max_length=100), blank=True)
    race = ArrayField(models.CharField(max_length=100), blank=True)
    
    def __str__(self):
        return self.studyName

