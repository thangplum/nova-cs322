from django.db import models
from users.models import User

class course(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE,null=True)
    name = models.CharField(max_length=100, blank=True)
    code = models.CharField(max_length=10, blank=True)
    participantsDone = models.ManyToManyField(User,related_name="participantsDone",blank=True)