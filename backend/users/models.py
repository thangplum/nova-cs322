from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import IndexedTimeStampedModel

from .managers import UserManager

from allauth.socialaccount.models import SocialAccount
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.postgres.fields import ArrayField


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(
        default=False, help_text=_("Designates whether the user can log into this admin " "site.")
    )
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )

    is_researcher = models.BooleanField(
        default=False, help_text=_("Designates whether the user can access researcher portal")
    )

    is_instructor = models.BooleanField(
        default=False, help_text=_("Designates whether the user can access the instructor portal")
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    age = models.CharField(max_length=100, blank=True)
    ethnicity = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, blank=True)
    race = models.CharField(max_length=100, blank=True)
    surveys = ArrayField(models.CharField(max_length=100), blank=True, default=list)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        # data=SocialAccount.objects.get(user=instance).extra_data
        # name=data.get('name')
        # instance.profile.name = name   
    instance.profile.save()

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()