from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ExampleTable
from .serializers import ExampleTableSerializer
from django.http import JsonResponse

# NOTE: where to create views
# views are where you define the function for api calls and that will call something else 
@api_view(['GET', 'POST'])
def testing_db(request):
    if request.method == 'POST':
        serializer = ExampleTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    records = ExampleTable.objects.all()
    serializer = ExampleTableSerializer(records, many=True)
    return Response(serializer.data)