from company.models import Company
from company.serializers.common import CompanyUserSerializer
from event.models import Event
from event.serializers import EventSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User
from users.serializers import UserSerializer, UserCreateSerializer, UserAdminSerializer, UserEventQuerySerializer


class UserView(ListAPIView):
    def get_serializer_class(self):
        return UserSerializer

    queryset = User.objects.all()


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
        data["full_name"] = user.full_name
        token = Token.objects.get(user=user).key
        data["token"] = token

        return Response(
            data,
            status=status.HTTP_201_CREATED,
        )


class UserEventView(ListAPIView):
    serializer_class = EventSerializer

    lookup_url_kwarg = "id"

    def get_queryset(self):

        user = get_object_or_404(User, id=self.request.user.id)

        query_params = UserEventQuerySerializer(data=self.request.query_params)
        query_params.is_valid(raise_exception=True)
        validated_data = dict(query_params.validated_data)
        print(validated_data)

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

    lookup_url_kwarg = "id"

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
