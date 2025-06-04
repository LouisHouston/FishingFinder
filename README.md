# Fishing Finder

Live DEMO: https://fishing-finder.vercel.app/

Fishing Tracker is a comprehensive full-stack web application designed to help anglers log, track, and share their fishing experiences. The platform allows users to mark water bodies, log catches, and view community fishing insights.

# Who is it for?

Anglers! I am also a fisherman and this is just a web app to communicate catches. The problem with other apps is that 1 Lake does not really help in terms of locating the correct fish but with spots you can really focus in on where exactly you caught and with what, for the non fishing people using the wrong lure/bait/hook can get your line stuck so logging those things are also important.

### Built With

[![React][React.js]][React-url] 
[![Django][Django.py]][Django-url]
[![SupaBase][supabase.postgresql]][Supabase-url]
[![GoogleMapApi][GoogleMapApi.JS]][GoogleMap-url]

## Phase 1: Project Setup & Authentication

✅Create Django project structure <br>
✅ Set up virtual environment <br>
✅ Install required dependencies <br>
✅ Configure database (PostgreSQL) <br>
✅ Implement user registration <br>

## Phase 2: Navigations

✅Create Login and Register <br>
✅Create Auth Blocking <br>
✅Create App Blocking <br>

## Phase 3: Markers

✅ Google maps working <br>
✅ Google maps markers to mark bodies of water <br>
✅ Allowing user to add a marker HUGE <br>

## Phase 4: Cruds

✅ Add a way to make bait inserted into DB <br>
✅ Add a way to make fish inserted into DB <br>
✅ Marking body of water with name inserted into DB <br>

## Phase 5: Fish Logs

✅ Creating a catch from a user <br>
✅ Show fishes caught at fishing spot only <br>
✅ Adding user, time caught, bait used <br>


### Running for development

## Backend
- activate venv ffserver/Scripts/activate
python manage.py runserver 

#### To make the tables in the DB off the models in django 
if you need to modify the models (Tables but in Django)
1. adjust the Model
2. python manage.py makemigrations
3. python manage.py migrate

## Frontend
- go into front end npm start [thats it!]

NOW WE COOKING 🍳

USE SEARCH FOR NOTE: on how to get basic things done or adding implementations
***
#### Thigns learned

Linkto for links but you really dont need links
NavigateTo via Code or redirect (but redirects are bad for components)
Hardcoding sucks always use envs when possible and keep the same formatting throughout the whole thing
***

``` REVIEW: ``` <br>
✅ fix password check <br>
✅ honey pot <br>
✅encryption for user password <br>
✅ getting google map <br>
❌ make a dark mode and learn how to do it well <br>
❌ notice for user submissions<br>
❌ Mobile response / Responsiveness in general <br>
❌ Following Style Conventions <br>



***
# Suggestions
add optional photos for water bodies or catches? that might be additional db space

filtering by bait type and what is the most success depending on BoW and bait

analytics by let users track catch history by date or season that would be cool

add little bait shops on map not huge but helpful to users

# Styling Guide <- very important 



[React-url]: https://reactjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Django.py]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[Django-url]: https://www.djangoproject.com/
[supabase.postgresql]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[SupaBase-url]: https://supabase.com/

[GoogleMapApi.JS]: https://img.shields.io/badge/Google%20Maps-4285F4?logo=googlemaps&logoColor=fff&style=for-the-badge
[GoogleMap-url]: https://developers.google.com/maps
