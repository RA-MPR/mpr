from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    sign_orders = serializers.IntegerField()
    paid_invoice = serializers.IntegerField()

    class Meta:
        model = User
        fields = (
            "name",
            "surname",
            "email",
            "phone",
            "sign_orders",
            "paid_invoice",
        )


class UserCreateSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ("email", "name", "surname", "phone", "password", "password2",)
        extra_kwargs = {
            "password": {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data["email"],
            name=self.validated_data["name"],
            surname=self.validated_data["surname"],
            phone=self.validated_data["phone"],
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
            "name",
            "surname",
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
