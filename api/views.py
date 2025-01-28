from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .models import Product, Bid
from .serializers import ProductSerializer, BidSerializer
from django.utils import timezone
import pytz           

class ProductView(APIView):
    def get(self, request):
        try:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Exception as err:
            return Response(
                {"error": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
            try:
                serializer = ProductSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            except Exception as err:
                return Response(
                    {"error": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
class ProductViewOne(APIView):
    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Exception as err:
            return Response(
                {"error": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

def convert_to_utc(user_input_time, user_timezone='Africa/Nairobi'):
    if user_input_time.tzinfo is None:
        user_tz = pytz.timezone(user_timezone)
        user_aware_time = user_tz.localize(user_input_time)
    else:
        user_aware_time = user_input_time

    return user_aware_time.astimezone(pytz.utc)

class BidView(APIView):
    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)

            product_end_time_utc = convert_to_utc(product.end_time)
            if product_end_time_utc <= timezone.now():
                return Response({"error": "Bidding has ended for this product"}, status=status.HTTP_400_BAD_REQUEST)

            highest_bid = product.bids.first()
            serializer = BidSerializer(data=request.data)
            if serializer.is_valid():
                if highest_bid and serializer.validated_data['amount'] <= highest_bid.amount:
                    return Response({"error": "Bid must be higher than the current highest bid"}, status=status.HTTP_400_BAD_REQUEST)

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as err:
            return Response({"error": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# class LoginView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)
#             return Response({
#                 'access': access_token,
#                 'refresh': str(refresh),
#             })
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
