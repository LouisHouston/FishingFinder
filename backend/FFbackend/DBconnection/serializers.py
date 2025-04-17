from rest_framework import serializers
from .models import ExampleTable

class ExampleTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleTable
        fields = '__all__'
        
        