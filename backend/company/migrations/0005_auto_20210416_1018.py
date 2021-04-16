# Generated by Django 3.2 on 2021-04-16 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_company_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='create_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='modification_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
    ]