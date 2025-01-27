from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
            
    # def patch(self, request, id):
    #     try:
    #         serializer = ProductSerializer(data=request)

# class BidView(APIView):
#     def post(self, request, product_id):
#         try:
#             product = Product.objects.get(id=product_id)
#             if product.end_time < timezone.now():
#                 return Response({"error": "Bidding has ended for this product"}, status=400)

#             serializer = BidSerializer(data=request.data)
#             if serializer.is_valid():
#                 if serializer.validated_data['amount'] > product.bids.first().amount:
#                     serializer.save()
#                     return Response(serializer.data, status=status.HTTP_201_CREATED)
#                 return Response({"error": "Bid must be higher than the current highest bid"}, status=400)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Exception as err:
#             return Response(
#                 {"error": f"An error occurred: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

def convert_to_utc(user_input_time, user_timezone='Africa/Nairobi'):
    user_tz = pytz.timezone(user_timezone)
    user_aware_time = user_tz.localize(user_input_time)
    return user_aware_time.astimezone(pytz.utc) 

class BidView(APIView):
    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            if product.end_time <= timezone.now():
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
