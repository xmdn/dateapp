"""
URL configuration for date_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import views as auth_views
from myapp.views import register, admin_home_view, user_home, your_home_view, CustomLoginView, users_list, user_api, users_list_api, react_view, login, react_co
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.urls import re_path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('', your_home_view, name='home_def'),  # Define your home view here
    # path('admin_home/', admin_home_view, name='admin_home'),  # Admin home view
    path('home/', user_home, name='home'),  # User home view

    
    path('lists/', users_list, name='users_list'),
    # path('react/', react_view, name='react'),
    path('anothercomponent/', react_co, name='react_comp'),
    path('userlist/', react_co, name='userlist_comp'),
    # re_path(r'^(?:.*)/?$', react_co, name='react_comp'),
    path('api/users/', users_list_api, name='users_list'),
    path('api/user/', user_api, name='user_api'),
]

# Include authentication URLs
# urlpatterns += [
#     path('accounts/', include('django.contrib.auth.urls')),  # This includes login, logout, password reset, etc.
# ]
# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)