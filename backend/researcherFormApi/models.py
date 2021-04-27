from django.db import models

class formResearch(models.Model):
    GENDER_CHOICES=[
        ("M","Male"),
        ("F","Female"),
        ("NA","Don't Specify"),

    ]
    firstname = models.CharField(max_length=40)
    lastname= models.CharField(max_length=40)
    email= models.EmailField(max_length=60)
    student_id = models.IntegerField(default=000000)
    gender = models.CharField(
        max_length=2,
        choices= GENDER_CHOICES,
        default="NA"
    )

    def __str__(self):
        return self.firstname+" "+self.lastname

