# Generated by Django 5.2 on 2025-06-01 02:53

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DBconnection', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='fishinglog',
            name='caught_on',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
