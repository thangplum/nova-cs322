from django.db import models

# Create your models here.
class formResearch(models.Model):
    firstname = models.CharField(max_length=100)
    lastname= models.CharField(max_length=100)
    email= models.EmailField(max_length=200)
    student_id = models.IntegerField(default=00)
    gender = models.CharField(max_length=100, default= "Unspecified")

    def __str__(self):
        return self.firstname+" "+self.lastname