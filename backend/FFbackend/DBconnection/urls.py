from django.contrib import admin
from django.urls import path
from . import views

#NOTE: where to setup the paths to call from react to get a request
# adding to the url patterns
# 1st: is the domain/(goes here) , 2nd: the correct views file, 3rd:
urlpatterns = [
    path('test-db/', views.testing_db, name='test_record'),
    path('login/', views.login_user, name='login_user'),
    path('registerUser/', views.registerUser, name='registerUser'),
    path('logout/', views.logout_user, name='logout_user'), 
    path('water-bodies/', views.water_bodies, name="water_bodies"), #BOW info
    path('fish-types/', views.fish_types, name="fish_types") #for fish info
]
