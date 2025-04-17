from django.db import models

class ExampleTable(models.Model):
    column1 = models.IntegerField()
    column2 = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.column1)
    
def __str__(self):
    return str(self.column1)