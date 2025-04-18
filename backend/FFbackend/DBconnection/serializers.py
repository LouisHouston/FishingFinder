from rest_framework import serializers
from .models import ExampleTable, Users

class ExampleTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleTable
        fields = '__all__'
        
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'