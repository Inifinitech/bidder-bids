from django.urls import path
from .views import ProductView, BidView, ProductViewOne

urlpatterns = [
    # path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductView.as_view()),
    path('product/<int:product_id>/', ProductViewOne.as_view()),
    path('products/<int:product_id>/bid/', BidView.as_view()),
]
