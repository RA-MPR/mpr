# Generated by Django 3.2 on 2021-04-28 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0006_company_update_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='status_modification_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
