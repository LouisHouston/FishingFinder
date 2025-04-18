from django.db import models

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
    
