from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "full_name",
            "is_superuser",
            "date_joined",
        )


class UserCreateSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ("email", "full_name", "password", "password2",)
        extra_kwargs = {
            "password": {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data["email"],
            full_name=self.validated_data["full_name"]
        )
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError(
                {'error': "Heslá sa nezhodujú"}
            )
        user.set_password(password)
        user.save()
        return user


class UserSlimSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "full_name",
        )


class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "is_superuser",
        )

class UserEventQuerySerializer(serializers.Serializer):
    date = serializers.DateField(required=False)
    is_active = serializers.BooleanField(required=False)
