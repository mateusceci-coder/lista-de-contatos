from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, CreateUserView, LogoutView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'contacts', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', CreateUserView.as_view(), name='user_register'),
    path('logout/', LogoutView.as_view(), name='logout_user')
]
