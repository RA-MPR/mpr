from company.models import Company
from company.serializers.common import CompanyUserSerializer
from django.db.models import Sum
from event.models import Event
from event.serializers import EventSerializer
from order.models import Order, Month
from contact.models import Contact
from contact.serializers.common import ContactGetSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from users.serializers import UserSerializer, UserCreateSerializer, UserAdminSerializer, UserEventQuerySerializer

from django.db.models import Sum
from datetime import date
from dateutil.relativedelta import relativedelta

class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return User.objects.annotate(sign_orders=Sum("Order__sum"), paid_invoice=Sum("Invoice__sum"))


class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_superuser:
            return Response(
                {'error': "Užívateľ nie je admin"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        serializer = UserCreateSerializer(data=request.data)
        data = {}
        if not serializer.is_valid():
            return Response(
                [serializer.errors],
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.save()
        data["email"] = user.email
        data["name"] = user.name
        data["surname"] = user.surname
        data["phone"] = str(user.phone)
        token = Token.objects.get(user=user).key
        data["token"] = token

        return Response(
            data,
            status=status.HTTP_201_CREATED,
        )


class UserEventView(ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):

        user = get_object_or_404(User, id=self.request.user.id)

        query_params = UserEventQuerySerializer(data=self.request.query_params)
        query_params.is_valid(raise_exception=True)
        validated_data = dict(query_params.validated_data)

        if validated_data.get("date"):
            all_event = Event.objects.filter(user=user, date=validated_data.get("date"))
            return all_event

        if validated_data.get("is_active"):
            all_event = Event.objects.filter(user=user, is_active=True)
            return all_event

        all_event = Event.objects.filter(user=user)
        return all_event


class UserCompanyView(ListAPIView):
    serializer_class = CompanyUserSerializer

    def get_queryset(self):
        user = get_object_or_404(User, id=self.request.user.id)
        all_company = Company.objects.filter(user=user)

        return all_company


class UserAdminView(APIView):
    serializer_class = UserAdminSerializer

    def get(self, request):
        user = get_object_or_404(User, id=self.request.user.id)
        data = {"is_admin": user.is_superuser}
        return Response(
            data,
            status=status.HTTP_200_OK,
        )


class UserContactView(ListAPIView):
    serializer_class = ContactGetSerializer

    def get_queryset(self):

        user = get_object_or_404(User, id=self.request.user.id)

        wanted_items = set()
        all_company = Company.objects.filter(user=user)
        for company in all_company:
            all_contacts = Contact.objects.filter(company=company)
            for item in all_contacts:
                wanted_items.add(item.pk)

        return Contact.objects.filter(pk__in=wanted_items)


class UserOrderView(ListAPIView):
    lookup_url_kwarg = "id"

    def fillListOrder(self, start, end, res, d, data):
        while start <= end:
            if start not in res:
                data.append({
                    "month": start,
                    "total": 0,
                })
            else:
                data.append({
                    "month": start,
                    "total": d[str(start)]
                })

            start += 1

    def get(self, request, id):
        user = get_object_or_404(User, pk=id)

        f = date.today() + relativedelta(months=-11)
        f = f.replace(day=1)
        end_date = date.today() + relativedelta(months=1)
        end_date = end_date.replace(day=1)

        summary = (Order.objects
                   .filter(user=user.id)
                   .filter(date__gte=f)
                   .filter(date__lt=end_date)
                   .annotate(month=Month('date'))
                   .values('month')
                   .annotate(total=Sum('sum'))
                   .order_by())

        if len(summary) == 12:
            return Response(
                summary,
                status=status.HTTP_200_OK,
            )

        res = [sub['month'] for sub in summary]
        d = {}

        for item in summary:
            d[str(item['month'])] = item['total']

        start = f.month
        end = date.today().month
        data = []

        self.fillListOrder(start, 12, res, d, data)

        if end < f.month:
            start = 1
            self.fillListOrder(start, end, res, d, data)

        return Response(
            data,
            status=status.HTTP_200_OK,
        )
