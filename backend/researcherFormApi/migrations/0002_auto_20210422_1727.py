# Generated by Django 2.2.20 on 2021-04-22 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('researcherFormApi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formresearch',
            name='student_id',
            field=models.IntegerField(default=0),
        ),
    ]