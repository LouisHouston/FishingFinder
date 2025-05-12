from django.db import models
from django.contrib.auth.models import User

class ExampleTable(models.Model):
    column1 = models.IntegerField()
    column2 = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.column1)
    
    
class Users(models.Model):
    username = models.CharField(max_length = 20, primary_key=True)
    email = models.CharField(max_length = 30)
    password = models.CharField(max_length = 20)
    dateCreated = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.username)

class BaitType(models.Model):
    bait_id = models.AutoField(primary_key=True)
    fresh = models.BooleanField(default=False)
    salt = models.BooleanField(default=False)

    def __str__(self):
        return f"Bait {self.bait_id}"


class BodyOfWater(models.Model):
    bow_id = models.AutoField(primary_key=True)
    lng = models.FloatField()
    lat = models.FloatField()
    name = models.CharField(max_length = 100)

    def __str__(self):
        return f"Water {self.bow_id}"

class FishingLog(models.Model):
    catch_id = models.AutoField(primary_key=True)
    type_of_fish = models.CharField(max_length=100)
    bait_type = models.ForeignKey(BaitType, on_delete=models.CASCADE)
    body_of_water = models.ForeignKey(BodyOfWater, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Catch {self.catch_id} by {self.uid}"
    
    
class FishType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    fresh = models.BooleanField(default = False)
    salt = models.BooleanField(default = False)
    def __str__(self):
        return self.name