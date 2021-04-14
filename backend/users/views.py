from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from users.models import User
from users.serializers import UserSerializer, UserCreateSerializer


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
