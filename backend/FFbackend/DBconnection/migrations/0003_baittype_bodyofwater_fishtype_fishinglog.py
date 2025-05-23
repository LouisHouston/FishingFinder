# Generated by Django 5.2 on 2025-05-06 06:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DBconnection', '0002_users'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BaitType',
            fields=[
                ('bait_id', models.AutoField(primary_key=True, serialize=False)),
                ('fresh', models.BooleanField(default=False)),
                ('salt', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='BodyOfWater',
            fields=[
                ('bow_id', models.AutoField(primary_key=True, serialize=False)),
                ('lng', models.FloatField()),
                ('lat', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='FishType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('fresh', models.BooleanField(default=False)),
                ('salt', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='FishingLog',
            fields=[
                ('catch_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_of_fish', models.CharField(max_length=100)),
                ('bait_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DBconnection.baittype')),
                ('body_of_water', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='DBconnection.bodyofwater')),
                ('uid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
