from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models.models import ExampleTable, Users, BodyOfWater
from .serializers import ExampleTableSerializer, UsersSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

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


@api_view(['POST'])
def registerUser(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password  # with django user model the django handles the hashing!
        )
        return Response({"success": "User created successfully"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(['POST'])
@csrf_exempt
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)
    
@api_view(['POST'])
def logout_user(request):
    request.user.auth_token.delete() 
    return Response({"message": "Logged out successfully"})

@api_view(['GET'])
def water_bodies(request):
    bodies = BodyOfWater.objects.all()
    data = [{
        'id': b.bow_id,
        'lat': b.lat,
        'lng': b.lng,
        'name': b.name
    } for b in bodies]
    return Response(data)