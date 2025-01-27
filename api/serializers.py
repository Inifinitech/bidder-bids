from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, Bid

# User = get_user_model()

# class UserSignupSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('username', 'email', 'password', 'role')

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password'],
#             role=validated_data.get('role', 'user')  # Default role: 'user'
#         )
#         return user
    
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, attrs):
#         user = get_user_model().objects.filter(username=attrs['username']).first()
#         if user and user.check_password(attrs['password']):
#             return {'user': user}
#         raise serializers.ValidationError('Invalid credentials')
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = '__all__'
