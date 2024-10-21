from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from .forms import CustomUserCreationForm
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from rest_framework_simplejwt.tokens import RefreshToken
from django.template import Template, Context
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# from .models import UserProfile
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib import messages
import json

from django.templatetags.static import static

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from django.views.decorators.http import require_GET

from django.contrib.auth.views import LoginView

import os

class CustomLoginView(LoginView):
    template_name = 'registration/login.html'  # Set your template name

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context  # You can add any additional context here if needed

    def get(self, request, *args, **kwargs):
        # Use the combine function to render the template with the header
        return combine(request, self.template_name, self.get_context_data())

@api_view(['GET'])
def users_list(request):
    users = User.objects.all().values('username', 'email')
    # Convert users to a list for serialization
    users_list = list(users)
    # users_json = serialize('json', users)
    # return Response(users)
    return combine(request, template_name='blank', context={'users': users_list})

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Require authentication for this endpoint
def users_list_api(request):
    users = User.objects.all().values('username', 'email')
    users_list = list(users)
    return JsonResponse(users_list, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Require authentication for this endpoint
def user_api(request):
    # Get the current user
    user = request.user

    # Prepare user data to be returned
    user_data = {
        'username': user.username,
        'email': user.email
    }

    return JsonResponse(user_data, safe=False)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def react_view(request):
    return render(request, 'index.html')

def react_co(request):
    print("Groq Bot started.")
    return combine(request)

@api_view(['POST', 'GET'])
def login(request):
    if request.method == "POST":
        # Parse the JSON body (since React is sending JSON)
        data = json.loads(request.body.decode('utf-8'))

        # Get the username and password from the JSON data
        username = data.get("username")
        password = data.get("password")
        
        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        # Debugging output
        print(f"Attempting to log in with username: {username}")

        if user is not None:
            # If the user is valid, log them in
            # auth_login(request, user)
            token = RefreshToken.for_user(user)
            messages.success(request, "Login successful!")
            print(f"User {username} logged in successfully.")
            users = User.objects.all().values('username', 'email')
            users_list = list(users)
            # Redirect to a success page home
            # Check for 'next' parameter in the URL
            # Return a success response
            user_data = {
                'token': str(token.access_token),
                'user': { 
                    'refresh': str(token),
                    'username': user.username, 
                    'email': user.email
                }, 'users': users_list
            }
            
            # Convert users to a list for serialization
            
            # users_json = serialize('json', users)
            # return Response(users)
            # return combine(request, template_name='blank', context={'users': users_list})

             # Return a success response with user data
            return JsonResponse(data=user_data , status=200)

            # html = combine(request, template_name='home', context={'token': str(token.access_token), **user_data})
            # return render(request, html)
        else:
            # If authentication fails, return an error message
            messages.error(request, "Invalid username or password.")
            print(f"Failed login attempt for username: {username}")
    
    # Render the login page with any error messages
    return combine(request, template_name='blank')

@login_required
def admin_home_view(request):
    if request.user.is_staff:
        # return combine(request, 'admin_home.html')
        return combine(request)
    else:
        return redirect('/home/')  # Redirect non-admin users to user home

@login_required(login_url="/login/")
def user_home(request):
    users = User.objects.all().values('username', 'email')
    # Convert users to a list for serialization
    users_list = list(users)
    # users_json = serialize('json', users)
    # return Response(users)
    return combine(request, template_name='blank', context={'users': users_list})
    
@login_required
def your_home_view(request):
    return redirect('/home/')  # Create a home.html template

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # This creates the user
            # Optionally, you can set other fields like is_staff, is_active, etc.
            user.is_active = True
            user.save()
            return redirect('/login/')  # Redirect after successful registration
    else:
        form = CustomUserCreationForm()
    return combine(request, template_name='blank', context={'form': form})

def combine(request, template_name='blank', context=None):
    """
    Renders a template with a common base template (base.html) and returns the response.
    """
    if context is None:
        context = {}

    # context['users'] = list(context)

    # Determine which bundle to load based on user's role
    if request.user.is_authenticated and request.user.is_staff:
        # Load admin bundle if user is authenticated and is an admin
        bundle_js = static('dist/admin.bundle.js')
        basic_role = 'admin'
    else:
        # Load user bundle if user is not an admin or unauthenticated
        bundle_js = static('dist/user.bundle.js')
        basic_role = 'user'

    web_vitals_js = static('dist/node_modules_web.bundle.js')

    # Create the script tag for bundle.js
    script_tag = f'<script src="{bundle_js}"></script><script src="{web_vitals_js}"></script>'

    print(f"CONTEXT: {context}")

    if context.get('users', []):
        # Access users from context
        users = context.get('users', [])

        # Convert users list to JSON format
        users_json = json.dumps(list(users))

        # Create the script tag for users data
        script_tag_users = f'<script id="users_data" type="application/json">{users_json}</script>'

        # Add this to the context or directly in the header
        context['script_tag_users'] = script_tag_users

        data = {'content': script_tag, 'users': context['users']}
    elif context.get('token', []):
        data = {}
        data.update(context)
        # Access users from context

        data = {'content': script_tag, 'access': data}
    else:
        data = {'content': script_tag}
    # Handle 'blank' template case (no extra content, just header, footer, and script)
    if template_name == 'blank' or template_name == 'home2':
        

        if template_name == 'home2':
            # Render base_header and base_footer simultaneously
            header = render(request, f'components/{basic_role}/base_header.html', {}).content.decode('utf-8')
            footer = render(request, f'components/{basic_role}/base_footer.html', {}).content.decode('utf-8')

            # Combine header and footer directly
            response_content = f'{header}{footer}'

            # Create a Template object with the raw HTML
            template = Template(response_content)

            # Optionally pass some context (variables to be replaced in the HTML)
            context = Context({'data': data})
            # Render the template with the context
            rendered_html = template.render(context)

            # Return the rendered HTML
            return HttpResponse(rendered_html)
        else:
            # Render base_header and base_footer simultaneously
            header = render(request, f'components/{basic_role}/base_header.html', data).content.decode('utf-8')
            footer = render(request, f'components/{basic_role}/base_footer.html', {}).content.decode('utf-8')

            # Combine header and footer directly
            response_content = f'{header}{footer}'

            # return HttpResponse(header)
            return HttpResponse(response_content)

    # return HttpResponse(template_name)

    # Render the specific template and include its context
    content = render(request, template_name, context).content.decode('utf-8')

    # Render the base template with the content included
    header_mixed = render(request, f'components/{basic_role}/base_header.html', {'content': script_tag}).content.decode('utf-8')

    # Render the base footer template with the content included
    footer_mixed = render(request, f'components/{basic_role}/base_footer.html', {}).content.decode('utf-8')

    # Return the combined response
    response_content = f'{header_mixed}{content}{footer_mixed}'
    return HttpResponse(response_content)