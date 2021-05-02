from django.conf.urls import include
from django.urls import path,re_path
from django.contrib import admin
from django.contrib.auth.views import LogoutView

import django_js_reverse.views
from rest_framework.routers import DefaultRouter

from common.routes import routes as common_routes
from researcherFormApi.views import ResearchFormViewSet

router = DefaultRouter()
router.register('form', ResearchFormViewSet)
admin.site.site_header = "Praire Fire Admin"
admin.site.site_title = "Praire Fire Admin Portal"
admin.site.index_title = "Welcome to Praire Fire Manager Portal"


urlpatterns = [
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path('api/', include(router.urls), name="Api"),
    path('accounts/', include('allauth.urls')),
    path('logout', LogoutView.as_view()),
    path('researcher/logout', LogoutView.as_view()),
    re_path(r'.*', include("common.urls"), name="common"),
    
]
