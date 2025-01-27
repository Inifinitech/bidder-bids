from django.urls import path
from .views import ProductView, BidView

urlpatterns = [
    path('products/', ProductView.as_view()),
    path('products/<int:product_id>/bid/', BidView.as_view()),
]
