from django.db import models
from django.contrib.postgres.fields import ArrayField

class formResearch(models.Model):
    GENDER_CHOICES=[
        ("M","Male"),
        ("F","Female"),
        ("NA","Don't Specify"),

    ]
    studyName = models.CharField(max_length=100)
    briefAbstract = models.TextField()
    detailedDescription = models.TextField()
    duration = models.CharField(max_length=3)
    creditsResearch = models.CharField(max_length=4)
    reseacher = models.CharField(max_length=100)
    instructor = models.CharField(max_length=100)
    approvalCode = models.CharField(max_length=20)
    expireDate = models.DateField()
    approved = models.BooleanField(default = True)
    activeStudy = models.BooleanField(default = True)
    minAge =models.CharField(max_length=100)
    maxAge =models.CharField(max_length=100)
    gender = models.CharField(
        max_length=2,
        choices= GENDER_CHOICES,
        default="NA"
    )
    race = ArrayField(models.CharField(max_length=100), blank=True)
    ethinicty = ArrayField(models.CharField(max_length=100), blank=True)

    def __str__(self):
        return self.studyName

